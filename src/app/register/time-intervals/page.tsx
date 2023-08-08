import { MultiStep } from '@/components/ui/multi-step'

import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { TimeIntervalContent } from './_components/time-intervals-content'
import { getServerSession } from 'next-auth'
import { ArrowRight } from 'lucide-react'

export default function TimeIntervalsPage() {
  return (
    <main className='max-w-[572px] mt-20 mb-4 mx-auto px-4'>
      <div className='px-6 flex flex-col'>
        <h2 className='text-2xl text-white font-bold'>Quase lá</h2>
        <p className='text-gray-200 mb-6'>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </p>

        <MultiStep size={4} currentStep={3} className='box-border' />
      </div>

      <TimeIntervalContent />
    </main>
  )
}
