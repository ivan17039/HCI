import Image from "next/image";
import { Card, CardContent } from "../components/ui";
import { Badge } from "../components/ui";
import {
  Check,
  Home,
  Users,
  Utensils,
  Wifi,
  Tv,
  Mountain,
  MapPin,
  Star,
} from "lucide-react";
import { PageNavigation } from "../components/navigation";
const features = [
  {
    icon: Home,
    title: "Spacious Living Areas",
    description:
      "Open-concept spaces perfect for family gatherings and relaxation",
  },
  {
    icon: Users,
    title: "Comfortable Accommodations",
    description: "High-quality beds and linens for a restful night's sleep",
  },
  {
    icon: Utensils,
    title: "Fully Equipped Kitchen",
    description:
      "Modern appliances and all necessary cookware for meal preparation",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Stay connected with complimentary high-speed internet access",
  },
  {
    icon: Tv,
    title: "Entertainment",
    description: "Smart TV with access to popular streaming services",
  },
  {
    icon: Mountain,
    title: "Scenic Views",
    description: "Breathtaking views of the surrounding natural landscape",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Easy access to local attractions and amenities",
  },
  {
    icon: Star,
    title: "Premium Experience",
    description: "Thoughtfully designed spaces with attention to detail",
  },
];

const highlights = [
  "Perfect for families and groups",
  "Peaceful and quiet location",
  "Modern amenities",
  "Stunning views",
  "Private parking",
  "Close to attractions",
  "Outdoor dining area",
  "Air conditioning",
];

export default function OverviewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 mt-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Apartments</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience the perfect blend of comfort, style, and convenience in our
          thoughtfully designed apartments. Whether you're traveling with family
          or friends, our spaces are crafted to make your stay memorable.
        </p>
      </div>

      <PageNavigation />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">The Perfect Stay Awaits</h2>
          <p className="text-gray-600 leading-relaxed">
            Our apartments offer more than just a place to stay – they provide a
            home away from home. With spacious living areas, modern amenities,
            and stunning views, every detail is designed to enhance your comfort
            and enjoyment.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/img/Apartment2/grill.jpg"
              alt="Apartment exterior"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/img/Apartment2/kitchen.jpg"
              alt="Apartment interior"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/img/Apartment1/bedroom.jpg"
              alt="Bedroom"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/img/Apartment1/balcony.jpg"
              alt="Balcony view"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">
          Featured Amenities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mt-16 bg-gray-50 rounded-2xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="success" className="mb-4">
            Special Offer
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Book Now and Save</h2>
          <p className="text-gray-600 mb-6">
            Take advantage of our special rates for extended stays and early
            bookings. Contact us to learn more about our current promotions.
          </p>
        </div>
      </div>
    </div>
  );
}
