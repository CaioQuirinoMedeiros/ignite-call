'use client'

import * as React from 'react'

import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'

import { getProviders, signIn, signOut, useSession } from 'next-auth/react'

export function ProfileClient() {
  const { data, status, update } = useSession()

  console.log({ data })

  React.useEffect(() => {
    getProviders().then((providers) => {
      console.log('providers', providers)
    })
  }, [])

  return (
    <Box className='flex flex-col gap-4'>
      <span>stats: {status}</span>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>

      <Button onClick={() => signIn('google')}>SignIn</Button>
      <Button onClick={() => signOut()}>SignOut</Button>
    </Box>
  )
}
