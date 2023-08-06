'use client'

import { SessionProvider } from 'next-auth/react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export function Providers(props: React.PropsWithChildren) {
  const { children } = props

  return (
    <SessionProvider>
      <TooltipPrimitive.Provider>{children}</TooltipPrimitive.Provider>
    </SessionProvider>
  )
}
