"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  const links = [
    {
      href: "/guest-experience",
      name: "Guest Experience",
    },
    {
      href: "/guest-experience/photos",
      name: "Guest Photos",
    },
    {
      href: "/guest-experience/reviews",
      name: "Guest Reviews",
    },
  ];

  return (
    <div className="flex justify-start items-center w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="mb-8 py-4">
        <ul className="flex flex-wrap -mb-px">
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
                      ? "border-accent text-accent"
                      : "border-transparent text-primary hover:text-accent hover:border-accent"
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
