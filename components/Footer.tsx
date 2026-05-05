type SiteSettings = {
  siteName?: string | null;
} | null;

export function Footer({ siteSettings }: { siteSettings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <p className="text-sm text-muted-foreground">
          © {year} {siteSettings?.siteName ?? "{{PROJECT_NAME}}"}
        </p>
      </div>
    </footer>
  );
}
