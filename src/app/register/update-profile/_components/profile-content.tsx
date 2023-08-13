'use client'

import * as React from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { ArrowRight } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const profileFormSchema = z.object({
  bio: z.string()
})

type ProfileFormData = z.input<typeof profileFormSchema>

export function ProfileContent() {
  const { toast } = useToast()
  const router = useRouter()
  const session = useSession()
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting }
  } = useForm<ProfileFormData>({
    defaultValues: {
      bio: session.data?.user.bio
    },
    resolver: zodResolver(profileFormSchema)
  })

  React.useEffect(() => {
    if (session.data?.user?.bio) {
      setValue('bio', session.data?.user?.bio)
    }
  }, [session.data?.user?.bio, setValue])

  async function handleUpdateProfile(formData: ProfileFormData) {
    try {
      await api.put('/users/profile', {
        bio: formData.bio
      })

      router.push(`/schedule/${session.data?.user?.username}`)
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

  if (session.status === 'unauthenticated') {
    signIn('google')
  }

  if (!session.data?.user) return null

  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)}>
      <Box className='mt-6'>
        <label className='flex text-sm text-gray-100 mb-2'>
          Foto de perfil
        </label>
        <div className='flex flex-row items-center gap-4 mb-4'>
          <Avatar
            src={session.data.user.avatar_url}
            alt={session.data.user.name}
          />
          <Button variant='secondary' size='sm'>
            Selecionar foto
          </Button>
        </div>

        <label htmlFor='bio' className='flex text-sm text-gray-100 mb-2'>
          Sobre você
        </label>
        <Textarea {...register('bio')} className='w-full mb-2' />

        <span className='flex text-sm text-gray-200 mb-4'>
          Fale um pouco sobre você. Isto será exibido em sua página pessoal.
        </span>

        <Button type='submit' className='w-full' disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </Box>
    </form>
  )
}
