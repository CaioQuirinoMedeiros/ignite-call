import Image from 'next/image'
import { Images } from '@/assets'
import ClaimUsernameForm from './_components/claim-username-form'

export default function Home() {
  return (
    <div className='flex flex-row items-center h-screen px-10 lg:px-0 lg:ml-[7.5rem] gap-20 max-w-screen-xl overflow-x-hidden'>
      <div className=''>
        <h1 className='text-7xl font-[900] leading-[120%] text-white mb-2'>
          Agendamento descomplicado
        </h1>
        <p className='text-xl text-gray-200'>
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>

        <ClaimUsernameForm />
      </div>
      <div className='shrink-0 hidden lg:block'>
        <Image
          src={Images.app_preview}
          alt='Calendário simbolizando a aplicação em funcionamento'
          height={442}
          width={827}
          quality={100}
          priority
        />
      </div>
    </div>
  )
}
