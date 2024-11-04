"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

// We hardcode pages here, but you could get this information from some external source (e.g. CMS, DB, config file, etc).
const pages: Page[] = [
  
  {
    title: "Availability Calendar",
    path: "/booking/availability",
  },
  {
    title: "Booking Process",
    path: "/booking/booking-process",
  },
  {
    title: "Cancellation Policy",
    path: "/booking/cancellation-policy",
  },
];

function processPage(page: Page, index: number, pathname: string) {
  return (
    <li key={index}>
      <Link
        href={page.path}
        className={
          page.path === "/"
            ? pathname === page.path
              ? "font-extrabold text-accent"
              : "text-primary"
            : pathname.startsWith(page.path)
            ? "font-extrabold text-accent"
            : "text-primary"
        }
      >
        {page.title}
      </Link>
    </li>
  );
}

export function Navigation() {
  const pathname = usePathname();
  return (
    <ul className="flex justify-center space-x-4 mt-8">
      {pages.map((page, index) => processPage(page, index, pathname))}
    </ul>
  );
}