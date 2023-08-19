import { prisma } from '@/lib/prisma'
import {
  eachDayOfInterval,
  endOfMonth,
  getDay,
  getHours,
  isPast,
  isSameDay,
  parse,
  setHours,
  setMonth,
  setYear,
  startOfMonth
} from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

type AvailableHour = {
  hour: number
  isAvailable: boolean
}

interface UserBlockedDatesProps {
  params: {
    username: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: UserBlockedDatesProps
) {
  const username = params.username
  const yearParam = Number(request.nextUrl.searchParams.get('year'))
  const monthParam = Number(request.nextUrl.searchParams.get('month'))

  if (!yearParam) {
    throw new Error('No year param')
  }
  if (!monthParam) {
    throw new Error('No month param')
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { username: username }
  })

  const userTimeIntervals = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
      time_end_in_minutes: true,
      time_start_in_minutes: true
    },
    where: { user: user }
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !userTimeIntervals.map(({ week_day }) => week_day).includes(weekDay)
  })

  const referenceDate = setYear(setMonth(new Date(), monthParam), yearParam)
  const firstDay = startOfMonth(referenceDate)
  const lastDay = endOfMonth(referenceDate)

  const userSchedulings = await prisma.scheduling.findMany({
    select: { date: true },
    where: {
      user: user,
      date: {
        gte: firstDay,
        lte: lastDay
      }
    }
  })

  const blockedDates: Date[] = []

  eachDayOfInterval({
    start: startOfMonth(referenceDate),
    end: endOfMonth(referenceDate)
  }).forEach((date) => {
    const weekDay = getDay(date)

    const userTimeIntervalOfDay = userTimeIntervals.find((availableDay) => {
      return availableDay.week_day === weekDay
    })

    if (!userTimeIntervalOfDay) {
      blockedDates.push(date)
    } else {
      const { time_end_in_minutes, time_start_in_minutes } =
        userTimeIntervalOfDay

      const availableHours = (time_end_in_minutes - time_start_in_minutes) / 60
      const schedulingsOfDay = userSchedulings.filter((scheduling) => {
        return isSameDay(scheduling.date, date)
      })

      if (schedulingsOfDay.length >= availableHours) {
        blockedDates.push(date)
      }
    }
  })

  return NextResponse.json({
    blockedWeekDays,
    blockedDates
  })
}
