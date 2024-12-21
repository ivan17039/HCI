export default function BookingProcessPage() {
    return (
      <div className="text-gray-600 max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Booking Process</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Check Availability</h2>
            <p className="text-gray-600">
              Select your desired dates and check if your preferred apartment is available.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Choose Your Apartment</h2>
            <p className="text-gray-600">
              Browse our available apartments and select the one that best suits your needs.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Make a Reservation</h2>
            <p className="text-gray-600">
              Fill in your details and confirm your booking. A confirmation email will be sent to you.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Payment</h2>
            <p className="text-gray-600">
              Secure your booking with a deposit or full payment using our safe payment methods.
            </p>
          </section>
        </div>
      </div>
    );
  }
  
  