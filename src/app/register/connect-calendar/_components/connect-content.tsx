'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export function ConnectContent() {
  const { status } = useSession()
  const searchParams = useSearchParams()

  const errorQueryParam = searchParams.get('error')

  async function handleConnect() {
    await signIn('google')
  }

  return (
    <>
      <div className='border border-gray-600 px-6 py-4 flex flex-row items-center justify-between rounded-md mb-4'>
        <span className='text-gray-100'>Google Calendar</span>
        {status === 'authenticated' ? (
          <Button disabled>
            Conectado
            <Check />
          </Button>
        ) : (
          <Button variant='secondary' onClick={handleConnect}>
            Conectar
            <ArrowRight />
          </Button>
        )}
      </div>

      {!!errorQueryParam && (
        <span className='text-error mb-4 flex text-sm'>
          Falha ao se conectar ao Google, verifique se você habilitou as
          permissões de acesso ao Google Calendar
        </span>
      )}
    </>
  )
}
