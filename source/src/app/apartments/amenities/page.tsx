import {
  Wifi,
  CookingPotIcon as Kitchen,
  Wind,
  Utensils,
  Car,
  Dog,
  Tv,
  Coffee,
  Bath,
  Waves,
  Sun,
  Map,
} from "lucide-react";
import { Card, CardContent } from "../components/ui";
import { PageNavigation } from "../components/navigation";
const amenitiesCategories = [
  {
    title: "General",
    items: [
      {
        icon: Wifi,
        name: "High-Speed WiFi",
        description: "Stay connected with complimentary high-speed internet",
      },
      {
        icon: Kitchen,
        name: "Fully Equipped Kitchen",
        description: "Modern appliances and cookware for meal preparation",
      },
      {
        icon: Wind,
        name: "Air Conditioning",
        description: "Climate control for your comfort",
      },
      {
        icon: Tv,
        name: "Smart TV",
        description: "Entertainment system with streaming services",
      },
    ],
  },
  {
    title: "Outdoor",
    items: [
      {
        icon: Utensils,
        name: "Grill Section",
        description: "BBQ area for outdoor cooking",
      },
      {
        icon: Car,
        name: "Private Parking",
        description: "Secure parking space for your vehicle",
      },
      {
        icon: Sun,
        name: "Terrace",
        description: "Private outdoor space with seating",
      },
      {
        icon: Waves,
        name: "Sea View",
        description: "Beautiful views of the surrounding area",
      },
    ],
  },
  {
    title: "Comfort & Convenience",
    items: [
      {
        icon: Bath,
        name: "Modern Bathroom",
        description: "Fully equipped with essentials",
      },
      {
        icon: Coffee,
        name: "Coffee Machine",
        description: "Start your day with fresh coffee",
      },
      {
        icon: Dog,
        name: "Pet Friendly",
        description: "Welcoming environment for your pets",
      },
      {
        icon: Map,
        name: "Tourist Info",
        description: "Local guides and recommendations",
      },
    ],
  },
];

export default function AmenitiesPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-24 mt-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Apartment Amenities</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We've thoughtfully equipped our apartments with everything you need
          for a comfortable and enjoyable stay. Discover all the amenities and
          services available to our guests.
        </p>
      </div>

      <PageNavigation />

      <div className="space-y-12">
        {amenitiesCategories.map((category, index) => (
          <div key={index} className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={itemIndex}
                    className="group hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">Need Something Special?</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Don't see what you're looking for? Contact us and we'll do our best to
          accommodate your specific needs. We're here to make your stay as
          comfortable as possible.
        </p>
      </div>
    </section>
  );
}
