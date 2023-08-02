import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

type PostUsersRequestBody = {
  username: string
  name: string
}

export async function POST(request: NextRequest) {
  const requestBody: PostUsersRequestBody = await request.json()

  const userExists = await prisma.user.findUnique({
    where: { username: requestBody.username }
  })

  if (userExists) {
    return NextResponse.json(
      { message: 'Username already exists' },
      { status: 400 }
    )
  }

  const user = await prisma.user.create({
    data: { name: requestBody.name, username: requestBody.username }
  })

  const response = NextResponse.json({ user })
  response.cookies.set({
    name: '@ignitecall:userId',
    value: user.id,
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/'
  })

  return response
}
