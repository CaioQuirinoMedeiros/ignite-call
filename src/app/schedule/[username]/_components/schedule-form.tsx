import { CalendarStep } from './calendar-step'
import { ConfirmStep } from './confirm-step'

interface ScheduleFormProps {
  username: string
}

export function ScheduleForm(props: ScheduleFormProps) {
  const { username } = props

  return <CalendarStep username={username} />
}
