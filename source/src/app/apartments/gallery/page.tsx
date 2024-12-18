import Image from 'next/image';
import { images1, images2 } from '../data/galleryImages';

export default function GalleryPage() {
  return (
    <section className='py-20 px-20'>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Gallery</h2>
      <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center">Family Apartment With 3 beds</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images1.map((image, index) => (
          <div key={index} className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image 
              src={image.src} 
              alt={image.alt} 
              layout="fill" 
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-start p-4 transition-opacity duration-300 opacity-0 hover:opacity-100">
              <span className="text-white text-lg font-semibold">{image.alt}</span>
            </div>
          </div>
        ))}
      </div>
      <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center mt-20">Apartment for a small group</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images2.map((image, index) => (
          <div key={index} className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image 
              src={image.src} 
              alt={image.alt} 
              layout="fill" 
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-start p-4 transition-opacity duration-300 opacity-0 hover:opacity-100">
              <span className="text-white text-lg font-semibold">{image.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

