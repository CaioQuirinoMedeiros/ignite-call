import { getWeekDays } from '@/utils/getWeekDays'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Calendar() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <header className='flex items-center justify-between'>
        <span className='font-medium'>
          Setembro <span className='text-gray-200'>2022</span>
        </span>
        <div className='flex flex-row items-center gap-2 text-gray-200'>
          <button className='rounded-md hover:text-gray-100 focus-within:shadow-md'>
            <ChevronLeft className='w-5 h-5' />
          </button>
          <button className='rounded-md hover:text-gray-100 focus-within:shadow-md'>
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
          <tr>
            <td className='box-border'></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className='w-full aspect-square bg-gray-600 text-center cursor-pointer rounded-md hover:bg-gray-500 disabled:bg-transparent disabled:opacity-40 disabled:cursor-default transition-all'>
                1
              </button>
            </td>
            <td>
              <button
                disabled
                className='w-full aspect-square bg-gray-600 text-center cursor-pointer rounded-md hover:bg-gray-500 disabled:bg-transparent disabled:opacity-40 disabled:cursor-default transition-all'
              >
                2
              </button>
            </td>

            <td>
              <button>3</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
