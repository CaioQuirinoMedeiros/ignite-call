'use client'

import { SessionProvider } from 'next-auth/react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

export function Providers(props: React.PropsWithChildren) {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <TooltipPrimitive.Provider>{children}</TooltipPrimitive.Provider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
