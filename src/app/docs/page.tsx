import { SectionObserver } from "@/components/docs/SectionObserver";
import { IntroductionSection } from "@/components/docs/sections/IntroductionSection";
import { AuthenticationSection } from "@/components/docs/sections/AuthenticationSection";
import { RateLimitsSection } from "@/components/docs/sections/RateLimitsSection";
import { ErrorsSection } from "@/components/docs/sections/ErrorsSection";
import { ProductsSection } from "@/components/docs/sections/ProductsSection";
import { UsersSection } from "@/components/docs/sections/UsersSection";
import { ChangelogSection } from "@/components/docs/sections/ChangelogSection";

export default function DocsPage() {
  return (
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
          <p>Last updated: March 2026</p>
          <div className="flex gap-4">
            <a href="https://forg.to" target="_blank" className="hover:text-foreground transition-colors">forg.to</a>
            <a href="https://github.com/forg-to" target="_blank" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
