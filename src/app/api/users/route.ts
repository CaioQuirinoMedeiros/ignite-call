import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

type PostUsersRequestBody = {
  username: string
  name: string
}

export async function POST(request: NextRequest) {
  const requestBody: PostUsersRequestBody = await request.json()

  const user = await prisma.user.create({
    data: { name: requestBody.name, username: requestBody.username }
  })

  return NextResponse.json({ user })
}
