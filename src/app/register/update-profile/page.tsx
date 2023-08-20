import { MultiStep } from '@/components/ui/multi-step'

import { ProfileContent } from './_components/profile-content'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Atualize seu perfil | Ignite Call',
  robots: { index: false }
}

export default function UpdateProfilePage() {
  return (
    <main className='max-w-[572px] mt-20 mb-4 mx-auto px-4'>
      <div className='px-6 flex flex-col'>
        <h2 className='text-2xl text-white font-bold'>
          Defina sua disponibilidade
        </h2>
        <p className='text-gray-200 mb-6'>
          Por último, uma breve descrição e uma foto de perfil.
        </p>

        <MultiStep size={4} currentStep={4} className='box-border' />
      </div>

      <ProfileContent />
    </main>
  )
}
