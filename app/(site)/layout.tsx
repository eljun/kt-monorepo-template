// Pure static — content freshness is driven by an external rebuild trigger
// (e.g. Sanity → Vercel deploy hook). Between deploys, pages serve from the
// edge cache.
export const revalidate = false;

import { getSiteSettings } from "@/sanity/lib/fetchers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header siteSettings={settings} />
      <main className="flex-1">{children}</main>
      <Footer siteSettings={settings} />
    </>
  );
}
