import * as React from 'react'

import { cn } from '@/utils/styles'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'bg-gray-900 rounded-md flex items-center focus:ring-2 ring-main-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[80px] px-4 py-3 text-sm placeholder:text-gray-400 text-white border-none outline-none resize-y',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
