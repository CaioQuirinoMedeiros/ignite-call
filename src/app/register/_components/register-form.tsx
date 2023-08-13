'use client'

import * as React from 'react'
import { Box } from '@/components/ui/box'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'

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
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const usernameQueryParam = searchParams.get('username')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { username: usernameQueryParam || '', name: '' }
  })

  React.useEffect(() => {
    if (usernameQueryParam) {
      setValue('username', usernameQueryParam)
    }
  }, [setValue, usernameQueryParam])

  async function handleRegister(formData: RegisterFormData) {
    try {
      await api.post('/users', {
        username: formData.username,
        name: formData.name
      })

      router.push(`/register/connect-calendar`)
    } catch (error: any) {
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
