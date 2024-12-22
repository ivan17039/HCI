'use client'

import dynamic from 'next/dynamic'
import { Navigation } from './_components/navigation'
import { StepsNav } from './_components/steps-nav'
import { usePathname } from 'next/navigation'

function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isBookingFlow = pathname.startsWith('/booking') && 
    !pathname.includes('/availability') && 
    !pathname.includes('/booking-process') && 
    !pathname.includes('/cancellation-policy') && 
    !pathname.includes('/pricing')

  return (
    <section className="mt-20">
      {isBookingFlow && <StepsNav />}
      {children}
      <Navigation />
    </section>
  )
}

export default dynamic(() => Promise.resolve(BookingLayout), { ssr: false })