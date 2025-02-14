"use server";

import { contentfulManagement } from "@/lib/contentfulManagement";

export async function submitPhoto(formData: FormData) {
  try {
    const space = await contentfulManagement.getSpace(process.env.CONTENTFUL_SPACE_ID!);
    const environment = await space.getEnvironment("master");

    const file = formData.get("image") as File;
    const arrayBuffer = await file.arrayBuffer();

    // First create an upload
    const upload = await environment.createUpload({
      file: arrayBuffer,
    });

    // Create the asset using the temporary URL
    const asset = await environment.createAsset({
      fields: {
        title: {
          "en-US": formData.get("title") as string,
        },
        description: {
          "en-US": `Uploaded by ${formData.get("authorName")}`,
        },
        file: {
          "en-US": {
            contentType: file.type,
            fileName: file.name,
            uploadFrom: {
              sys: {
                type: "Link",
                linkType: "Upload",
                id: upload.sys.id,
              },
            },
          },
        },
      },
    });

    // Process and publish the asset
    const processedAsset = await asset.processForAllLocales();
    const publishedAsset = await processedAsset.publish();

    // Return only plain objects
    return {
      id: publishedAsset.sys.id,
      title: publishedAsset.fields.title["en-US"],
      description: publishedAsset.fields.description ? publishedAsset.fields.description["en-US"] : "",
      file: {
        url: publishedAsset.fields.file["en-US"].url,
        contentType: publishedAsset.fields.file["en-US"].contentType,
        fileName: publishedAsset.fields.file["en-US"].fileName,
      },
    };
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
}