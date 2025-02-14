import { Map } from "./components/map";
import { ContactForm } from "./components/contact-form";

export default function ContactPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto p-4 mt-24 mb-10 rounded-lg shadow-lg bg-white">
        <div className="h-[400px] w-full mb-8">
          <Map />
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
