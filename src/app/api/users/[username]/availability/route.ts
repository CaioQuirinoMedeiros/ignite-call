import { prisma } from '@/lib/prisma'
import { getDay, getHours, isPast, parse, setHours } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

type AvailableHour = {
  hour: number
  isAvailable: boolean
}

interface UserAvailabilityProps {
  params: {
    username: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: UserAvailabilityProps
) {
  const username = params.username
  const queryDate = request.nextUrl.searchParams.get('date')

  if (!queryDate) {
    throw new Error('No date param')
  }

  const date = parse(queryDate ?? '', 'yyyy-MM-dd', new Date())

  if (isPast(date)) {
    return NextResponse.json({ availability: [] })
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { username: username }
  })

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: { user: user, week_day: getDay(date) }
  })

  if (!userAvailability) {
    return NextResponse.json({ availability: [] })
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  const hours: AvailableHour[] = [{ hour: startHour, isAvailable: true }]
  while (hours[hours.length - 1].hour < endHour) {
    const nextHour = hours[hours.length - 1].hour + 1
    const hourToAdd = Math.min(nextHour, endHour)
    hours.push({ hour: hourToAdd, isAvailable: true })
  }

  const userSchedulings = await prisma.scheduling.findMany({
    select: { date: true },
    where: {
      user: user,
      date: {
        gte: setHours(date, startHour),
        lte: setHours(date, endHour)
      }
    }
  })

  userSchedulings.forEach((userScheduling) => {
    const hourOfSceduling = getHours(userScheduling.date)
    const hour = hours.find((eachHour) => {
      return eachHour.hour === hourOfSceduling
    })

    if (hour) {
      hour.isAvailable = false
    }
  })

  return NextResponse.json({
    userAvailability,
    userSchedulings,
    availability: hours
  })
}
