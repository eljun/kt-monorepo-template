import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Studio")
    .items([
      S.documentTypeListItem("page").title("Pages"),

      S.divider(),

      S.listItem()
        .title("Site Settings")
        .child(
          S.document()
            .documentId("siteSettings")
            .schemaType("siteSettings")
            .title("Site Settings")
        ),
    ]);
