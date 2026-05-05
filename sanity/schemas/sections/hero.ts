import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "section.hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA href",
      type: "string",
      description: "Internal path (e.g. /about) or external URL",
    }),
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare({ title, media }) {
      return { title: title ?? "Hero", subtitle: "Hero Section", media };
    },
  },
});
