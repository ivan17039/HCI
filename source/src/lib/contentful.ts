import { createClient } from "contentful";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const contentfulClient = client;