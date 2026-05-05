import { defineCliConfig } from "sanity/cli";

// projectId/dataset are required by the Sanity CLI for commands like
// `sanity dataset import`. Schema extract / typegen only read schema
// files locally and do not contact the API. Replace these with your
// real project ID and dataset name when ready.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
