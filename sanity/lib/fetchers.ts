import { cache } from "react";
import { client } from "./client";
import { pageQuery, siteSettingsQuery, allPagesQuery } from "./queries";

type SlugEntry = { slug: string; _updatedAt?: string };

export const getPageBySlug = cache(async (slug: string) => {
  if (!client) return null;
  try {
    return await client.fetch(pageQuery, { slug });
  } catch (error) {
    console.warn(`[sanity] getPageBySlug("${slug}") failed:`, error);
    return null;
  }
});

export const getSiteSettings = cache(async () => {
  if (!client) return null;
  try {
    return await client.fetch(siteSettingsQuery);
  } catch (error) {
    console.warn("[sanity] getSiteSettings failed:", error);
    return null;
  }
});

export const getAllPageSlugs = cache(async (): Promise<SlugEntry[]> => {
  if (!client) return [];
  try {
    return await client.fetch<SlugEntry[]>(allPagesQuery);
  } catch (error) {
    console.warn("[sanity] getAllPageSlugs failed:", error);
    return [];
  }
});
