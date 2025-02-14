"use client";

import { useState } from "react";
import Image from "next/image";
import { images1, images2 } from "../data/galleryImages";
import { Dialog, DialogContent } from "../components/ui";
import { Button } from "../../../components/ui-elements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PageNavigation } from "../components/navigation";
interface ImageType {
  src: string;
  alt: string;
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [currentApartment, setCurrentApartment] = useState<"family" | "small">(
    "family"
  );

  const currentImages = currentApartment === "family" ? images1 : images2;

  const handleImageClick = (image: ImageType, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev - 1;
      setSelectedImage(currentImages[newIndex]);
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev + 1;
      setSelectedImage(currentImages[newIndex]);
      return newIndex;
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 mt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Gallery</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our beautifully designed spaces through our photo gallery.
          Each image showcases the comfort, style, and attention to detail that
          makes our apartments special.
        </p>
      </div>

      <PageNavigation />

      <Tabs defaultValue="family" className="mb-12">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger
            value="family"
            onClick={() => setCurrentApartment("family")}
          >
            Family Apartment
          </TabsTrigger>
          <TabsTrigger
            value="small"
            onClick={() => setCurrentApartment("small")}
          >
            Small Group Apartment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="family" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images1.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-gray-100"
                onClick={() => handleImageClick(image, index)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-lg font-medium">
                    {image.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="small" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images2.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-gray-100"
                onClick={() => handleImageClick(image, index)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-lg font-medium">
                    {image.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-[90vw] h-[90vh] p-0">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {selectedImage && (
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            )}
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6 " />
            </Button>
            <div className="absolute inset-x-0 bottom-0 flex justify-between p-4 bg-gradient-to-t from-black/60 to-transparent">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={handlePrevious}
                disabled={currentImageIndex === 0}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <span className="text-white text-lg font-medium">
                {selectedImage?.alt}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={handleNext}
                disabled={currentImageIndex === currentImages.length - 1}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
