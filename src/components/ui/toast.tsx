import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { X } from 'lucide-react'

import { cn } from '@/utils/styles'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
  title: string
  description?: string
  action?: React.ReactNode
}

type Toast = React.ElementRef<typeof ToastPrimitives.Root>

const Toast = React.forwardRef<Toast, ToastProps>((props, ref) => {
  const { className, title, description, action: Action, ...rest } = props

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        'bg-gray-800 rounded-md border-gray-600 border px-5 py-4 text-white flex flex-row gap-2 min-w-[22rem] max-w[30rem] group pointer-events-auto overflow-hidden shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
        className
      )}
      {...rest}
    >
      <div className='flex flex-col grow gap-2'>
        <ToastPrimitives.Title className='text-white text-xl font-bold'>
          {title}
        </ToastPrimitives.Title>
        <ToastPrimitives.Description className='text-gray-200 text-sm'>
          {description}
        </ToastPrimitives.Description>
      </div>
      {Action}
      <ToastPrimitives.Close className='self-start text-gray-200'>
        <X size={20} />
      </ToastPrimitives.Close>
    </ToastPrimitives.Root>
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

export { ToastProvider, ToastViewport, Toast }
