'use client'

import * as React from 'react'
import { getWeekDays } from '@/utils/getWeekDays'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  setDate,
  format,
  subMonths,
  addMonths,
  getDaysInMonth,
  getDay,
  subDays,
  addDays,
  getWeek,
  getDate,
  isPast,
  endOfDay,
  getMonth,
  isSameDay,
  isWithinInterval,
  parse,
  parseISO
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { capitalize } from '@/utils/capitalize'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

type CalendarDate = {
  date: Date
  disabled: boolean
}

type UserBlockedDatesResponse = {
  blockedDates: string[]
}

interface CalendarProps {
  username: string
  onDateSelected?(date: Date): void
}

export function Calendar(props: CalendarProps) {
  const { username, onDateSelected } = props

  const [currentDate, setCurrentDate] = React.useState(setDate(new Date(), 1))

  const currentMonth = getMonth(currentDate)
  const currentYear = currentDate.getFullYear()
  const currentMonthFormatted = format(currentDate, 'MMMM', { locale: ptBR })

  const { data: blockedDates } = useQuery<Date[]>(
    ['blocked-dates', { username, month: currentMonth, year: currentYear }],
    async () => {
      const response = await api.get<UserBlockedDatesResponse>(
        `/users/${username}/blocked-dates`,
        {
          params: {
            month: currentMonth,
            year: currentYear
          }
        }
      )

      return response.data.blockedDates.map((blockedDate) => {
        return parseISO(blockedDate)
      })
    }
  )

  function handlePrevMonth() {
    setCurrentDate((prevCurrentDate) => subMonths(prevCurrentDate, 1))
  }

  function handleNextMonth() {
    setCurrentDate((prevCurrentDate) => addMonths(prevCurrentDate, 1))
  }

  const calendarWeeks = React.useMemo(() => {
    if (!blockedDates) return []

    const daysInMonth: CalendarDate[] = Array.from({
      length: getDaysInMonth(currentDate)
    }).map((_, index) => {
      const date = setDate(currentDate, index + 1)
      const isPastDate = isPast(endOfDay(date))
      const isBlocked = blockedDates.some((blockedDate) => {
        return isSameDay(blockedDate, date)
      })
      return { date: date, disabled: isPastDate || isBlocked }
    })

    while (getDay(daysInMonth[0].date) !== 0) {
      daysInMonth.unshift({
        date: subDays(daysInMonth[0].date, 1),
        disabled: true
      })
    }

    while (getDay(daysInMonth[daysInMonth.length - 1].date) !== 6) {
      daysInMonth.push({
        date: addDays(daysInMonth[daysInMonth.length - 1].date, 1),
        disabled: true
      })
    }

    const datesPerWeek = daysInMonth.reduce((acc, calendarDate) => {
      const weekIndex = getWeek(calendarDate.date)
      const weekDates = acc[weekIndex] ?? []
      return { ...acc, [weekIndex]: [...weekDates, calendarDate] }
    }, {} as { [week: number]: CalendarDate[] })

    return Object.entries(datesPerWeek).map(([weekIndex, weekDays]) => {
      return weekDays
    })
  }, [currentDate, blockedDates])

  function handleSelectCalendarDate(calendarDate: CalendarDate) {
    onDateSelected && onDateSelected(calendarDate.date)
  }

  return (
    <div className='flex flex-col gap-6 p-6'>
      <header className='flex items-center justify-between'>
        <span className='font-medium'>
          {capitalize(currentMonthFormatted)}{' '}
          <span className='text-gray-200'>{currentDate.getFullYear()}</span>
        </span>
        <div className='flex flex-row items-center gap-2 text-gray-200'>
          <button
            className='rounded-md hover:text-gray-100 focus-within:shadow-md'
            onClick={handlePrevMonth}
            title='Previous month'
          >
            <ChevronLeft className='w-5 h-5' />
          </button>
          <button
            className='rounded-md hover:text-gray-100 focus-within:shadow-md'
            onClick={handleNextMonth}
            title='Next month'
          >
            <ChevronRight />
          </button>
        </div>
      </header>

      <table className='w-full font-sans border-spacing-1 table-fixed'>
        <thead>
          <tr>
            {getWeekDays().map((weekDay) => {
              return (
                <th
                  key={weekDay}
                  className='uppercase text-gray-200 font-medium text-sm text-center'
                >
                  {weekDay.slice(0, 3)}.
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="before:content-['.'] before:leading-3 before:block before:text-gray-800">
          {calendarWeeks.map((week, weekIndex) => {
            return (
              <tr key={weekIndex.toString()}>
                {week.map((calendarDate) => {
                  return (
                    <td key={calendarDate.date.toISOString()}>
                      <button
                        disabled={calendarDate.disabled}
                        className='w-full aspect-square bg-gray-600 text-center cursor-pointer rounded-md hover:bg-gray-500 disabled:bg-transparent disabled:opacity-40 disabled:cursor-default transition-all'
                        onClick={() => handleSelectCalendarDate(calendarDate)}
                      >
                        {getDate(calendarDate.date)}
                      </button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
