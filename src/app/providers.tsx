'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export function Providers(props: React.PropsWithChildren) {
  const { children } = props

  return <TooltipPrimitive.Provider>{children}</TooltipPrimitive.Provider>
}
