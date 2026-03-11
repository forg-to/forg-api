import { Breadcrumb } from "../ui/Breadcrumb";
import { Callout } from "../ui/Callout";

export function RateLimitsSection() {
    return (
        <section id="rate-limits" className="scroll-mt-32">
            <div className="mb-12 mt-16 h-[1px] w-full bg-border" />
            <Breadcrumb items={["Getting Started", "Rate Limits"]} />
            <h1 className="mb-4 text-2xl font-serif font-semibold tracking-tight text-foreground">
                Rate Limits
            </h1>
            <p className="mb-6 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                To ensure stability and fair use of the API, we enforce rate limits on
                all endpoints based on your API key.
            </p>

            <div className="my-8 overflow-hidden font-sans text-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="border-b border-border bg-sidebar text-foreground">
                        <tr>
                            <th className="px-4 py-3 font-semibold">Tier</th>
                            <th className="px-4 py-3 font-semibold">Requests per minute</th>
                            <th className="px-4 py-3 font-semibold">Requests per day</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                        <tr>
                            <td className="px-4 py-4 font-medium text-foreground">Free</td>
                            <td className="px-4 py-4 text-foreground/80">60</td>
                            <td className="px-4 py-4 text-foreground/80">5,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 className="mb-4 mt-12 text-lg font-serif font-semibold tracking-tight text-foreground">
                Rate Limit Headers
            </h2>
            <p className="mb-4 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                Every API response includes the following headers to help you track your usage:
            </p>

            <ul className="mb-8 list-inside list-disc space-y-2 font-mono text-sm text-foreground/80">
                <li><strong className="text-foreground font-semibold">X-RateLimit-Limit:</strong> The max requests allowed in the current window.</li>
                <li><strong className="text-foreground font-semibold">X-RateLimit-Remaining:</strong> The number of requests remaining.</li>
                <li><strong className="text-foreground font-semibold">X-RateLimit-Reset:</strong> A unix timestamp when the limit resets.</li>
            </ul>

            <Callout type="info">
                If you exceed the rate limit, the API will return a <code className="font-semibold bg-blue-100 px-1 rounded">429 Too Many Requests</code> response. You must wait until the time specified in the <code className="font-semibold bg-blue-100 px-1 rounded">X-RateLimit-Reset</code> header.
            </Callout>
        </section>
    );
}
