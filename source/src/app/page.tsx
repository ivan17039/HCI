import Link from "next/link";
import Image from "next/image";
import { apartments } from "./apartments/data/apartments";
import BookingForm from "@/app/booking/_components/booking-form";

import { getReviews } from "@/lib/reviews";
import { getGuestPhotos } from "@/lib/guestPhotos";

import {
  StarIcon,
  Camera,
  MessageCircle,
  Wifi,
  Car,
  Snowflake,
  PawPrint,
} from "lucide-react";

export default async function Home() {
  const reviews = await getReviews();
  const guestPhotos = await getGuestPhotos();

  return (
    <main className="bg-secondary text-gray-800">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center bg-cover bg-center">
        <div
          className="absolute inset-0 transform scale-x-[-1]"
          style={{
            backgroundImage: `url('/img/Hero/hero4.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="gap-5 relative z-10 flex flex-col customLg:flex-row items-stretch justify-between w-full max-w-7xl mx-auto px-6 md:px-14 py-24">
          <div className="bg-white/75 p-8 rounded-lg customLg:w-1/2 shadow-md text-left mx-auto max-w-[500px] mb-10 customLg:mb-0">
            <h1 className="text-3xl customLg:text-5xl font-extrabold text-black leading-tight text-center customLg:text-left">
              Stay By
              <br /> <span className="text-primary font-bold">
                The Sea,
              </span>{" "}
              <br />
              Relax In <br />
              <span className="text-accent font-bold">Comfort</span>
            </h1>
            <p className="mt-6 text-lg customLg:text-xl text-gray-800 font-medium text-center customLg:text-left">
              Affordable Beachside Apartments with Stunning Views and Unmatched
              Comfort.
            </p>

            <div className="flex justify-center customLg:justify-start mt-8">
              <Link href="/booking">
                <button
                  aria-label="Book your apartment now"
                  className="button-primary hover:bg-accent hover:text-white"
                >
                  Book Now
                </button>
              </Link>
            </div>
          </div>

          <div className="customLg:w-1/2 flex items-end justify-center customLg:justify-end ">
            <BookingForm
              reservations={[]}
              apartmentId="someId"
              apartmentName="Some Apartment"
            />
          </div>
        </div>
      </section>

      {/* All Apartments */}
      <section className="bg-secondary py-32 px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Our Apartments
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Choose the perfect stay for your vacation.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {apartments.map((apartment) => (
            <div
              key={apartment.id}
              className="bg-[white] shadow rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <Image
                src={apartment.images[0].src} // Prva slika iz niza
                alt={apartment.images[0].alt} // Alt tekst prve slike
                className="w-full h-48 object-cover"
                width={400}
                height={300}
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {apartment.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {apartment.description}
                </p>
                <p className="text-accent font-bold mt-4">
                  €{apartment.price}/night
                </p>
                <Link href={`/apartments/${apartment.id}`}>
                  <button className="view-details-button">View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA unutar sekcije */}
        <div className="mt-8 flex justify-center">
          <Link href="/apartments">
            <button className="nav-linkbtn">View All Apartments</button>
          </Link>
        </div>
      </section>
      {/* Amenities Section */}
      <section className="py-24 bg-primaryHover">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Apartment Amenities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <Wifi className="w-12 h-12 text-white mb-4" />
              <span className="text-lg font-medium text-white">Free Wi-Fi</span>
            </div>
            <div className="flex flex-col items-center">
              <Car className="w-12 h-12 text-white mb-4" />
              <span className="text-lg font-medium text-white">Parking</span>
            </div>
            <div className="flex flex-col items-center">
              <Snowflake className="w-12 h-12 text-white mb-4" />
              <span className="text-lg font-medium text-white">
                Air Conditioning
              </span>
            </div>
            <div className="flex flex-col items-center">
              <PawPrint className="w-12 h-12 text-white mb-4" />
              <span className="text-lg font-medium text-white">
                Pet Friendly
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* GUEST EXPERIENCES SECTION */}
      <section className="bg-secondary py-16 px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Guest Experiences
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Discover what our guests love about staying with us.
        </p>
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Featured Photos - Reduced to 2 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Featured Photos</h3>
              <Link
                href="/guest-experience/photos"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-500 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>View all photos</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {guestPhotos.slice(0, 4).map((photo) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
                >
                  <Image
                    src={photo.imageUrl || "/placeholder.svg"}
                    alt={photo.title || "Guest photo"}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm">{photo.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Reviews - Reduced to 2 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Guest Reviews</h3>
              <Link
                href="/guest-experience/reviews"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-500 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Read all reviews</span>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {reviews.slice(0, 2).map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 line-clamp-3">
                    "{review.comment}"
                  </blockquote>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      {review.author}
                    </span>
                    <span className="text-gray-500">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 flex justify-center">
            <Link href="/guest-experience">
              <button className="nav-linkbtn">Explore all reviews</button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#BAB86C] text-white text-center py-16 px-6">
        <h2 className="text-4xl text-white font-bold mb-4">Ready to Book?</h2>
        <p className="text-lg mb-6">
          Don&apos;t wait, book your dream apartment today!
        </p>
        <Link href="/booking">
          <button
            aria-label="Book your apartment now"
            className="book-secondary transition duration-300 ease-in-out transform hover:scale-105"
          >
            Book Now
          </button>
        </Link>
      </section>
    </main>
  );
}
