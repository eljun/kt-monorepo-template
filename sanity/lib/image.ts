import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = client ? createImageUrlBuilder(client) : null;

// Returns a Sanity image URL builder, or null if the Sanity client
// hasn't been configured (NEXT_PUBLIC_SANITY_PROJECT_ID unset).
// Callers should null-check the result before chaining.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder ? builder.image(source) : null;
}
