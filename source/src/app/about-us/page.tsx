"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutUs() {
  return (
    <div className="bg-white customLg:bg-secondary min-h-screen">
      <div className="container mx-auto p-4 mt-24 mb-10 rounded-lg shadow-lg bg-white">
        <motion.h1
          className="text-4xl font-extrabold text-gray-900 text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          Welcome to APARTMANI 3M
        </motion.h1>

        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Nestled in the charming town of Seget Donji, just a stone's
                throw away from the historic UNESCO city of Trogir, APARTMANI 3M
                offers a perfect blend of comfort, convenience, and breathtaking
                coastal views.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded by Marija Čarija, our apartments are designed to
                entertain the families, young adventurers, and seniors alike,
                providing a home away from home for all our guests.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/img/Hero/hero3.png"
                alt="Seget Donji panorama"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Apartments
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We offer two beautifully appointed apartments, each featuring:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>A master bedroom with an additional bed</li>
              <li>A living room with a pull-out sofa</li>
              <li>A fully equipped kitchen</li>
              <li>A private bathroom</li>
              <li>A small balcony with sea views</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our apartments share a spacious balcony with a traditional stone
              fireplace, perfect for enjoying warm evenings and breathtaking
              views of Trogir Bay and Čiovo Island.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Discover Seget Donji
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Location & History
              </h3>
              <p className="text-gray-700">
                Seget Donji, the largest settlement in its municipality, boasts
                a rich history and long-standing tourist tradition. Its old town
                core, reminiscent of Diocletian's Palace, offers a glimpse into
                the area's fascinating past.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Activities & Attractions
              </h3>
              <p className="text-gray-700">
                Enjoy pristine beaches, explore nearby hiking trails, or immerse
                yourself in the vibrant atmosphere of Trogir. With its mild
                climate, Seget Donji is perfect for both relaxation and
                adventure.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
