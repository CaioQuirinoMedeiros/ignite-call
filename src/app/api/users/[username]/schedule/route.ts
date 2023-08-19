import { prisma } from '@/lib/prisma'
import { endOfDay, getDay, isPast, startOfHour } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createScheduleBodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  observations: z.string().optional(),
  date: z.coerce.date()
})

interface CreateScheduleProps {
  params: {
    username: string
  }
}

export async function POST(
  request: NextRequest,
  { params }: CreateScheduleProps
) {
  const requestBody = await request.json()
  const username = params.username

  const user = await prisma.user.findUniqueOrThrow({
    where: { username: username }
  })

  const { email, name, observations, date } =
    createScheduleBodySchema.parse(requestBody)

  const schedulingDate = startOfHour(date)

  if (isPast(endOfDay(schedulingDate))) {
    throw new Error('Date is in the past')
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: { user: user, date: schedulingDate }
  })

  if (conflictingScheduling) {
    throw new Error('There is already an scheduling on this date and time.')
  }

  await prisma.scheduling.create({
    data: {
      user_id: user.id,
      email: email,
      name: name,
      observations: observations,
      date: schedulingDate
    }
  })

  return new NextResponse(undefined, { status: 201 })
}
