import * as React from 'react'

import { cn } from '@/utils/styles'

export interface MultiStepProps extends React.HTMLAttributes<HTMLDivElement> {
  size: number
  currentStep: number
}

type MultiStep = HTMLDivElement

const MultiStep = React.forwardRef<MultiStep, MultiStepProps>((props, ref) => {
  const { className, currentStep, size, ...rest } = props

  return (
    <div ref={ref} className={cn('', className)} {...rest}>
      <span className='text-xs'>
        Passo {currentStep} de {size}
      </span>
      <div className={`grid gap-2 mt-1 grid-cols-[repeat(auto-fit,_minmax(0,1fr))]`}>
        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return (
            <div
              key={step}
              className={cn('h-1 rounded-[1px] bg-gray-600', {
                ['bg-gray-100']: step >= size
              })}
            />
          )
        })}
      </div>
    </div>
  )
})
MultiStep.displayName = 'MultiStep'

export { MultiStep }
