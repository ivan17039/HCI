import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui-elements";
import { getReviews } from "@/lib/reviews";

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Guest Reviews</h2>
        <Link href="/guest-experience/reviews/submit">
          <Button className="text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Review
          </Button>
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No reviews have been shared yet.</p>
          <Link href="/guest-experience/reviews/submit">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Be the first to write a review
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{review.title}</h3>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {review.date}
                </span>
              </div>
              <p className="text-gray-700 mb-4">"{review.comment}"</p>
              <p className="text-sm font-semibold text-gray-700 ">
                - {review.author}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
