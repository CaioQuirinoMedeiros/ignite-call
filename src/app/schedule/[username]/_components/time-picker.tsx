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

export function TimePicker() {
  return (
    <div className='border-l border-gray-600 pt-6 px-6 overflow-y-scroll absolute top-0 bottom-0 right-0 w-[280px]'>
      <h4 className='font-medium text-gray-200'>
        <span className='text-white'>terça-feira,</span> 20 de setembro
      </h4>
      <div className='mt-3 grid grid-cols-2 md:grid-cols-1 gap-2'>
        {times.map((time) => {
          return (
            <button
              key={time}
              disabled={time === '10:00h'}
              className='bg-gray-600 p-2 text-gray-100 rounded-md text-sm last:mb-6 hover:bg-gray-500 disabled:bg-transparent disabled:opacity-40 transition-all'
            >
              {time}
            </button>
          )
        })}
      </div>
    </div>
  )
}
