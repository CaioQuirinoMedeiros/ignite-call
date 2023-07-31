import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Box } from '@/components/ui/box'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { MultiStep } from '@/components/ui/multi-step'
import { Tooltip } from '@/components/ui/tooltip'
import Eae from './_components/eae'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-2 p-24'>
      Hell world
      <MultiStep size={4} currentStep={2} />
      <Box className='pt-6 gap-2 flex flex-col'>
        <div className='flex items-center space-x-2'>
          <Checkbox id='terms' />
          <label htmlFor='terms'>Accept terms and conditions</label>
        </div>
        <Avatar src='https://github.com/CaioQuirinoMedeiros.Spng' />
        <Eae />
        <Tooltip tooltipText='Testando um marcador qualquer! valeu'>
          <Button>Botão</Button>
        </Tooltip>
        <Button disabled>Botão</Button>
        <Button size='sm'>Botão</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='tertiary'>Tertiary</Button>
        <Input placeholder='Placeholder' />
        <Input placeholder='Placeholder' disabled />
        <Input placeholder='Placeholder' prefix='com.google/' />
        <Textarea placeholder='Placeholder' />
        <Textarea placeholder='Placeholder' disabled />
      </Box>
    </main>
  )
}
