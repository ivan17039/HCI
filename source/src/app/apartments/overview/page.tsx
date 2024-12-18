import Image from 'next/image';
import { Check } from 'lucide-react';

const features = [
  'Spacious living areas',
  'Comfortable beds',
  'Equipped kitchen with appliances',
  'Free Wi-Fi',
  'Smart TV with streaming services',
  'Vintage, stylish decor',
  'Breathtaking views of the surrounding nature',
  'Close proximity to local attractions',
];

export default function OverviewPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-black mt-20 py-4">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-xl text-gray-700 mb-6">
            Our apartments offer a perfect blend of comfort, style, and convenience. Designed to cater to families, couples, and business travelers alike, each space is thoughtfully crafted to ensure a memorable stay.
          </p>
          <ul className="space-y-4 text-primary">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="w-6 h-6 text-green-500 mr-2" />
                <span className="text-lg">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="/img/Apartment2/grill.jpg" 
              alt="Apartment exterior" 
              layout="fill" 
              objectFit="cover"
            />
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="/img/Apartment2/kitchen.jpg" 
              alt="Apartment interior" 
              layout="fill" 
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

