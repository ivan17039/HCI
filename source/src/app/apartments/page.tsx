import Image from 'next/image';
import Link from 'next/link';
import { apartments } from './data/apartments';
export default function ApartmentsPage() {
  return (
    <main className="bg-white text-gray-800">  
      {/* Title and Description */}
      <div className="relative w-full min-h-[60vh] flex items-center justify-center mb-10">
        <Image
          src="/img/Hero/hero2.png"
          alt="Real Estate Property"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Explore our range of comfortable apartments, perfect for any type of stay.
        </h1>
        <div className="flex justify-center mt-8">
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
    <div className="px-8 py-12 max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">Our Apartments</h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Choose the perfect stay for your vacation.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {apartments.map((apartment) => (
            <div
              key={apartment.id}
              className="bg-white shadow rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <Image
                src={apartment.images[0].src}  // Prva slika iz niza
                alt={apartment.images[0].alt}  // Alt tekst prve slike
                className="w-full h-48 object-cover"
                width={400}
                height={300}
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{apartment.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{apartment.description}</p>
                <p className="text-accent font-bold mt-4">€{apartment.price}/night</p>
                <Link href={`/apartments/${apartment.id}`}>
                  <button className="shadow-mg bg-primary mt-4 bg-turquoise text-white font-semibold py-2 px-4 rounded hover:bg-turquoise-dark">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <section className="bg-gray-100 py-10 px-6 rounded-lg shadow-md my-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Nearby Distances
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
          {[
            { name: "Sea", value: "40 m" },
            { name: "Beach", value: "40 m" },
            { name: "Center", value: "200 m" },
            { name: "Store", value: "250 m" },
            { name: "Doctor", value: "1 500 m" },
            { name: "Pharmacy", value: "200 m" },
            { name: "Bank", value: "250 m" },
            { name: "Post Office", value: "200 m" },
            { name: "Bus Station", value: "200 m" },
            { name: "Casino", value: "1 500 m" },
            { name: "Airport", value: "3 000 m" },
            { name: "Marina", value: "500 m" },
            { name: "Disco Club", value: "1 000 m" },
            { name: "Restaurant", value: "100 m" },
            { name: "National Park", value: "65 000 m" },
            { name: "Gas Station", value: "2 000 m" },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-accent text-xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    
    </div>
    <h2 className="text-3xl font-bold text-gray-800 mb-4 px-12">Property Information</h2>
      <section className="px-4 sm:px-8 py-12 w-full mx-auto bg-accent shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image grid */}
            <div className="flex justify-center lg:justify-start">
              <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div>
                    <Image
                      src="/img/Apartment2/entrance.jpg"
                      alt={`Apartment view`}
                      className="w-full h-auto object-cover"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className='flex justify-center'>
                    <Image
                      src="/img/Apartment1/grill.jpg"
                      alt={`Apartment view`}
                      className="w-full h-auto object-cover"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div>
                    <Image
                      src="/img/Apartment2/balcony.jpg"
                      alt={`Apartment view`}
                      className="w-full h-auto object-cover"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div>
                    <Image
                      src="/img/Apartment1/mirror.jpg"
                      alt={`Apartment view`}
                      className="w-full h-auto object-cover"
                      width={400}
                      height={300}
                    />
                  </div>
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col justify-center space-y-6 lg:pl-8">
              <p className="text-lg sm:text-xl text-black">
                Apartments3M offers two cozy and affordable apartments in Seget Donji, Croatia. Our
                accommodations are perfect for local families, retired couples, and business travelers.
                Experience a relaxing stay with modern amenities and stunning views of the Adriatic Sea.
              </p>
              <div className="flex justify-start">
                <Link href="/about">
                  <button className="px-6 py-3 text-lg font-semibold border-primary text-white border-2 hover:border-primary bg-primary hover:bg-white hover:text-primary rounded-lg shadow-lg transition transform hover:scale-105">
                    Learn More About Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

