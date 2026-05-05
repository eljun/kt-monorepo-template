import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import type { SectionHero } from "@/sanity.types";

export function HeroSection({
  heading,
  subheading,
  image,
  ctaLabel,
  ctaHref,
}: SectionHero) {
  const builder = image ? urlFor(image) : null;
  const bgUrl = builder ? builder.width(1920).url() : null;
  const altText = (image as { alt?: string } | undefined)?.alt ?? "";

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {bgUrl && (
        <Image
          src={bgUrl}
          alt={altText}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover -z-10 opacity-30"
        />
      )}
      <div className="mx-auto max-w-3xl text-center">
        {heading && (
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
            {heading}
          </h1>
        )}
        {subheading && (
          <p className="mt-6 text-lg text-muted-foreground">{subheading}</p>
        )}
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "mt-8"
            )}
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
