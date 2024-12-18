import { images1, images2 } from './galleryImages';

export interface Apartment {
  id: number;
  name: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  images: { src: string; alt: string }[];
}

export const apartments: Apartment[] = [
  {
    id: 1,
    name: "Family Apartment",
    description: "A beautiful apartment with a stunning view of the sea. Perfect for a relaxing getaway.",
    price: 70,
    bedrooms: 2,
    bathrooms: 1,
    size: 75,
    images: images1,
  },
  {
    id: 2,
    name: "Small Group Apartment",
    description: "Cozy apartment with sea views, perfect for couples or small families.",
    price: 85,
    bedrooms: 3,
    bathrooms: 2,
    size: 100,
    images: images2,
  }
];

