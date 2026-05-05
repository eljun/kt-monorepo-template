// Documents
import { page } from "./documents/page";
import { siteSettings } from "./documents/siteSettings";

// Sections (object types used inside page.sections)
import { hero } from "./sections/hero";

export const schemaTypes = [
  // Documents
  page,
  siteSettings,

  // Sections
  hero,
];
