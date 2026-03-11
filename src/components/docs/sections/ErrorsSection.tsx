import { Breadcrumb } from "../ui/Breadcrumb";
import { SchemaBlock } from "../ui/SchemaBlock";

export function ErrorsSection() {
    return (
        <section id="errors" className="scroll-mt-32">
            <div className="mb-12 mt-16 h-[1px] w-full bg-border" />
            <Breadcrumb items={["Getting Started", "Errors"]} />
            <h1 className="mb-4 text-2xl font-serif font-semibold tracking-tight text-foreground">
                Errors
            </h1>
            <p className="mb-6 leading-relaxed text-foreground/80 text-[15px] max-w-3xl">
                The forg.to API uses conventional HTTP response codes to indicate the
                success or failure of an API request. Codes in the <code className="font-semibold bg-blue-100 px-1 rounded text-foreground">2xx</code> range
                indicate success, <code className="font-semibold bg-orange-100 px-1 rounded text-foreground">4xx</code> indicate client errors, and <code className="font-semibold bg-red-100 px-1 rounded text-foreground">5xx</code> indicate
                server errors.
            </p>

            <div className="mb-2 text-sm font-medium text-foreground">Standard Error Response</div>
            <SchemaBlock
                schema={{
                    error: {
                        code: "not_found",
                        message: "Product not found",
                    },
                }}
            />

            <h2 className="mb-4 mt-12 text-lg font-serif font-semibold tracking-tight text-foreground">
                Error Codes
            </h2>

            <div className="my-8 overflow-hidden font-sans text-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="border-b border-border bg-sidebar text-foreground">
                        <tr>
                            <th className="px-4 py-3 font-semibold">HTTP</th>
                            <th className="px-4 py-3 font-semibold">Code</th>
                            <th className="px-4 py-3 font-semibold">Meaning</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60 text-foreground/80">
                        {[
                            { http: 400, code: "bad_request", text: "Invalid query params" },
                            { http: 401, code: "unauthorized", text: "Missing or invalid API key" },
                            { http: 403, code: "forbidden", text: "Key revoked or account banned" },
                            { http: 404, code: "not_found", text: "Resource does not exist" },
                            { http: 429, code: "rate_limited", text: "Too many requests" },
                            { http: 500, code: "server_error", text: "Something went wrong on our end" },
                        ].map((err) => (
                            <tr key={err.code}>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${err.http >= 500 ? "bg-red-100 text-red-700" :
                                        err.http >= 400 ? "bg-orange-100 text-orange-700" : ""
                                        }`}>
                                        {err.http}
                                    </span>
                                </td>
                                <td className="px-4 py-4 font-mono text-[13px] text-foreground font-medium">{err.code}</td>
                                <td className="px-4 py-4 leading-relaxed">{err.text}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
