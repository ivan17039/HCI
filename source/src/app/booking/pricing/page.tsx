import { apartments } from '../../apartments/data/apartments';

export default function PricingPage() {
  return (
    <div className="text-gray-600 max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pricing Information</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {apartments.map((apartment) => (
          <div key={apartment.id} className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{apartment.name}</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Nightly Rate</h3>
                <p className="text-2xl">€{apartment.price}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Includes</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All utilities</li>
                  <li>WiFi</li>
                  <li>Cleaning service</li>
                  <li>Basic amenities</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Additional Fees</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Tourist tax: €1 per person per night</li>
                  <li>Security deposit: €200 (refundable)</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

