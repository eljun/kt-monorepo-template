export const revalidate = false;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, getAllPageSlugs } from "@/sanity/lib/fetchers";
import { SectionRenderer } from "@/components/sections/SectionRenderer";

export async function generateStaticParams() {
  const pages = await getAllPageSlugs();
  return pages
    .filter((p) => p.slug && p.slug !== "home")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  return { title: page?.title ?? "{{PROJECT_NAME}}" };
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return <SectionRenderer sections={page.sections ?? []} />;
}
