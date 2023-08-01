'use client'

import { Box } from '@/components/ui/box'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/utils/styles'

const claimUserNameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário precisa ter apenas letras e hifens'
    })
    .transform((value) => value.toLowerCase())
})

type ClaimUserNameFormData = z.infer<typeof claimUserNameFormSchema>

export default function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ClaimUserNameFormData>({
    resolver: zodResolver(claimUserNameFormSchema),
    defaultValues: {
      username: ''
    }
  })

  async function handleClaimUsername(formData: ClaimUserNameFormData) {
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit(handleClaimUsername)}>
      <Box className='grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mt-4 gap-2 p-4'>
        <Input
          size='sm'
          prefix='ignite.com/'
          placeholder='seu-usuario'
          {...register('username')}
        />
        <Button size='sm' type='submit'>
          Reservar usuário
          <ArrowRight />
        </Button>
      </Box>

      <span
        className={cn('mt-2 flex text-gray-400 text-sm', {
          ['text-error']: !!errors.username?.message
        })}
      >
        {errors.username?.message || 'Digite o nome do usuário desejado'}
      </span>
    </form>
  )
}
