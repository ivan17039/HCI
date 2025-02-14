"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui-elements";
import { Input } from "@/components/ui-elements";
import { Textarea } from "@/components/ui-elements";
import { useToast } from "@/hooks/useToast";
import { submitReview } from "./actions";

export default function SubmitReviewPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      formData.set("rating", rating.toString());

      await submitReview(formData);

      toast({
        title: "Success!",
        description: "Your review has been submitted successfully.",
        variant: "success",
      });

      router.push("/guest-experience/reviews");
      router.refresh();
    } catch (error) {
      console.error("Review submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Share Your Experience</h2>
        <p className="text-gray-600">
          Your feedback helps other guests make informed decisions and helps us
          improve our service.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Your Name</label>
          <Input
            name="authorName"
            required
            placeholder="Enter your name"
            className="w-full bg-white text-gray-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Review Title
          </label>
          <Input
            name="title"
            required
            placeholder="Sum up your experience in a title"
            className="w-full bg-white text-gray-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="text-2xl focus:outline-none transition-colors"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Your Review
          </label>
          <Textarea
            name="comment"
            required
            placeholder="Share the details of your experience..."
            className="w-full min-h-[150px] bg-white text-gray-600"
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-red-500 text-white hover:bg-red-400"
            onClick={() => router.push("/guest-experience/reviews")}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}
