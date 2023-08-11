import Image from 'next/image'
import { cookies } from 'next/headers'
import { Images } from '@/assets'
import { getServerSession } from 'next-auth'
import { createAuthOptions } from '@/lib/auth/auth-options'
import { Avatar } from '@/components/ui/avatar'
import { signIn } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ScheduleForm } from './_components/schedule-form'

interface UserSchedulePageProps {
  params: { username: string }
  searchParams: {}
}

export default async function UserSchedulePage(props: UserSchedulePageProps) {
  const {
    params: { username }
  } = props

  const session = await getServerSession(createAuthOptions(cookies()))

  const user = await prisma.user.findUniqueOrThrow({
    where: { username: username }
  })

  if (!session?.user) {
    signIn('google')
  }

  if (!session?.user) return null

  return (
    <main className='max-w-[852px] px-4 mt-20 mb-4 mx-auto'>
      <div className='flex flex-col items-center'>
        <Avatar src={user.avatar_url ?? ''} alt={user.name} className='mb-2' />
        <h2 className='text-2xl font-bold textwhite text-center'>
          {user.name}
        </h2>
        <p className='text-center text-base text-gray-200'>{user.bio}</p>
      </div>

      <ScheduleForm />
    </main>
  )
}
