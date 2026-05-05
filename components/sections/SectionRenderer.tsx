import { HeroSection } from "./HeroSection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SectionRenderer({ sections }: { sections: any[] }) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "section.hero":
            return <HeroSection key={section._key} {...section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
