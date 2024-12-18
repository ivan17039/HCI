import Link from "next/link";
import Image from 'next/image';
import {apartments} from "./apartments/data/apartments";
export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-800">
      
      {/* Hero Section */}
      <section
        className="relative h-screen w-full flex items-center bg-cover bg-center"

      >
        <div
          className="absolute inset-0 transform scale-x-[-1]"
          style={{ backgroundImage: `url('/img/Hero/hero5.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col customLg:flex-row items-center justify-between w-full max-w-13 mx-auto px-6 md:px-14">
          {/* Text box */}
          <div className="bg-white/75 customLg:mr-4 p-8 customLg:p-8 rounded-none customLg:w-1/3 shadow-md text-left mx-auto max-w-[400px] customLg:ml-4 customLg:mt-20">
            <h1 className="text-3xl customLg:text-5xl font-extrabold text-black leading-tight text-center customLg:text-left">
              Stay By<br /> <span className="text-primary font-bold">The Sea,</span> <br />
              Relax In <br /><span className="text-accent font-bold">Comfort</span>
            </h1>
            <p className="mt-6 text-lg customLg:text-xl text-gray-800 font-medium text-center customLg:text-left">
              Affordable Beachside Apartments with Stunning Views and Unmatched Comfort.
            </p>
            
            {/* Centered button */}
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

          {/* Spacer (optional, for balance) */}
          <div className="hidden customLg:block customLg:w-1/2"></div>
        </div>
      </section>


      {/* All Apartments */}
      <section className="bg-white py-16 px-6">
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
      
        {/* CTA unutar sekcije */}
        <div className="mt-8 flex justify-center">
          <Link href="/apartments">
            <button className=" hover:border-accent text-lg border-2 hover:text-accent rounded-none border-primary bg-white  text-primary font-semibold py-3 px-6 shadow-md hover:bg-white transition transform hover:scale-105">
              View All Apartments
            </button>
          </Link>
        </div>



      </section>
       {/* Amenities Section*/}
       <section className="py-12 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Our Amenities</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Single Amenity */}
              <li className="flex flex-col items-center">
                <Image
                  src="/icons/ac.png"
                  alt="Air Conditioning"
                  className="w-12 h-12 mb-2"
                  width={400}
                  height={300}
                />
                <span className="text-lg font-medium text-white">Air Conditioning</span>
              </li>
              <li className="flex flex-col items-center">
                <Image
                  src="/icons/parking.png"
                  alt="Parking"
                  className="w-12 h-12 mb-2"
                  width={400}
                  height={300}
                />
                <span className="text-lg font-medium text-white">Parking</span>
              </li>
              <li className="flex flex-col items-center">
                <Image
                  src="/icons/wifi.png"
                  alt="Free Wi-Fi"
                  className="w-12 h-12 mb-2"
                  width={400}
                  height={300}
                />
                <span className="text-lg font-medium text-white">Free Wi-Fi</span>
              </li>
              <li className="flex flex-col items-center">
                <Image
                  src="/icons/pets.png"
                  alt="Pets Allowed"
                  className="w-12 h-12 mb-2"
                  width={400}
                  height={300}
                />
                <span className="text-lg font-medium text-white">Pets Allowed</span>
              </li>
            </ul>
          </div>
        </section>
      {/* GUEST EXPERIENCES SECTION */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">Guest Experiences</h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Hear from our satisfied guests.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Persona 1 */}
            <div className="bg-white p-4 rounded shadow flex flex-col items-center">
              <Image
                src="/img/ivan.jpg"
                alt="Ivan"
                className="w-20 h-20 object-cover rounded-full mb-4"
                width={400}
                height={300}
              />
              <h3 className="text-lg font-bold">Ivan</h3>
              <p className="text-gray-600">
                &quot;Accommodation suitable for families, close to nature or the
                beach. Relaxing vacation!&quot;
              </p>
            </div>
            {/* Persona 2 */}
            <div className="bg-white p-4 rounded shadow flex flex-col items-center">
              <Image
                src="/img/ana&marko.webp"
                alt="Ana & Marko"
                className="w-20 h-20 object-cover rounded-full mb-4"
                width={400}
                height={300}
              />
              <h3 className="text-lg font-bold">Ana & Marko</h3>
              <p className="text-gray-600">
                &quot;Quiet environment with easy access to recreational and health
                facilities.&quot;
              </p>
            </div>
            {/* Persona 3 */}
            <div className="bg-white p-4 rounded shadow flex flex-col items-center">
              <Image
                src="/img/robert.jpg"
                alt="Robert"
                className="w-20 h-20 object-cover rounded-full mb-4"
                width={400}
                height={300}
              />
              <h3 className="text-lg font-bold">Robert</h3>
              <p className="text-gray-600">
                &quot;Quiet space with reliable Wi-Fi and workspace for business
                stays.&quot;
              </p>
            </div>
          </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-accent text-white text-center py-16 px-6">
        <h2 className="text-4xl text-white font-bold mb-4">Ready to Book?</h2>
        <p className="text-lg mb-6">Don&apos;t wait, book your dream apartment today!</p>
        <Link href="/booking">
            <button
              aria-label="Book your apartment now"
              className=" bg-gray-100 text-accent hover:bg-primary hover:text-white font-semibold py-3 px-7 text-2xl rounded-none transition hover:scale-105 "
            >
              Book Now
            </button>
          </Link>
      </section>

    </main>
  );
}
