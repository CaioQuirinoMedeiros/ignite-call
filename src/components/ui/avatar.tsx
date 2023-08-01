'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { User } from 'lucide-react'

import { cn } from '@/utils/styles'

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src: AvatarImageProps['src']
}

type Avatar = React.ElementRef<typeof AvatarPrimitive.Root>

const Avatar = React.forwardRef<Avatar, AvatarProps>((props, ref) => {
  const { src, className, ...rest } = props

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...rest}
    >
      <AvatarImage src={src} />
      <AvatarFallback>
        <User className='w-6 h-6' />
      </AvatarFallback>
    </AvatarPrimitive.Root>
  )
})
Avatar.displayName = AvatarPrimitive.Root.displayName

interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {}

type AvatarImage = React.ElementRef<typeof AvatarPrimitive.Image>

const AvatarImage = React.forwardRef<AvatarImage, AvatarImageProps>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      <AvatarPrimitive.Image
        ref={ref}
        className={cn('aspect-square h-full w-full object-cover', className)}
        {...rest}
      />
    )
  }
)
AvatarImage.displayName = AvatarPrimitive.Image.displayName

interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {}

type AvatarFallback = React.ElementRef<typeof AvatarPrimitive.Fallback>

const AvatarFallback = React.forwardRef<AvatarFallback, AvatarFallbackProps>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-gray-600 text-gray-800',
          className
        )}
        {...rest}
      />
    )
  }
)
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar }
