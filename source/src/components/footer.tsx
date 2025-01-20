import Link from "next/link";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import React from "react";
import Logo from "@/components/logo";
// Definiramo podatke koji se koriste u footeru
const contactDetails = {
  address: ["Ulica Hrvatskih žrtava 204", "21218 Seget Donji", "Croatia"],
  phone: "+(385) 021 880 143",
  email: "apartmani3M.seget@gmail.com",
};

const socialLinks = [
  { icon: FaFacebook, href: "#" },
  { icon: FaTwitter, href: "#" },
  { icon: FaLinkedin, href: "#" },
  { icon: FaInstagram, href: "#" },
];

const sitemapLinks = [
  { name: "Home", href: "/" },
  { name: "Apartments", href: "/apartments" },
  { name: "Booking", href: "/booking" },
  { name: "Guest Experiences", href: "/guest-experience" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-primary py-6">

    {/* Logo at the top */}
    <div className="text-center mb-6">
        <Logo color="text-white text-3xl" />
    </div>

    <div className="container flex justify-between font-lato">
        {/* Left Section: Contact Us */}
        <div className="text-white">
            <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
            <div className="mt-2 space-y-1">
            {contactDetails.address.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
            </div>
            <div className="mt-4">
            <div className="flex items-center space-x-2">
                <FaPhoneAlt />
                <span>{contactDetails.phone}</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
                <FaEnvelope />
                <span>{contactDetails.email}</span>
            </div>
            </div>
            <div className="flex space-x-4 mt-4">
            {socialLinks.map(({ icon: Icon, href }, index) => (
                <a
                key={index}
                href={href}
                className="text-white hover:text-gray-300"
                >
                <Icon size={24} />
                </a>
            ))}
            </div>
        </div>

        

        {/* Right Section: Sitemap */}
        <div className="space-y-2 text-right">
        <h3 className="text-xl font-semibold text-gray-900">Sitemap</h3>
            <ul  className="space-y-1 mt-2 ">
            {sitemapLinks.map(({ name, href }, index) => (
                <li key={index}>
                <Link href={href} className="hover:underline text-white">
                    {name}
                </Link>
                </li>
            ))}
            </ul>
        </div>
    </div>

    {/* Footer Bottom Section */}
    <div className="text-center mt-6 text-gray-900">
    <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
</footer>
  );
}
