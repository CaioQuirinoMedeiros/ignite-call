'use client'

import * as React from 'react'
import { CalendarStep } from './calendar-step'
import { ConfirmStep } from './confirm-step'

interface ScheduleFormProps {
  username: string
}

export function ScheduleForm(props: ScheduleFormProps) {
  const { username } = props

  const [selectedDateTime, setSelectedDateTime] = React.useState<Date>()

  function clearSelectedDateTime() {
    setSelectedDateTime(undefined)
  }

  return selectedDateTime ? (
    <ConfirmStep
      username={username}
      schedulingDate={selectedDateTime}
      clearSelectedDateTime={clearSelectedDateTime}
    />
  ) : (
    <CalendarStep username={username} onSelectDateTime={setSelectedDateTime} />
  )
}
