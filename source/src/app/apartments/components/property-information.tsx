"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const images = [
  { src: "/img/Apartment2/entrance.jpg", alt: "Apartment entrance" },
  { src: "/img/Apartment1/grill.jpg", alt: "Outdoor grill area" },
  { src: "/img/Apartment2/balcony.jpg", alt: "Balcony view" },
  { src: "/img/Apartment1/mirror.jpg", alt: "Interior mirror view" },
];

export default function PropertyInformation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16  bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Your Perfect Getaway
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image grid */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((img, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-white text-lg font-semibold">
                      {img.alt}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Text content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Your Home Away From Home in Seget Donji
            </h3>
            <p className="text-xl text-gray-900 leading-relaxed">
              Escape to the breathtaking Croatian coast with Apartments3M. Our
              two charming apartments in Seget Donji offer the perfect blend of
              comfort and affordability, ideal for:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-800 space-y-2">
              <li>Local families seeking a seaside retreat</li>
              <li>Retired couples looking for a peaceful getaway</li>
              <li>Business travelers desiring a home-like atmosphere</li>
            </ul>
            <p className="text-xl text-gray-900 leading-relaxed">
              Immerse yourself in modern amenities while being captivated by
              stunning views of the Adriatic Sea. Your dream vacation starts
              here!
            </p>
            <div className="mt-8">
              <Link href="/about-us">
                <motion.button
                  className="button-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Discover Our Story
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
