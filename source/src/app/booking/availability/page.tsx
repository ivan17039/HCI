import { apartments } from '../../apartments/data/apartments';

export default function AvailabilityPage() {
  return (
    <div className="text-gray-600 max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Check Availability</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {apartments.map((apartment) => (
          <div key={apartment.id} className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{apartment.name}</h2>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Pricing</h3>
              <p className="text-lg">From €{apartment.price} per night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

