import * as React from 'react'

import { cn } from '@/utils/styles'

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {}

type Box = HTMLDivElement

const Box = React.forwardRef<Box, BoxProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <div
      ref={ref}
      className={cn(
        'p-6 rounded-md border border-gray-600 bg-gray-800',
        className
      )}
      {...rest}
    />
  )
})
Box.displayName = 'Box'

export { Box }
