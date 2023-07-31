'use client'

import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, ...props }) {
        return <Toast key={id} title={title} description={description} />
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
