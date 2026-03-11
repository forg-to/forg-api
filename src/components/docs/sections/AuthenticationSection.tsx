import { Breadcrumb } from "../ui/Breadcrumb";
import { Callout } from "../ui/Callout";

export function AuthenticationSection() {
    return (
        <section id="authentication" className="scroll-mt-32">
            <div className="mb-12 mt-16 h-[1px] w-full bg-border" />
            <Breadcrumb items={["Getting Started", "Authentication"]} />
            <h1 className="mb-4 text-2xl font-serif font-semibold tracking-tight text-foreground">
                Authentication
            </h1>
            <p className="mb-4 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                All API requests require authentication using a Bearer token in the
                Authorization header. You can get your key at{" "}
                <a
                    href="https://forg.to/settings/api"
                    target="_blank"
                    className="text-accent font-medium hover:underline focus:outline-none"
                >
                    forg.to/settings/api
                </a>.
            </p>

            <ul className="mb-8 list-disc pl-5 space-y-2 text-foreground/80 text-[15px]">
                <li>All requests require header: <code className="rounded border border-border bg-code-bg px-1.5 py-0.5 text-sm font-mono text-foreground font-medium">Authorization: Bearer YOUR_API_KEY</code></li>
                <li>Keys are prefixed with <code className="rounded border border-border bg-code-bg px-1.5 py-0.5 text-sm font-mono text-accent font-medium">forg_</code> for easy identification.</li>
            </ul>

            <Callout type="warning">
                <strong className="font-medium text-foreground">Keep your API key safe:</strong> Your API key is tied to your forg.to account and carries your privileges.
                Do not expose it in client-side code, public GitHub repositories, or any
                untrusted environment.
            </Callout>
        </section>
    );
}
