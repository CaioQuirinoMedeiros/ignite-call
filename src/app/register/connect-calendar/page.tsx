import { MultiStep } from '@/components/ui/multi-step'

import { ConnectContent } from './_components/connect-content'
import { getServerSession } from 'next-auth'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conecte sua agenda do Google | Ignite Call',
  robots: { index: false }
}

export default async function ConnectCalendarPage() {
  const session = await getServerSession()

  return (
    <main className='max-w-[572px] mt-20 mb-4 mx-auto px-4'>
      <div className='px-6 flex flex-col'>
        <h2 className='text-2xl text-white font-bold'>Conecte sua agenda!</h2>
        <p className='text-gray-200 mb-6'>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </p>

        <MultiStep size={4} currentStep={2} className='box-border' />
      </div>

      <ConnectContent />
    </main>
  )
}
