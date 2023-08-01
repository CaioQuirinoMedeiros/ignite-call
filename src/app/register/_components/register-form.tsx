'use client'

import { Box } from '@/components/ui/box'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário precisa ter apenas letras e hifens'
    })
    .transform((value) => value.toLowerCase()),
  name: z.string().min(3, { message: 'O nome precisa ter pelo menos 3 letras' })
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { username: '', name: '' }
  })

  async function handleRegister(formData: RegisterFormData) {
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Box className='mt-6 flex flex-col gap-4'>
        <label className='flex flex-col gap-2'>
          <span className='text-sm'>Nome de usuário</span>
          <Input
            size='sm'
            prefix='ignite.com/'
            placeholder='seu-usuario'
            {...register('username')}
          />
          {errors.username?.message && (
            <span className='text-sm text-error'>
              {errors.username?.message}
            </span>
          )}
        </label>

        <label className='flex flex-col gap-2'>
          <span className='text-sm'>Nome completo</span>
          <Input size='sm' placeholder='Seu Nome' {...register('name')} />
          {errors.name?.message && (
            <span className='text-sm text-error'>{errors.name?.message}</span>
          )}
        </label>

        <Button disabled={!!isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Box>
    </form>
  )
}
