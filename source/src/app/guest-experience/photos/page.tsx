import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui-elements";
import { getGuestPhotos } from "@/lib/guestPhotos";

export default async function PhotosPage() {
  const guestPhotos = await getGuestPhotos();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Guest Photos</h2>
        <Link href="/guest-experience/photos/submit">
          <Button className="text-white">
            <Plus className="text-white" />
            Add Photo
          </Button>
        </Link>
      </div>

      {guestPhotos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No photos have been shared yet.</p>
          <Link href="/guest-experience/photos/submit">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Be the first to share a photo
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guestPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src={photo.imageUrl || "/placeholder.svg"}
                  alt={photo.title}
                  width={300}
                  height={200}
                  className="w-full h-72 object-cover rounded-md mb-4"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">{photo.title}</h3>
                <p className="text-sm text-gray-600">
                  Shared by: {photo.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
