"use client"

import * as React from "react"
import { MultiStep } from '@/components/ui/multi-step'

import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import GoogleProvider from "next-auth/providers/google"

export function ProfileClient() {
  const { data, status, update } = useSession()

  React.useEffect(() => {
    getProviders().then(providers => {
      console.log("providers", providers)
    })
  }, [])

  return (
    <Box className='flex flex-col gap-4'>
      <span>stats: {status}</span>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>

      <Button onClick={() => signIn("google")}>SignIn</Button>
      <Button onClick={() => signOut()}>SignOut</Button>
    </Box>
  )
}
