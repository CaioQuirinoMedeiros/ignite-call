'use client'

import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, Clock } from 'lucide-react'
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

export function ConfirmStep() {
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

  function handleConfirmScheduling(formData: ConfirmFormOutput) {
    console.log({ formData })
  }

  return (
    <form onSubmit={handleSubmit(handleConfirmScheduling)}>
      <Box className='max-w-[540px] mt-6 mx-auto flex flex-col gap-4'>
        <div className='flex items-center gap-4 text-white'>
          <span className='flex items-center gap-2'>
            <Calendar className='text-gray-200 w-5 h-5' />
            22 de Setembro de 2022
          </span>
          <span className='flex items-center gap-2'>
            <Clock className='text-gray-200 w-5 h-5' />
            08:00h
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
          <Button type='button' variant='tertiary'>
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
