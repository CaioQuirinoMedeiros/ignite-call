'use client'

import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Calendar, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable()
})

type ConfirmFormInput = z.input<typeof confirmFormSchema>
type ConfirmFormOutput = z.output<typeof confirmFormSchema>

interface ConfirmStepProps {
  username: string
  schedulingDate: Date
  clearSelectedDateTime(): void
}

export function ConfirmStep(props: ConfirmStepProps) {
  const { username, schedulingDate, clearSelectedDateTime } = props

  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<ConfirmFormInput, unknown, ConfirmFormOutput>({
    defaultValues: {
      name: '',
      email: '',
      observations: ''
    },
    resolver: zodResolver(confirmFormSchema)
  })

  async function handleConfirmScheduling(formData: ConfirmFormOutput) {
    try {
      await api.post(`/users/${username}/schedule`, {
        name: formData.name,
        email: formData.email,
        observations: formData.observations,
        date: schedulingDate
      })

      clearSelectedDateTime()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          toast({
            title: 'Erro do servidor',
            description: error.response.data.message
          })
        }
      }
    }
  }

  const schedulingDateFormatted = format(
    schedulingDate,
    "dd 'de' MMMM 'de' yyyy",
    { locale: ptBR }
  )
  const schedulingDateHourFormatted = format(schedulingDate, "HH:mm'h'", {
    locale: ptBR
  })

  return (
    <form onSubmit={handleSubmit(handleConfirmScheduling)}>
      <Box className='max-w-[540px] mt-6 mx-auto flex flex-col gap-4'>
        <div className='flex items-center gap-4 text-white'>
          <span className='flex items-center gap-2'>
            <Calendar className='text-gray-200 w-5 h-5' />
            {schedulingDateFormatted}
          </span>
          <span className='flex items-center gap-2'>
            <Clock className='text-gray-200 w-5 h-5' />
            {schedulingDateHourFormatted}
          </span>
        </div>

        <hr className='border-gray-600 my-2' />

        <label className='flex flex-col gap-2'>
          <span className='text-sm'>Seu nome</span>
          <Input placeholder='Seu nome' {...register('name')} />
          {errors.name && (
            <span className='text-sm text-error'>{errors.name?.message}</span>
          )}
        </label>

        <label className='flex flex-col gap-2'>
          <span className='text-sm'>Endereço de e-mail</span>
          <Input placeholder='Endereço de e-mail' {...register('email')} />
          {errors.email && (
            <span className='text-sm text-error'>{errors.email?.message}</span>
          )}
        </label>

        <label className='flex flex-col gap-2'>
          <span className='text-sm'>Observações</span>
          <Textarea {...register('observations')} />
          {errors.observations && (
            <span className='text-sm text-error'>
              {errors.observations?.message}
            </span>
          )}
        </label>

        <div className='flex gap-2 justify-end mt-2'>
          <Button
            type='button'
            variant='tertiary'
            onClick={clearSelectedDateTime}
          >
            Cancelar
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            Confirmar
          </Button>
        </div>
      </Box>
    </form>
  )
}
