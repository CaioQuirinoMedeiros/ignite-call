import { format, setDay } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function getWeekDays() {
  return Array.from(Array(7).keys()).map((weekDay) => {
    const formatted =  format(setDay(new Date(), weekDay), 'EEEE', { locale: ptBR })
    return formatted.substring(0,1).toUpperCase() + formatted.substring(1)
  })
}
