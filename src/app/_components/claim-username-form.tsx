import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'

export default function ClaimUsernameForm() {
  return (
    <form>
      <Box className='grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mt-4 gap-2 p-4'>
        <Input size='sm' prefix='ignite.com/' placeholder='seu-usuario' />
        <Button size='sm' type='submit'>
          Reservar usuário
          <ArrowRight />
        </Button>
      </Box>
    </form>
  )
}
