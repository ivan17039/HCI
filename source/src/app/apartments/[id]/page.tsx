"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { apartments } from "../data/apartments";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  BedDouble,
  Bath,
  Maximize,
  Wifi,
  UtensilsCrossed,
  Car,
} from "lucide-react";
import { Card, CardContent, Button, Separator } from "../components/ui";

export default function ApartmentPage({ params }: { params: { id: string } }) {
  const apartment = apartments.find((a) => a.id === parseInt(params.id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter(); // Dodajte ovu liniju

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
    <div className="container mx-auto px-4 py-8 mt-20 text-gray-700">
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
                className={`flex-shrink-0 ${
                  index === currentImageIndex ? "ring-2 ring-primary" : ""
                }`}
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
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
              {apartment.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {apartment.description}
            </p>
          </div>
          <Separator />
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="grid gap-2 p-4">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{apartment.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {apartment.bathrooms} Bathrooms
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{apartment.size}m²</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="grid gap-2 p-4">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Free WiFi</span>
                </div>
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Fully Equipped Kitchen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Free Parking</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardContent className="grid gap-4 p-6">
              <div className="flex items-baseline justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Price per night</h3>
                  <p className="text-sm text-muted-foreground">
                    All taxes & fees included
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${apartment.price}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <Link href="/booking" className="block">
                  <Button className="w-[95%] nav-linkbtn px-2 py-1 mx-2 text-sm">
                    Book Now
                  </Button>
                </Link>

                <p className="text-center text-xs text-muted-foreground">
                  Free cancellation up to 24 hours before check-in
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex items-center justify-between mb-6">
          <Button className="nav-linkbtn" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
