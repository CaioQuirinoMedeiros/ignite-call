import { createAuthOptions } from '@/lib/auth/auth-options'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const updateProfileBodySchema = z.object({
  bio: z.string()
})

export async function PUT(request: NextRequest) {
  const session = await getServerSession(createAuthOptions(cookies()))

  if (!session?.user) {
    return NextResponse.json({ message: 'No user logged in' }, { status: 401 })
  }

  const requestBody = await request.json()

  const { bio } = updateProfileBodySchema.parse(requestBody)

  await prisma.user.update({
    where: { id: session.user.id },
    data: { bio: bio }
  })

  return new NextResponse(undefined, { status: 204 })
}
