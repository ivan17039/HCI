import Link from "next/link";

const links = [
  { name: "Availability", href: "/booking/availability" },
  { name: "Booking Process", href: "/booking/booking-process" },
  { name: "Cancellation Policy", href: "/booking/cancellation-policy" },
  { name: "Pricing", href: "/booking/pricing" },
];

export function Navigation() {
  return (
    <div className="flex justify-left items-center bg-secondary">
      <nav className="bg-gray-100 py-8 mt-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-left">
            {" "}
            {/* Promijenjeno iz text-center u text-left */}
            Explore More
          </h2>
          <div className="flex flex-wrap justify-start gap-4 md:gap-x-8">
            {" "}
            {/* Promijenjeno iz justify-center u justify-start */}
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base md:text-lg text-gray-600 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
