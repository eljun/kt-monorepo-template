import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity queries will return null. " +
      "Copy .env.example to .env.local and fill in your project ID."
  );
}

// Single Sanity client used for both server and client components.
//
// To support production / preview / draft modes (Sanity Visual Editing,
// Presentation tool, etc.), expand this file with separate `serverClient`
// and `previewClient` exports that pass `perspective: "drafts"` and a
// `SANITY_API_READ_TOKEN`. See https://www.sanity.io/docs/preview-content
// for guidance.
export const client: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: process.env.NODE_ENV === "production",
    })
  : null;
