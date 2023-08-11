'use client'

import * as React from 'react'

import { Calendar } from '@/components/calendar'
import { Box } from '@/components/ui/box'
import { TimePicker } from './time-picker'
import { cn } from '@/utils/styles'

export function CalendarStep() {
  const [selectedDate] = React.useState(new Date())

  const containerClass = cn(
    'mt-6 mx-auto mb-0 p-0 grid max-w-full relative grid-cols-1',
    { 'md:grid-cols-[1fr_280px]': !!selectedDate, 'w-[540px]': !selectedDate }
  )

  return (
    <Box className={containerClass}>
      <Calendar />
      {!!selectedDate && <TimePicker />}
    </Box>
  )
}
