"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Overview", href: "/apartments/overview" },
  { name: "Gallery", href: "/apartments/gallery" },
  { name: "Amenities", href: "/apartments/amenities" },
];

export function PageNavigation() {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-200 mb-12">
      <div className="max-w-7xl mx-auto">
        <nav className="flex justify-center space-x-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  py-4 px-2 border-b-2 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function Navigation() {
  return (
    <nav className="bg-primaryHover py-12 border-t border-gray-200">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Explore More
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-x-12">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg md:text-xl text-gray-50 hover:text-gray-200 transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
