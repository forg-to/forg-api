import { Breadcrumb } from "../ui/Breadcrumb";

const entries = [
    {
        date: "March 2026",
        version: "v1.0",
        tag: "Initial Release",
        tagColor: "bg-green-100 text-green-700",
        changes: [
            "Public API launched at api.forg.to/v1",
            "Endpoints: GET /products, /products/:slug, /products/:slug/updates",
            "Endpoints: GET /users/:username, /users/:username/products, /users/:username/updates",
            "API key authentication with per-key rate limiting (60 req/min, 5,000 req/day)",
            "Rate limit headers on all responses (X-RateLimit-Limit, Remaining, Reset)",
        ],
    },
];

export function ChangelogSection() {
    return (
        <section id="changelog" className="scroll-mt-32">
            <div className="mb-12 mt-16 h-[1px] w-full bg-border" />
            <Breadcrumb items={["Reference", "Changelog"]} />
            <h1 className="mb-4 text-2xl font-serif font-semibold tracking-tight text-foreground">
                Changelog
            </h1>
            <p className="mb-10 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                Breaking changes will always be versioned (v2, v3, ...) so existing integrations
                keep working. Non-breaking additions are shipped continuously.
            </p>

            <div className="relative">
                {/* vertical timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-border" />

                <div className="space-y-10 pl-8">
                    {entries.map((entry) => (
                        <div key={entry.version} className="relative">
                            {/* dot */}
                            <div className="absolute -left-8 top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-white" />

                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="text-sm font-semibold text-foreground">{entry.date}</span>
                                <code className="text-xs font-mono text-foreground/50">{entry.version}</code>
                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${entry.tagColor}`}>
                                    {entry.tag}
                                </span>
                            </div>

                            <ul className="space-y-2">
                                {entry.changes.map((change, i) => (
                                    <li key={i} className="flex gap-2 text-[14px] text-foreground/75 leading-relaxed">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                                        {change}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
