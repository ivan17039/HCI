import { contentfulClient } from "./contentful"

export async function getReviews() {
  const response = await contentfulClient.getEntries({
    content_type: "guestReview", // Updated to match Contentful content type ID
  })

  return response.items.map((item) => {
    const { title, authorName, rating, comment, date } = item.fields // Updated authorName to match schema
    return {
      id: item.sys.id,
      title: title as string,
      author: authorName as string, // Updated to use authorName
      rating: rating as number,
      comment: comment as string,
      date: new Date(date as string).toLocaleDateString("en-US", { year: "numeric", month: "long" }),
    }
  })
}

