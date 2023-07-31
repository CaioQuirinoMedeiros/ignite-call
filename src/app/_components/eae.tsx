'use client'

import { Button } from '@/components/ui/button'
import { Box } from '@/components/ui/box'

import { useToast } from '@/components/ui/use-toast'

export default function Eae() {
  const { toast } = useToast()

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-2 p-24'>
      <Box className='pt-6 gap-2 flex flex-col'>
        <Button
          onClick={() =>
            toast({
              title: 'Agendamento realizado',
              description: 'Quarta-feira, 23 de Outubro às 16h'
            })
          }
        >
          Botão
        </Button>
      </Box>
    </main>
  )
}
