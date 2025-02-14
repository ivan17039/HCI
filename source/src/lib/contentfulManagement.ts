import { createClient } from "contentful-management"

if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
  throw new Error("Missing Contentful Management Token")
}

export const contentfulManagement = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
})

