import Link from "next/link";

type SiteSettings = {
  siteName?: string | null;
  nav?: Array<{ _key?: string; label?: string | null; href?: string | null }> | null;
} | null;

export function Header({ siteSettings }: { siteSettings: SiteSettings }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-semibold text-foreground">
          {siteSettings?.siteName ?? "{{PROJECT_NAME}}"}
        </Link>
        {siteSettings?.nav && siteSettings.nav.length > 0 && (
          <nav className="flex items-center gap-6">
            {siteSettings.nav.map((item) =>
              item?.href && item?.label ? (
                <Link
                  key={item._key ?? item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : null
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
