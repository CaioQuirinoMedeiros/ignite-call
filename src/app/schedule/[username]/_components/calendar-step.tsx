'use client'

import * as React from 'react'

import { Calendar } from '@/components/calendar'
import { Box } from '@/components/ui/box'
import { TimePicker } from './time-picker'
import { cn } from '@/utils/styles'
import { setHours, startOfHour } from 'date-fns'

interface CalendarStepProps {
  username: string
  onSelectDateTime(date: Date): void
}

export function CalendarStep(props: CalendarStepProps) {
  const { username, onSelectDateTime } = props

  const [selectedDate, setSelectedDate] = React.useState<Date>()

  const containerClass = cn(
    'mt-6 mx-auto mb-0 p-0 grid max-w-full relative grid-cols-1',
    { 'md:grid-cols-[1fr_280px]': !!selectedDate, 'w-[540px]': !selectedDate }
  )

  function handleSelectHour(hour: number) {
    if (!selectedDate) return

    const dateTime = startOfHour(setHours(selectedDate, hour))
    onSelectDateTime(dateTime)
  }

  return (
    <Box className={containerClass}>
      <Calendar username={username} onDateSelected={setSelectedDate} />
      {!!selectedDate && (
        <TimePicker
          date={selectedDate}
          username={username}
          onSelectHour={handleSelectHour}
        />
      )}
    </Box>
  )
}
