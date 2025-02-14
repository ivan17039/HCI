import { contentfulClient } from "./contentful"

export async function getGuestPhotos() {
  const response = await contentfulClient.getEntries({
    content_type: "guestPhoto",
  })

  return response.items.map((item) => {
    const { title, authorName, image } = item.fields // Updated authorName to match schema
    return {
      id: item.sys.id,
      title: title as string,
      author: authorName as string, // Updated to use authorName
      imageUrl: image ? `https:${(image as any).fields.file.url}` : undefined, // Added https: prefix and null check
    }
  })
}

