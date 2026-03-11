import { Callout } from "../ui/Callout";
import { Breadcrumb } from "../ui/Breadcrumb";

export function IntroductionSection() {
    return (
        <section id="introduction" className="scroll-mt-32">
            <Breadcrumb items={["Getting Started", "Introduction"]} />
            <h1 className="mb-4 text-3xl font-serif font-semibold tracking-tight text-foreground">
                Introduction
            </h1>
            <p className="mb-6 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                The forg.to API gives you read access to public data about builders and their products.
                It&apos;s free, read-only, and requires an API key linked to your forg.to account.
                Use it to build dashboards, tools, or anything else on top of the forg.to ecosystem.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row mb-10">
                <div className="flex-1 rounded-lg border border-border bg-sidebar p-4">
                    <div className="mb-1 text-xs font-semibold text-foreground/50 uppercase tracking-wide">
                        Base URL
                    </div>
                    <code className="text-sm font-mono text-accent">
                        https://api.forg.to/v1
                    </code>
                </div>
                <div className="flex-1 rounded-lg border border-border bg-sidebar p-4">
                    <div className="mb-1 text-xs font-semibold text-foreground/50 uppercase tracking-wide">
                        Version
                    </div>
                    <code className="text-sm font-mono text-foreground/90">v1</code>
                </div>
                <div className="flex-1 rounded-lg border border-border bg-sidebar p-4">
                    <div className="mb-1 text-xs font-semibold text-foreground/50 uppercase tracking-wide">
                        Auth
                    </div>
                    <code className="text-sm font-mono text-foreground/90">Bearer token</code>
                </div>
            </div>

            <h2 className="mb-4 text-xl font-serif font-semibold tracking-tight text-foreground">
                Quick Start
            </h2>
            <p className="mb-5 text-foreground/80 text-[15px] leading-relaxed">
                Get up and running in under a minute:
            </p>

            <ol className="mb-8 space-y-4 text-[15px] text-foreground/80">
                <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent mt-0.5">1</span>
                    <span>
                        Go to{" "}
                        <a href="https://forg.to/settings/api" target="_blank" className="text-accent font-medium hover:underline">
                            forg.to/settings/api
                        </a>{" "}
                        and generate a free API key.
                    </span>
                </li>
                <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent mt-0.5">2</span>
                    <span>Pass it in the <code className="rounded border border-border bg-code-bg px-1.5 py-0.5 text-sm font-mono">Authorization</code> header of every request.</span>
                </li>
                <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent mt-0.5">3</span>
                    <span>Use any of the endpoints below — all responses are JSON.</span>
                </li>
            </ol>

            <h2 className="mb-4 text-xl font-serif font-semibold tracking-tight text-foreground">
                What you can access
            </h2>
            <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                    { title: "Products", desc: "List, filter, and fetch individual products by slug" },
                    { title: "Product Updates", desc: "Get the full changelog for any public product" },
                    { title: "Builder Profiles", desc: "Fetch public profiles — bio, skills, social links, stats" },
                    { title: "User Updates", desc: "All published posts from a specific builder" },
                ].map((item) => (
                    <div key={item.title} className="rounded-lg border border-border bg-sidebar p-4">
                        <div className="mb-1 text-sm font-semibold text-foreground">{item.title}</div>
                        <div className="text-[13px] text-foreground/60 leading-relaxed">{item.desc}</div>
                    </div>
                ))}
            </div>

            <Callout type="info">
                The forg.to API is <strong className="font-semibold text-foreground">free with no commercial restrictions</strong>.
                Build whatever you want on top of it. The only rule: don&apos;t resell or republish raw data as a standalone dataset.
            </Callout>
        </section>
    );
}
