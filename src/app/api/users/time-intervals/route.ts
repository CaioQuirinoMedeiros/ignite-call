import { createAuthOptions } from '@/lib/auth/auth-options'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const timeIntervalsRequestBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number().min(0).max(6).int(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number()
    })
  )
})

export async function POST(request: NextRequest) {
  const session = await getServerSession(createAuthOptions(cookies()))

  if (!session?.user) {
    return NextResponse.json({ message: 'No user logged in' }, { status: 401 })
  }

  const requestBody = await request.json()

  const { intervals } = timeIntervalsRequestBodySchema.parse(requestBody)

  await prisma.userTimeInterval.createMany({
    data: intervals.map((interval) => {
      return {
        user_id: session.user.id,
        week_day: interval.weekDay,
        time_start_in_minutes: interval.startTimeInMinutes,
        time_end_in_minutes: interval.endTimeInMinutes
      }
    })
  })

  return new NextResponse(undefined, { status: 201 })
}
