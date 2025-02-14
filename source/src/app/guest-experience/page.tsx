import Image from "next/image";
import Link from "next/link";
import { StarIcon, Camera, MessageCircle } from "lucide-react";
import { getReviews } from "@/lib/reviews";
import { getGuestPhotos } from "@/lib/guestPhotos";

export default async function GuestExperiencePage() {
  // Fetch initial data (limited amount)
  const reviews = (await getReviews()).slice(0, 3);
  const photos = (await getGuestPhotos()).slice(0, 4);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
      {/* Featured Photos Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <h2 className="text-2xl font-semibold">Featured Guest Photos</h2>
          <Link
            href="/guest-experience/photos"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-500 transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span>View all photos</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
            >
              <Image
                src={photo.imageUrl || "/placeholder.svg"}
                alt={photo.title || "Guest photo"}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-sm">{photo.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Reviews Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <h2 className="text-2xl font-semibold">Latest Reviews</h2>
          <Link
            href="/guest-experience/reviews"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-500 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Read all reviews</span>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-200"
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 line-clamp-4">
                "{review.comment}"
              </blockquote>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 ">
                  {review.author}
                </span>
                <span className="text-gray-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl text-primary font-semibold">
          Share Your Experience
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Had a great stay with us? Share your photos and leave a review to help
          other travelers make their decision and become part of our community.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
          <Link
            href="/guest-experience/photos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-300 text-primary px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-200 hover:text-primaryHover transition-colors"
          >
            <Camera className="w-4 h-4" />
            Share Photos
          </Link>
          <Link
            href="/guest-experience/reviews"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primaryHover hover:text-white transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Write a Review
          </Link>
        </div>
      </section>
    </div>
  );
}
