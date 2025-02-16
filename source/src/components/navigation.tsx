"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import Logo from "@/components/logo";

export function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [blockHeight, setBlockHeight] = useState("auto");
  const [blockWidth, setBlockWidth] = useState("auto");
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useClickOutside(navRef, () => setIsMenuOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 50);
    };

    const updateBlockDimensions = () => {
      if (navRef.current) {
        const navItems = navRef.current.querySelector("ul");
        if (navItems) {
          const height = navItems.offsetHeight + 20; // Add some padding
          const width = navItems.offsetWidth + 40; // Add some padding
          setBlockHeight(`${height}px`);
          setBlockWidth(`${width}px`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateBlockDimensions);
    updateBlockDimensions();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBlockDimensions);
    };
  }, []); // Removed isLoggedIn from dependencies

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    const handleLogin = () => {
      setIsLoggedIn(true);
    };

    window.addEventListener("login", handleLogin);

    return () => {
      window.removeEventListener("login", handleLogin);
    };
  }, []);

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
        hasScrolled ? "bg-white shadow-md" : "bg-transparent"
      )}
      ref={navRef}
    >
      <Link
        href="/"
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center"
      >
        {!hasScrolled ? (
          <div className="bg-white/80 border-4 border-primary shadow-lg rounded-xl px-1 py-4 relative">
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
          className="nav-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              isMenuOpen
                ? "-rotate-45 -translate-y-2.5 w-7 translate-x-0.5"
                : ""
            )}
          />
        </button>

        <div className="hidden customLg:flex flex-1 items-center justify-center relative ml-10">
          <div
            className={cn(
              "absolute bg-white rounded-md transition-all duration-300 ease-in-out",
              hasScrolled ? "opacity-0" : "opacity-100"
            )}
            style={{
              height: blockHeight,
              width: blockWidth,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
          <ul
            className={cn(
              "flex items-center justify-center space-x-5 font-medium relative",
              hasScrolled ? "text-primary" : "text-white"
            )}
          >
            {pages.map((page, index) => (
              <li key={index}>
                <Link
                  href={page.path}
                  className={`nav-link ${
                    pathname && pathname.startsWith(page.path)
                      ? "text-accent font-bold"
                      : ""
                  }`}
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
                    className={`nav-link ${
                      pathname && pathname.startsWith(page.path)
                        ? "text-accent font-bold"
                        : ""
                    }`}
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
              <div className="flex justify-center w-full">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <Logo color="text-logoblue font-bold" />
                </Link>
              </div>
            </div>

            {pages.map((page, index) => (
              <li key={index}>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href={page.path}
                  className={`nav-link ${
                    pathname && pathname.startsWith(page.path)
                      ? "text-accent font-bold"
                      : ""
                  }`}
                >
                  {page.title}
                </Link>
              </li>
            ))}
            {isLoggedIn &&
              privatePages.map((page, index) => (
                <li key={index}>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    href={page.path}
                    className={`nav-link ${
                      pathname && pathname.startsWith(page.path)
                        ? "text-accent"
                        : ""
                    }`}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}

            {!isLoggedIn && (
              <>
                <li>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="login-linkMobile"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="register-linkMobile"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="book-navlinkMobile w-36"
                >
                  Logout
                </button>
              </li>
            )}

            <li className="text-center">
              <Link
                href="/booking"
                className="book-navlinkMobile"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="hidden customLg:flex items-center gap-4 ml-4">
        <Link href="/booking" className="book-navlink">
          Book Now
        </Link>
        {!isLoggedIn ? (
          <>
            <Link href="/login" className="nav-linkbtn">
              Login
            </Link>
            <Link href="/register" className="nav-linkbtn">
              Register
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="whitespace-nowrap hover:bg-accent bg-primary text-white font-semibold py-2 px-6 rounded-md"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
