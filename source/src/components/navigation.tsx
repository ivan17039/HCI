"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Provjeri da li koristiš ovu funkciju ili ukloni ako nije potrebna
import { useClickOutside } from "@/hooks/useClickOutside";
import Logo from "@/components/logo";
export function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulacija login stanja
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stanje za hamburger meni
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleLogin = () => setIsLoggedIn(!isLoggedIn); // Promjena login stanja
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Otvaranje/zatvaranje menija
  const closeMenu = () => setIsMenuOpen(false);

  useClickOutside(navRef, closeMenu);

  // Navigacijske stranice
  const pages = [
    { title: "Apartments", path: "/apartments" },
    { title: "About Us", path: "/about-us" },
    { title: "Contact Us", path: "/contact" },
    { title: "Guest Experience", path: "/guest-experience" },
  ];

  // Privatne stranice
  const privatePages = [{ title: "My Reservations", path: "/my-reservations" }];

  return (
    <nav
        className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-[70px] flex items-center px-4"
        ref={navRef}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="text-2xl font-bold text-teal-300">
            <div className="relative">
              <div className="absolute top-[-17px] left-1/2 transform -translate-x-[60%] text-accent text-xl">
                ★ ★ ★
              </div>
              <div className="flex items-center">
                <span className="text-3xl text-logoblue text-shadow-turquoise">A</span>
                <span className="text-logoblue text-shadow-turquoise">PARTMAN</span>
                <span className="text-3xl text-logoblue text-shadow-turquoise">I</span>
                <span className="text-4xl text-white text-stroke-black text-red-border ml-2 font-italic">3m</span>
              </div>
            </div>
          </Link>

          {/* Hamburger meni za mobilne uređaje */}
          <button
            className="flex customLg:hidden flex-col justify-center items-end w-10 h-10 p-2 space-y-1.5 rounded-md translate-x-2.5"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={cn(
                "w-7 h-1 bg-black rounded-full transition-transform",
                isMenuOpen ? "rotate-45 translate-y-2.5 translate-x-0.5" : ""
              )}
            />
            <span
              className={cn(
                "w-6 h-1 bg-black rounded-full transition-opacity",
                isMenuOpen ? "opacity-0" : ""
              )}
            />
            <span
              className={cn(
                "w-7 h-1 bg-black rounded-full transition-transform",
                isMenuOpen ? "-rotate-45 -translate-y-2.5 w-7 translate-x-0.5" : ""
              )}
            />
          </button>

          {/* Desktop meni */}
          <ul className="hidden customLg:flex space-x-6 font-medium items-center">
            {pages.map((page, index) => (
              <li key={index}>
                <Link
                  href={page.path}
                  className={`nav-link ${pathname.startsWith(page.path) ? "text-accent font-bold" : ""}`}
                >
                  {page.title}
                </Link>
              </li>
            ))}
            {isLoggedIn &&
              privatePages.map((page, index) => (
                <li key={index}>
                  <Link
                    href={page.path}
                    className={`nav-link ${pathname.startsWith(page.path) ? "text-accent" : ""}`}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            <li>
              <Link
                href="/booking"
                className="rounded-none hover:text-accent border-2 hover:border-accent border-primary bg-white text-primary font-semibold py-2 px-6 shadow-md"
              >
                Book Now
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogin}
                className="hover:bg-accent bg-primary text-white font-semibold py-2 px-6 rounded-md"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </li>
          </ul>

          {/* Mobilni meni */}
          {isMenuOpen && (
            <ul className="absolute top-0 right-0 w-full bg-blue-50 shadow-lg p-4 space-y-4 customLg:hidden border-2 border-gray-300 rounded-lg text-center">
              

              {/* Logo centriran */}
              <div className="pb-2 border-b border-gray-300 flex justify-between items-center">
                <div className="flex justify-center w-full ml-10">
                  <Logo color="text-logoblue" />
                </div>
                {/* X gumb unutar mobilnog menija */}
                <button
                    className="flex customLg:hidden flex-col justify-center items-end w-10 h-10 p-2 space-y-1.5 rounded-md -translate-x-1 -translate-y-6"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  >
                    <span
                      className={cn(
                        "w-7 h-1 bg-black rounded-full transition-transform",
                        isMenuOpen ? "rotate-45 translate-y-2.5 translate-x-0.5" : ""
                      )}
                    />
                    <span
                      className={cn(
                        "w-6 h-1 bg-black rounded-full transition-opacity",
                        isMenuOpen ? "opacity-0" : ""
                      )}
                    />
                    <span
                      className={cn(
                        "w-7 h-1 bg-black rounded-full transition-transform",
                        isMenuOpen ? "-rotate-45 -translate-y-2.5 w-7 translate-x-0.5" : ""
                      )}
                    />
                </button>
              </div>

              {/* Navigacijski linkovi */}
              {pages.map((page, index) => (
                <li key={index}>
                  <Link
                    href={page.path}
                    className={`nav-link ${pathname.startsWith(page.path) ? "text-accent font-bold" : ""}`}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
              {isLoggedIn &&
                privatePages.map((page, index) => (
                  <li key={index}>
                    <Link
                      href={page.path}
                      className={`nav-link ${pathname.startsWith(page.path) ? "text-accent" : ""}`}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}

              {/* Gumb za Login */}
              <li>
                <button
                  onClick={handleLogin}
                  className="w-full text-lg font-semibold bg-primary text-white py-2 px-6 rounded-md shadow-md hover:bg-accent transition-all duration-300"
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </button>
              </li>

              {/* Gumb za Book Now */}
              <li>
                <Link
                  href="/booking"
                  className=" hover:border-accent border-2 hover:text-accent  border-primary bg-white  w-full block text-lg font-semibold   text-primary py-2 px-6 rounded-md shadow-md  hover:bg-white  transition-all duration-300"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>


  );
}
