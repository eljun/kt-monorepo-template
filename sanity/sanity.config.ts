import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";

const SINGLETON_TYPES = ["siteSettings"];

export default defineConfig({
  name: "default",
  title: "{{PROJECT_NAME}}",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      if (SINGLETON_TYPES.includes(context.schemaType)) {
        return prev.filter(
          ({ action }) =>
            action !== "delete" && action !== "duplicate" && action !== "restore"
        );
      }
      return prev;
    },
  },
});
