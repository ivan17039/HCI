'use client'

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { apartments } from '../data/apartments';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export default function ApartmentPage({ params }: { params: { id: string } }) {
  const apartment = apartments.find(a => a.id === parseInt(params.id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!apartment) {
    notFound();
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === apartment.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? apartment.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-4xl font-bold mb-6">{apartment.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <Image 
            src={apartment.images[currentImageIndex].src}
            alt={apartment.images[currentImageIndex].alt}
            width={600}
            height={400}
            className="rounded-lg mb-4 object-cover w-full h-[400px]"
          />
          <button 
            onClick={prevImage} 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextImage} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="flex overflow-x-auto space-x-2 mt-4">
            {apartment.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 ${index === currentImageIndex ? 'ring-2 ring-primary' : ''}`}
              >
                <Image 
                  src={image.src}
                  alt={image.alt}
                  width={100}
                  height={67}
                  className="rounded object-cover w-[100px] h-[67px]"
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-lg mb-4 text-gray-900">{apartment.description}</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-gray-900">
            <h2 className="text-xl font-semibold mb-2">Apartment Details</h2>
            <p>Price: ${apartment.price} / night</p>
            <p>Bedrooms: {apartment.bedrooms}</p>
            <p>Bathrooms: {apartment.bathrooms}</p>
            <p>Size: {apartment.size} m²</p>
          </div>
          <Link href="/booking">
            <button
              aria-label="Book your apartment now"
              className="text-lg customLg:text-xl border-2 border-primary bg-primary text-white font-semibold py-3 px-10 shadow-lg hover:bg-white hover:border-accent hover:text-accent transition transform hover:scale-105 rounded-none"
            >
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

