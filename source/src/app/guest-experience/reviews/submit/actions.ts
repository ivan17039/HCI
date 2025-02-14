"use server"

import { contentfulManagement } from "@/lib/contentfulManagement"

export async function submitReview(formData: FormData) {
  try {
    const space = await contentfulManagement.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment("master")

    // Create the review entry
    const entry = await environment.createEntry("guestReview", {
      fields: {
        title: {
          "en-US": formData.get("title") as string,
        },
        authorName: {
          "en-US": formData.get("authorName") as string,
        },
        rating: {
          "en-US": Number.parseInt(formData.get("rating") as string),
        },
        comment: {
          "en-US": formData.get("comment") as string,
        },
        date: {
          "en-US": new Date().toISOString(),
        },
      },
    })

    await entry.publish()

    return entry
  } catch (error) {
    console.error("Contentful error:", error)
    throw error
  }
}

