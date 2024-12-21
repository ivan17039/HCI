'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const steps = [
  { name: 'Dates', path: '/booking' },
  { name: 'Room', path: '/booking/room' },
  { name: 'Contact', path: '/booking/contact' },
  { name: 'Payment', path: '/booking/payment' }
]

export function StepsNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentStepIndex = steps.findIndex(step => step.path === pathname)

  const getStepHref = (path: string) => {
    const params = new URLSearchParams(searchParams)
    return `${path}?${params.toString()}`
  }

  return (
    <nav className="w-full max-w-4xl mx-auto mb-8">
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li key={step.name} className="relative flex-1">
            <Link
              href={getStepHref(step.path)}
              className={`flex flex-col items-center text-sm font-medium 
                ${index <= currentStepIndex ? 'text-primary' : 'text-gray-500'}`}
            >
              <span className={`flex items-center justify-center w-8 h-8 mb-2 rounded-full border-2 bg-white
                ${index <= currentStepIndex ? 'border-primary bg-primary' : 'border-gray-300'}`}
              >
                {index + 1}
              </span>
              <span className="hidden sm:block">{step.name}</span>
              {index < steps.length - 1 && (
                <div className={`
                  ${index < currentStepIndex ? 'bg-primary' : 'bg-accent'}`}
                />
              )}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

