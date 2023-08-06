import { MultiStep } from '@/components/ui/multi-step'

import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ProfileClient } from './_components/profile-client'

export default async function Profile() {
  const session = await getServerSession(authOptions)
  console.log('Profile session', session)

  return (
    <main className='max-w-[572px] mt-20 mb-4 mx-auto px-4 flex flex-col gap-6'>
      <Box>
        <pre>{JSON.stringify(session, undefined, 2)}</pre>
      </Box>
      <ProfileClient />
    </main>
  )
}
