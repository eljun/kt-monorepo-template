import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "nav",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              type: "string",
              description: "e.g. /about, /services, /contact",
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
