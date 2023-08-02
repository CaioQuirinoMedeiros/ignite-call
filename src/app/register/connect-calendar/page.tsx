import { MultiStep } from '@/components/ui/multi-step'

import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function ConnectCalendar() {
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

      <Box className='mt-6'>
        <div className='border border-gray-600 px-6 py-4 flex flex-row items-center justify-between rounded-md mb-4'>
          <span className='text-gray-100'>Google Calendar</span>
          <Button variant='secondary'>
            Conectar
            <ArrowRight />
          </Button>
        </div>
        <Button className='w-full' disabled>Próximo passo</Button>
      </Box>
    </main>
  )
}
