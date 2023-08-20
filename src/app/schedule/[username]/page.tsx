import { Avatar } from '@/components/ui/avatar'
import { prisma } from '@/lib/prisma'
import { ScheduleForm } from './_components/schedule-form'
import { Metadata } from 'next'
import { cache } from 'react'

interface UserSchedulePageProps {
  params: { username: string }
  searchParams: {}
}

export const metadata: Metadata = {
  title: 'Agendar | Ignite Call',
  robots: { index: false }
}

const getUser = cache(async (username: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { username: username }
  })

  return user
})

export async function generateMetadata(
  props: UserSchedulePageProps
): Promise<Metadata> {
  const {
    params: { username }
  } = props

  const user = await getUser(username)

  return {
    title: `Agendar com ${user.name} Ignite Call`,
    openGraph: user.avatar_url
      ? {
          type: 'profile',
          images: [user.avatar_url]
        }
      : undefined
  }
}

export default async function UserSchedulePage(props: UserSchedulePageProps) {
  const {
    params: { username }
  } = props

  const user = await getUser(username)

  return (
    <main className='max-w-[852px] px-4 mt-20 mb-4 mx-auto'>
      <div className='flex flex-col items-center'>
        <Avatar src={user.avatar_url ?? ''} alt={user.name} className='mb-2' />
        <h2 className='text-2xl font-bold textwhite text-center'>
          {user.name}
        </h2>
        <p className='text-center text-base text-gray-200'>{user.bio}</p>
      </div>

      <ScheduleForm username={user.username} />
    </main>
  )
}
