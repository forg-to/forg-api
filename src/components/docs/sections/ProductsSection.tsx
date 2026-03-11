import { Breadcrumb } from "../ui/Breadcrumb";
import { ParamsTable } from "../ui/ParamsTable";
import { SchemaBlock } from "../ui/SchemaBlock";
import { TryItButton } from "../ui/TryItButton";

export function ProductsSection() {
    return (
        <section id="products" className="scroll-mt-32">
            <div className="mb-12 mt-16 h-[1px] w-full bg-border" />
            <Breadcrumb items={["Endpoints", "Products"]} />
            <h1 className="mb-4 text-2xl font-serif font-semibold tracking-tight text-foreground">
                Products
            </h1>
            <p className="mb-8 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                Products represent what builders on forg.to are making. Every product has a lifecycle
                status, engagement stats, and a chronological feed of updates.
            </p>

            {/* List Products */}
            <div className="mb-10">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-serif font-semibold tracking-tight text-foreground flex flex-wrap items-center gap-3">
                        List Products
                        <span className="rounded bg-accent/10 border border-accent/20 px-2 py-1 flex items-center gap-2 text-xs font-mono font-bold text-accent">
                            GET <span className="text-foreground/60 font-normal">/v1/products</span>
                        </span>
                    </h2>
                    <TryItButton method="GET" endpoint="/products" queryParams={[
                        { name: "page", default: "1" },
                        { name: "limit", default: "20" },
                        { name: "status", default: "launched" },
                        { name: "sort", default: "newest" },
                    ]} />
                </div>
                <p className="mb-4 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                    Returns a paginated list of public products. Use <code className="rounded border border-border bg-code-bg px-1.5 py-0.5 text-sm font-mono">sort=trending</code> to get the most upvoted this week.
                </p>

                <ParamsTable
                    parameters={[
                        { name: "page", type: "number", default: "1", description: "Page number (1-indexed)" },
                        { name: "limit", type: "number", default: "20", description: "Items per page. Maximum 50." },
                        { name: "status", type: "string", description: "Filter by lifecycle status. One of: idea, validating, building, alpha, beta, launched, growing, profitable, funded, scaling, paused, dead, acquired." },
                        { name: "sort", type: "string", default: "newest", description: "Sort order. newest returns most recently created first. trending returns most upvoted first." },
                    ]}
                />

                <div className="mt-4 mb-2 text-sm font-medium text-foreground">Paginated Response</div>
                <SchemaBlock
                    schema={{
                        data: ["...product objects"],
                        pagination: {
                            page: 1,
                            limit: 20,
                            total: 340,
                            hasMore: true
                        }
                    }}
                />
            </div>

            <div className="mb-10 mt-10 h-[1px] w-full bg-border/50" />

            {/* Get Product by Slug */}
            <div className="mb-10">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-serif font-semibold tracking-tight text-foreground flex flex-wrap items-center gap-3">
                        Get Product
                        <span className="rounded bg-accent/10 border border-accent/20 px-2 py-1 flex items-center gap-2 text-xs font-mono font-bold text-accent">
                            GET <span className="text-foreground/60 font-normal">/v1/products/:slug</span>
                        </span>
                    </h2>
                    <TryItButton method="GET" endpoint="/products/doomed" />
                </div>
                <p className="mb-4 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                    Retrieve a single product by its slug. Returns <code className="rounded border border-border bg-code-bg px-1.5 py-0.5 text-sm font-mono">404</code> if the product doesn&apos;t exist or is private.
                </p>

                <ParamsTable
                    parameters={[
                        { name: "slug", type: "string", required: true, description: "The product's unique URL slug, e.g. my-product-name." },
                    ]}
                />
            </div>

            <div className="mb-10 mt-10 h-[1px] w-full bg-border/50" />

            {/* Get Product Updates */}
            <div className="mb-10">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-serif font-semibold tracking-tight text-foreground flex flex-wrap items-center gap-3">
                        List Product Updates
                        <span className="rounded bg-accent/10 border border-accent/20 px-2 py-1 flex items-center gap-2 text-xs font-mono font-bold text-accent">
                            GET <span className="text-foreground/60 font-normal">/v1/products/:slug/updates</span>
                        </span>
                    </h2>
                    <TryItButton method="GET" endpoint="/products/doomed/updates" queryParams={[
                        { name: "page", default: "1" },
                        { name: "limit", default: "20" },
                    ]} />
                </div>
                <p className="mb-4 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                    Returns all published updates (build logs, milestones, launches, etc.) for a product, sorted by most recent. Pinned updates always appear first.
                </p>

                <ParamsTable
                    parameters={[
                        { name: "slug", type: "string", required: true, description: "The product's slug." },
                        { name: "page", type: "number", default: "1", description: "Page number." },
                        { name: "limit", type: "number", default: "20", description: "Items per page. Maximum 50." },
                    ]}
                />
            </div>

            <div className="mb-3 text-sm font-semibold text-foreground">Product Object</div>
            <SchemaBlock
                schema={{
                    id: "6789abc123",
                    name: "Doomed",
                    slug: "doomed",
                    tagline: "Twitter for builders who ship",
                    description: "A focused microblogging platform for indie makers.",
                    logo: "https://cdn.forg.to/logos/doomed.png",
                    website: "https://doomed.build",
                    github: null,
                    status: "building",
                    keywords: ["social", "builders", "indie"],
                    isOpenSource: false,
                    sourceCodeUrl: null,
                    category: "social_media_tools",
                    platforms: ["web"],
                    productType: "saas",
                    priceType: "free",
                    stats: { upvotes: 128, updates: 34 },
                    owner: {
                        username: "kislay",
                        displayName: "Kislay",
                        profileImage: "https://cdn.forg.to/avatars/kislay.jpg"
                    },
                    launchDate: null,
                    createdAt: "2025-11-01T00:00:00.000Z"
                }}
            />

            <div className="mt-8 mb-3 text-sm font-semibold text-foreground">Update Object</div>
            <SchemaBlock
                schema={{
                    id: "upd_a1b2c3",
                    type: "milestone",
                    title: "Hit 1,000 users",
                    content: "Just crossed 1,000 signups. Here's what worked...",
                    media: [{ type: "image", url: "https://cdn.forg.to/media/abc.jpg", caption: "Growth chart" }],
                    engagement: { likes: 47, comments: 12 },
                    author: {
                        username: "kislay",
                        displayName: "Kislay",
                        profileImage: "https://cdn.forg.to/avatars/kislay.jpg"
                    },
                    product: {
                        slug: "doomed",
                        name: "Doomed",
                        logo: "https://cdn.forg.to/logos/doomed.png"
                    },
                    publishedAt: "2026-03-10T14:00:00.000Z"
                }}
            />
        </section>
    );
}
