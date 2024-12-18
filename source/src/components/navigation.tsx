"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import Logo from "@/components/logo";

export function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [blockHeight, setBlockHeight] = useState('auto');
  const [blockWidth, setBlockWidth] = useState('auto'); // Added blockWidth state
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleLogin = () => setIsLoggedIn(!isLoggedIn);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useClickOutside(navRef, closeMenu);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 50);
    };

    const updateBlockDimensions = () => { // Updated function name
      if (navRef.current) {
        const navItems = navRef.current.querySelector('ul');
        if (navItems) {
          const height = navItems.offsetHeight + 20; // Add some padding
          const width = navItems.offsetWidth + 40; // Add some padding
          setBlockHeight(`${height}px`);
          setBlockWidth(`${width}px`);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateBlockDimensions);
    updateBlockDimensions();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBlockDimensions);
    };
  }, [isLoggedIn]);


  const pages = [
    { title: "Apartments", path: "/apartments" },
    { title: "About Us", path: "/about-us" },
    { title: "Contact Us", path: "/contact" },
    { title: "Guest Experience", path: "/guest-experience" },
  ];

  const privatePages = [{ title: "My Reservations", path: "/my-reservations" }];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 h-[70px] flex items-center px-6 transition-all duration-300",
        hasScrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      )}
      ref={navRef}
    >
      <Link href="/" onClick={closeMenu} className="flex items-center">
        {/* Uvjetno renderiranje table */}
        {!hasScrolled ? (
          <div className="bg-white/80 border-4 border-primary shadow-lg rounded-xl px-6 py-4 relative">
            <Logo color="text-logoblue font-bold text-3xl" />
          </div>
        ) : (
          <div>
            <Logo color="text-logoblue font-bold text-3xl" />
          </div>
        )}
      </Link>

      <div className="container mx-auto flex justify-end items-center">
        <button
          className="flex customLg:hidden flex-col justify-start items-end w-10 h-10 p-2 z-50 space-y-1.5 rounded-md translate-x-2.5"
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

        <div className="hidden customLg:flex flex-1 items-center justify-center relative">
          <div 
            className={cn(
              "absolute bg-white rounded-md transition-all duration-300 ease-in-out",
              hasScrolled ? "opacity-0" : "opacity-100"
            )}
            style={{ 
              height: blockHeight, 
              width: blockWidth, // Added width style
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
          </div>
          <ul className={cn(
            "flex items-center justify-center space-x-5 font-medium relative",
            hasScrolled ? "text-primary" : "text-white"
          )}>
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
            {isLoggedIn && privatePages.map((page, index) => (
              <li key={index}>
                <Link
                  href={page.path}
                  className={`nav-link ${pathname.startsWith(page.path) ? "text-accent font-bold" : ""}`}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {isMenuOpen && (
          <ul className="absolute top-0 right-0 w-full bg-blue-50 shadow-lg p-4 space-y-4 customLg:hidden border-2 border-gray-300 rounded-lg text-center">
            <div className="pb-2 border-b border-gray-300 flex justify-between items-center">
              <div className="flex justify-center w-full ml-10">
                <Logo color="text-white font-bold" />
              </div>
            </div>

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
            {isLoggedIn && privatePages.map((page, index) => (
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
              <button
                onClick={handleLogin}
                className="text-lg font-semibold bg-primary text-white py-2 px-11 rounded-md shadow-md hover:bg-accent transition-all duration-300"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </li>
            <li className="text-center">
              <Link
                href="/booking"
                className="hover:border-accent border-2 hover:text-accent border-primary bg-white text-lg font-semibold text-primary py-2 px-6 rounded-md shadow-md hover:bg-white transition-all duration-300"
              >
                Book Now
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="hidden customLg:flex items-center gap-4 ml-4">
        <Link
          href="/booking"
          className="whitespace-nowrap rounded-none hover:text-accent border-2 hover:border-accent border-primary bg-white text-primary font-semibold py-2 px-6 shadow-md"
        >
          Book Now
        </Link>
        <button
          onClick={() => {
            handleLogin();
            setTimeout(() => {
              const navItems = navRef.current?.querySelector('ul');
              if (navItems) {
                const height = navItems.offsetHeight + 20;
                const width = navItems.offsetWidth + 40;
                setBlockHeight(`${height}px`);
                setBlockWidth(`${width}px`);
              }
            }, 0);
          }}
          className="whitespace-nowrap hover:bg-accent bg-primary text-white font-semibold py-2 px-6 rounded-md"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}

