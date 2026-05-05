export const revalidate = false;

import type { Metadata } from "next";
import Link from "next/link";
import { getPageBySlug } from "@/sanity/lib/fetchers";
import { SectionRenderer } from "@/components/sections/SectionRenderer";

const SLUG = "home";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG);
  return {
    title: page?.title ?? "{{PROJECT_NAME}}",
  };
}

export default async function HomePage() {
  const page = await getPageBySlug(SLUG);

  if (!page) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="max-w-md text-center px-6">
          <p className="text-2xl font-semibold text-foreground mb-3">
            No homepage yet.
          </p>
          <p className="text-sm text-muted-foreground">
            Create a page with slug{" "}
            <code className="font-mono text-xs px-1.5 py-0.5 bg-muted rounded">
              home
            </code>{" "}
            in{" "}
            <Link
              href="/studio"
              className="text-primary underline underline-offset-2"
            >
              Sanity Studio
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return <SectionRenderer sections={page.sections ?? []} />;
}
