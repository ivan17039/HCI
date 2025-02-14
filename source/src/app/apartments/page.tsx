import Image from "next/image";
import Link from "next/link";
import { apartments } from "./data/apartments";
import NearbyDistances from "./components/nearby-distances";
import PropertyInformation from "./components/property-information";
import { Navigation } from "./components/navigation";

export default function ApartmentsPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center mb-16">
        <Image
          src="/img/Hero/hero2.png"
          alt="Luxury Apartments"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Discover Your Perfect Stay
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore our curated collection of comfortable and stylish
            apartments, tailored for every type of traveler.
          </p>
          <Link href="/booking">
            <button
              aria-label="Book your apartment now"
              className="book-navlink text-lg duration-300 transform hover:scale-105"
            >
              Book Your Stay
            </button>
          </Link>
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      {/* Apartments Listing */}
      <section className="px-8 py-16 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Our Apartments
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          Choose the perfect accommodation for your unforgettable vacation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {apartments.map((apartment) => (
            <div
              key={apartment.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl max-w-md mx-auto"
            >
              <div className="relative h-64">
                <Image
                  src={apartment.images[0].src || "/placeholder.svg"}
                  alt={apartment.images[0].alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {apartment.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {apartment.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-primary font-bold text-xl">
                    €{apartment.price}/night
                  </p>
                  <Link href={`/apartments/${apartment.id}`}>
                    <button className="nav-linkbtn text-sm">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation integrated within the page */}

      <Navigation />

      {/* Additional Sections */}
      <section className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <NearbyDistances />
        </div>
      </section>

      <PropertyInformation />
    </main>
  );
}
