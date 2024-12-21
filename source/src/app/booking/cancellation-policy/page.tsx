export default function CancellationPolicyPage() {
    return (
      <div className="text-gray-600 max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Cancellation Policy</h1>
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Flexible Cancellation</h2>
            <p>
              We understand that plans can change. Our cancellation policy is designed to be as flexible as possible:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Free cancellation up to 48 hours before check-in</li>
              <li>50% refund for cancellations made 24-48 hours before check-in</li>
              <li>No refund for cancellations made less than 24 hours before check-in</li>
            </ul>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Cancel</h2>
            <p>
              To cancel your reservation:
            </p>
            <ol className="list-decimal pl-6 mt-4 space-y-2">
              <li>Log into your account</li>
              <li>Go to your bookings</li>
              <li>Select the booking you wish to cancel</li>
              <li>Click the "Cancel Booking" button</li>
            </ol>
          </section>
        </div>
      </div>
    );
  }
  
  