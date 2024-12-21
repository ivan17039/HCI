import Link from "next/link";

const links = [
  { name: 'Availability', href: '/booking/availability' },
  { name: 'Booking Process', href: '/booking/booking-process' },
  { name: 'Cancellation Policy', href: '/booking/cancellation-policy' },
  { name: 'Pricing', href: '/booking/pricing' },
];

export function Navigation() {
  return (
    <nav className="bg-gray-100 py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">Explore More</h2>
        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

