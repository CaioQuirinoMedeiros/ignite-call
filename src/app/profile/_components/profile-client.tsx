'use client'

import * as React from 'react'

import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'

import { signIn, signOut, useSession } from 'next-auth/react'

export function ProfileClient() {
  const { data, status } = useSession()

  return (
    <Box className='flex flex-col gap-4'>
      <span>stats: {status}</span>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>

      <Button onClick={() => signIn('google')}>SignIn</Button>
      <Button onClick={() => signOut()}>SignOut</Button>
    </Box>
  )
}
