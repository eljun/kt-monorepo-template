import { groq } from "next-sanity";

// Page query — keeps the projection trivial. When sections start
// referencing other documents (services, locations, etc.), expand
// this with conditional projections per `_type`. See
// https://www.sanity.io/docs/groq for projection syntax.
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    sections[]
  }
`;

export const siteSettingsQuery = groq`
  *[_id == "siteSettings"][0] {
    siteName,
    nav[] {
      _key,
      label,
      href
    }
  }
`;

export const allPagesQuery = groq`
  *[_type == "page" && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    _updatedAt
  }
`;
