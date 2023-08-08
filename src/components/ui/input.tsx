import * as React from 'react'

import { cn } from '@/utils/styles'
import { VariantProps, cva } from 'class-variance-authority'

const inputVariants = cva(
  'bg-gray-900 rounded-md flex items-center [&:has(input:focus)]:ring-2 ring-main-300 [&:has(input:disabled)]:opacity-50 [&:has(input:disabled)]:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'py-2 px-3',
        md: 'py-3 px-4'
      }
    },

    defaultVariants: {
      size: 'md'
    }
  }
)

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  prefix?: string
}

type Input = HTMLInputElement

const Input = React.forwardRef<Input, InputProps>((props, ref) => {
  const { className, type, size, prefix, ...rest } = props
  
  return (
    <div className={cn(inputVariants({ size }), className)}>
      {!!prefix && <span className='text-gray-400 text-sm'>{prefix}</span>}
      <input
        type={type}
        ref={ref}
        className='placeholder:text-gray-400 file:border-0 file:bg-transparent file:text-sm text-sm text-white bg-transparent w-full border-none outline-none disabled:cursor-not-allowed [color-scheme:dark]'
        {...rest}
      />
    </div>
  )
})
Input.displayName = 'Input'

export { Input }
