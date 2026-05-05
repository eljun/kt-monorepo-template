import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "section.hero" }],
      validation: (Rule) =>
        Rule.custom((sections, context) => {
          const slug = (context.document as { slug?: { current?: string } })?.slug?.current;
          if (slug !== "home") return true;
          if (!sections || sections.length === 0) {
            return "Homepage must contain at least one section.";
          }
          const firstSection = sections[0] as { _type?: string };
          if (firstSection?._type !== "section.hero") {
            return "Homepage must begin with a hero section.";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title, subtitle: `/${slug}` };
    },
  },
});
