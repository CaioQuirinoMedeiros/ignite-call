import { MultiStep } from '@/components/ui/multi-step'

import RegisterForm from './_components/register-form'

export default function Register() {
  return (
    <main className='max-w-[572px] mt-20 mb-4 mx-auto px-4'>
      <div className='px-6 flex flex-col'>
        <h2 className='text-2xl text-white font-bold'>Bem-vindo ao Ignite Call!</h2>
        <p className='text-gray-200 mb-6'>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </p>

        <MultiStep size={4} currentStep={1} className='box-border' />
      </div>

      <RegisterForm />
    </main>
  )
}
