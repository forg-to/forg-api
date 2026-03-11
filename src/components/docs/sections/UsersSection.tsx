import { Breadcrumb } from "../ui/Breadcrumb";
import { ParamsTable } from "../ui/ParamsTable";
import { SchemaBlock } from "../ui/SchemaBlock";
import { TryItButton } from "../ui/TryItButton";
import { Callout } from "../ui/Callout";

export function UsersSection() {
    return (
        <section id="users" className="scroll-mt-32">
            <div className="mb-12 mt-16 h-[1px] w-full bg-border" />
            <Breadcrumb items={["Endpoints", "Users"]} />
            <h1 className="mb-4 text-2xl font-serif font-semibold tracking-tight text-foreground">
                Users
            </h1>
            <p className="mb-6 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                Users are the builders on forg.to. The API exposes their public profile information —
                bio, skills, social links, and activity stats. Private information (email, tokens, settings)
                is never returned.
            </p>

            <Callout type="info">
                Users who have enabled <strong className="font-semibold text-foreground">incognito mode</strong> or
                whose accounts are not active will return <code className="font-mono bg-blue-50 px-1 rounded">404</code> from all user endpoints.
            </Callout>

            {/* Get User */}
            <div className="mb-10 mt-10">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-serif font-semibold tracking-tight text-foreground flex flex-wrap items-center gap-3">
                        Get Builder Profile
                        <span className="rounded bg-accent/10 border border-accent/20 px-2 py-1 flex items-center gap-2 text-xs font-mono font-bold text-accent">
                            GET <span className="text-foreground/60 font-normal">/v1/users/:username</span>
                        </span>
                    </h2>
                    <TryItButton method="GET" endpoint="/users/kislay" />
                </div>
                <p className="mb-4 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                    Returns a builder&apos;s full public profile including stats (products, updates, followers, following).
                </p>

                <ParamsTable
                    parameters={[
                        { name: "username", type: "string", required: true, description: "The builder's username on forg.to. Case-insensitive." },
                    ]}
                />
            </div>

            <div className="mb-10 mt-10 h-[1px] w-full bg-border/50" />

            {/* User Products */}
            <div className="mb-10">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-serif font-semibold tracking-tight text-foreground flex flex-wrap items-center gap-3">
                        List User&apos;s Products
                        <span className="rounded bg-accent/10 border border-accent/20 px-2 py-1 flex items-center gap-2 text-xs font-mono font-bold text-accent">
                            GET <span className="text-foreground/60 font-normal">/v1/users/:username/products</span>
                        </span>
                    </h2>
                    <TryItButton method="GET" endpoint="/users/kislay/products" queryParams={[
                        { name: "page", default: "1" },
                        { name: "limit", default: "20" },
                    ]} />
                </div>
                <p className="mb-4 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                    Returns all public products owned by a builder, sorted by most recently created.
                    Private products are never returned.
                </p>

                <ParamsTable
                    parameters={[
                        { name: "username", type: "string", required: true, description: "The builder's username." },
                        { name: "page", type: "number", default: "1", description: "Page number." },
                        { name: "limit", type: "number", default: "20", description: "Items per page. Maximum 50." },
                    ]}
                />
            </div>

            <div className="mb-10 mt-10 h-[1px] w-full bg-border/50" />

            {/* User Updates */}
            <div className="mb-10">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-serif font-semibold tracking-tight text-foreground flex flex-wrap items-center gap-3">
                        List User&apos;s Updates
                        <span className="rounded bg-accent/10 border border-accent/20 px-2 py-1 flex items-center gap-2 text-xs font-mono font-bold text-accent">
                            GET <span className="text-foreground/60 font-normal">/v1/users/:username/updates</span>
                        </span>
                    </h2>
                    <TryItButton method="GET" endpoint="/users/kislay/updates" queryParams={[
                        { name: "page", default: "1" },
                        { name: "limit", default: "20" },
                        { name: "type", default: "" },
                    ]} />
                </div>
                <p className="mb-4 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                    Returns all published updates from a builder across all their products, sorted by most recent.
                    Use the <code className="rounded border border-border bg-code-bg px-1.5 py-0.5 text-sm font-mono">type</code> filter to narrow by update category.
                </p>

                <ParamsTable
                    parameters={[
                        { name: "username", type: "string", required: true, description: "The builder's username." },
                        { name: "page", type: "number", default: "1", description: "Page number." },
                        { name: "limit", type: "number", default: "20", description: "Items per page. Maximum 50." },
                        { name: "type", type: "string", description: "Filter by update type. One of: update, launch, feature, milestone, revenue, bugfix, design, idea, fail, win, announcement, integration." },
                    ]}
                />
            </div>

            <div className="mb-3 text-sm font-semibold text-foreground">User Object</div>
            <SchemaBlock
                schema={{
                    username: "kislay",
                    displayName: "Kislay",
                    profileImage: "https://cdn.forg.to/avatars/kislay.jpg",
                    bio: "Building things in public. forg.to founder.",
                    location: "India",
                    website: "https://kislay.dev",
                    skills: [
                        { name: "Next.js", category: "framework" },
                        { name: "TypeScript", category: "language" }
                    ],
                    socialLinks: [
                        { platform: "twitter", url: "https://twitter.com/kislay" }
                    ],
                    openTo: {
                        jobs: false,
                        freelance: false,
                        collaborations: true,
                        mentorship: true
                    },
                    isPremium: true,
                    stats: {
                        products: 4,
                        updates: 87,
                        followers: 512,
                        following: 134
                    },
                    joinedAt: "2024-06-01T00:00:00.000Z"
                }}
            />
        </section>
    );
}
