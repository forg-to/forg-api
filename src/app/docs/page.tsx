import { SectionObserver } from "@/components/docs/SectionObserver";
import { IntroductionSection } from "@/components/docs/sections/IntroductionSection";
import { AuthenticationSection } from "@/components/docs/sections/AuthenticationSection";
import { RateLimitsSection } from "@/components/docs/sections/RateLimitsSection";
import { ErrorsSection } from "@/components/docs/sections/ErrorsSection";
import { ProductsSection } from "@/components/docs/sections/ProductsSection";
import { UsersSection } from "@/components/docs/sections/UsersSection";
import { ChangelogSection } from "@/components/docs/sections/ChangelogSection";

export default function DocsPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "forg.to",
    url: "https://forg.to",
    logo: "https://api.forg.to/logo.png",
    sameAs: ["https://x.com/forg_to"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "forg.to API Documentation",
    url: "https://api.forg.to",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://api.forg.to/docs?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div>
      <SectionObserver>
        <IntroductionSection />
        <AuthenticationSection />
        <RateLimitsSection />
        <ErrorsSection />
        <ProductsSection />
        <UsersSection />
        <ChangelogSection />
      </SectionObserver>

      <footer className="mt-24 border-t border-border pt-8 pb-12 text-sm text-foreground/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 forg.to — Last updated: March 2026</p>
          <div className="flex items-center gap-5">
            <a href="https://forg.to" target="_blank" className="hover:text-foreground transition-colors">
              forg.to
            </a>
            <a href="https://x.com/forg_to" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              {/* X (Twitter) icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @forg_to
            </a>
            <a href="https://github.com/forg-to/forg-api" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
