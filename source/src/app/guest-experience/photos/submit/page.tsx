"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui-elements";
import { Input } from "@/components/ui-elements";
import { useToast } from "@/hooks/useToast";
import { submitPhoto } from "./actions";

export default function SubmitPhotoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a photo to upload",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      formData.set("image", selectedFile);

      await submitPhoto(formData);

      toast({
        title: "Success!",
        description: "Your photo has been uploaded successfully.",
        variant: "success",
      });

      // Redirect to photos page after successful submission
      router.push("/guest-experience/photos");
      router.refresh(); // This will refresh the photos page to show the new photo
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Share Your Photos</h2>
        <p className="text-gray-600">
          Share your memorable moments from your stay with other guests.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Name</label>
          <Input
            name="authorName"
            required
            placeholder="Enter your name"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Photo Title</label>
          <Input
            name="title"
            required
            placeholder="Give your photo a title"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Upload Photo</label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="hidden"
              id="photo-upload"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            <label
              htmlFor="photo-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">
                {selectedFile ? selectedFile.name : "Click to upload a photo"}
              </span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => router.push("/guest-experience/photos")}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Submit Photo"}
          </Button>
        </div>
      </form>
    </div>
  );
}
