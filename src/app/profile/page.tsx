import { Box } from '@/components/ui/box'
import { getServerSession } from 'next-auth'
import { createAuthOptions } from '@/lib/auth/auth-options'
import { ProfileClient } from './_components/profile-client'
import { cookies } from 'next/headers'

export default async function Profile() {
  const session = await getServerSession(createAuthOptions(cookies()))

  return (
    <main className='max-w-[572px] mt-20 mb-4 mx-auto px-4 flex flex-col gap-6'>
      <Box>
        <pre>{JSON.stringify(session, undefined, 2)}</pre>
      </Box>
      <ProfileClient />
    </main>
  )
}
