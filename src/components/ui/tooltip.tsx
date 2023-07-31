'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/utils/styles'

interface TooltipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  tooltipText: string
}

type Tooltip = React.ElementRef<typeof TooltipPrimitive.Content>

const Tooltip = React.forwardRef<Tooltip, TooltipProps>((props, ref) => {
  const { children, className, sideOffset = 4, tooltipText, ...rest } = props

  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(
            'rounded-md px-4 py-3 text-sm text-gray-100 bg-gray-900 z-50 overflow-hidden shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          {...rest}
        >
          {tooltipText}
          <TooltipPrimitive.Arrow className='fill-gray-900' />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
})
Tooltip.displayName = TooltipPrimitive.Root.displayName

export { Tooltip }
