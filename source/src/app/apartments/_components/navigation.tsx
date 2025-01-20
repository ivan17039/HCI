"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  {
    title: "Amenities",
    path: "/apartments/amenities",
  },
  {
    title: "Gallery",
    path: "/apartments/gallery",
  },
  {
    title: "Overview",
    path: "/apartments/overview",
  },
];

function processPage(page: Page, index: number, pathname: string) {
  const isActive =
    page.path === "/"
      ? pathname === page.path
      : pathname.startsWith(page.path);

  return (
    <Link href={page.path} key={index}>
      <button
        className={`rounded-lg shadow-lg subNavbutton ${isActive ? "active-class" : ""}`}
      >
        {page.title}
      </button>
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname() || ""; // Osiguravamo da pathname bude string
  return (
    <div>
      <h2 className="text-3xl font-bold text-black flex justify-center py-10">Explore More</h2>
      <ul className="flex justify-center space-x-4 py-5">
        {pages.map((page, index) => processPage(page, index, pathname))}
      </ul>
    </div>
  );
}