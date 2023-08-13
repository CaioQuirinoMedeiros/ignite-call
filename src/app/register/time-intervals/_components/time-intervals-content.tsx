'use client'

import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'
import { convertTimeStringInMinutes } from '@/utils/convertTimeStringInMinutes'
import { getWeekDays } from '@/utils/getWeekDays'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6).int(),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string()
      })
    )
    .length(7)
    .transform((value) => {
      return value
        .filter((interval) => {
          return interval.enabled
        })
        .map((interval) => {
          return interval
        })
    })
    .refine(
      (value) => {
        return value.length >= 1
      },
      { message: 'Selecione pelo menos um horário de disponibilidade' }
    )
    .transform((value) => {
      return value.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringInMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringInMinutes(interval.endTime)
        }
      })
    })
    .refine(
      (value) => {
        return value.every((interval) => {
          return interval.endTimeInMinutes - interval.startTimeInMinutes >= 60
        })
      },
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início'
      }
    )
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export function TimeIntervalContent() {
  const router = useRouter()
  const { toast } = useToast()
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { isSubmitting, errors }
  } = useForm<TimeIntervalsFormInput, unknown, TimeIntervalsFormOutput>({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' }
      ]
    },
    resolver: zodResolver(timeIntervalsFormSchema)
  })

  const intervalsField = useFieldArray({ name: 'intervals', control })

  const weekDays = getWeekDays()

  async function handleSetTimeIntervals(formData: TimeIntervalsFormOutput) {
    try {
      await api.post('/users/time-intervals', {
        intervals: formData.intervals
      })

      router.push('/register/update-profile')
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

  const intervals = watch('intervals')

  return (
    <form onSubmit={handleSubmit(handleSetTimeIntervals)}>
      <Box className='mt-6'>
        <div className='border border-gray-600 rounded-md mb-4'>
          {intervalsField.fields.map((intervalField, fieldIndex) => {
            return (
              <div
                key={intervalField.id}
                className='flex flex-row items-center justify-between px-4 py-3 [&_+_&]:border-t border-gray-600'
              >
                <div className='flex flex-row items-center gap-3'>
                  <Controller
                    control={control}
                    name={`intervals.${fieldIndex}.enabled`}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                        />
                      )
                    }}
                  />

                  <span className='text-gray-100'>
                    {weekDays[intervalField.weekDay]}
                  </span>
                </div>
                <div className='flex flex-row items-center gap-3'>
                  <Input
                    {...register(`intervals.${fieldIndex}.startTime`)}
                    disabled={intervals[fieldIndex].enabled === false}
                    size='sm'
                    type='time'
                    step={60}
                  />
                  <Input
                    {...register(`intervals.${fieldIndex}.endTime`)}
                    disabled={intervals[fieldIndex].enabled === false}
                    size='sm'
                    type='time'
                    step={60}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {errors.intervals && (
          <span className='text-error mb-4 flex text-sm'>
            {errors.intervals.message}
          </span>
        )}

        <Button type='submit' className='w-full' disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Box>
    </form>
  )
}
