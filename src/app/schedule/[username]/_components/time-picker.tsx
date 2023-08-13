'use client'

import * as React from 'react'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { api } from '@/lib/axios'

const times = [
  '09:00h',
  '10:00h',
  '11:00h',
  '12:00h',
  '13:00h',
  '14:00h',
  '15:00h',
  '16:00h',
  '17:00h',
  '18:00h',
  '19:00h',
  '20:00h',
  '21:00h',
  '22:00h'
]

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
}

type Availability = AvailableHour[]

export function TimePicker(props: TimePickerProps) {
  const { date, username } = props

  const [availability, setAvailability] = React.useState<Availability>([])

  React.useEffect(() => {
    api
      .get<UserAvailabilityResponse>(`/users/${username}/availability`, {
        params: {
          date: format(date, 'yyyy-MM-dd')
        }
      })
      .then((response) => {
        setAvailability(response.data.availability)
      })
  }, [username, date])

  const weekDayFormatted = format(date, 'eeee', { locale: ptBR })
  const dayFormatted = format(date, "dd 'de' MMMM", { locale: ptBR })

  return (
    <div className='border-l border-gray-600 pt-6 px-6 overflow-y-scroll absolute top-0 bottom-0 right-0 w-[280px]'>
      <h4 className='font-medium text-gray-200'>
        <span className='text-white'>{weekDayFormatted},</span> {dayFormatted}
      </h4>
      <div className='mt-3 grid grid-cols-2 md:grid-cols-1 gap-2'>
        {availability.map((availableHour) => {
          return (
            <button
              key={availableHour.hour.toString()}
              disabled={!availableHour.isAvailable}
              className='bg-gray-600 p-2 text-gray-100 rounded-md text-sm last:mb-6 hover:bg-gray-500 disabled:bg-transparent disabled:opacity-40 transition-all'
            >
              {`${availableHour.hour.toString().padStart(2, '0')}:00h`}
            </button>
          )
        })}
      </div>
    </div>
  )
}
