'use client'

import * as React from 'react'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

type AvailableHour = {
  hour: number
  isAvailable: boolean
}

type UserAvailabilityResponse = {
  availability: AvailableHour[]
}

interface TimePickerProps {
  date: Date
  username: string
  onSelectHour(hour: number): void
}

type Availability = AvailableHour[]

export function TimePicker(props: TimePickerProps) {
  const { date, username, onSelectHour } = props

  const dateParam = format(date, 'yyyy-MM-dd')

  const { data: availability } = useQuery<Availability>(
    ['availability', { username, date: dateParam }],
    async () => {
      const response = await api.get<UserAvailabilityResponse>(
        `/users/${username}/availability`,
        {
          params: {
            date: dateParam
          }
        }
      )

      return response.data.availability
    }
  )

  const weekDayFormatted = format(date, 'eeee', { locale: ptBR })
  const dayFormatted = format(date, "dd 'de' MMMM", { locale: ptBR })

  return (
    <div className='border-l border-gray-600 pt-6 px-6 overflow-y-scroll absolute top-0 bottom-0 right-0 w-[280px]'>
      <h4 className='font-medium text-gray-200'>
        <span className='text-white'>{weekDayFormatted},</span> {dayFormatted}
      </h4>
      <div className='mt-3 grid grid-cols-2 md:grid-cols-1 gap-2'>
        {availability?.map((availableHour) => {
          return (
            <button
              key={availableHour.hour.toString()}
              disabled={!availableHour.isAvailable}
              className='bg-gray-600 p-2 text-gray-100 rounded-md text-sm last:mb-6 hover:bg-gray-500 disabled:bg-transparent disabled:opacity-40 transition-all'
              onClick={() => onSelectHour(availableHour.hour)}
            >
              {`${availableHour.hour.toString().padStart(2, '0')}:00h`}
            </button>
          )
        })}
      </div>
    </div>
  )
}
