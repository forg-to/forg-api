"use client";

import { useState, useRef, useEffect } from "react";
import { X, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type TryItModalProps = {
    isOpen: boolean;
    onClose: () => void;
    method: "GET" | "POST";
    endpoint: string;
    queryParams?: { name: string; required?: boolean; default?: string }[];
};

export function TryItModal({
    isOpen,
    onClose,
    method,
    endpoint,
    queryParams = [],
}: TryItModalProps) {
    const [apiKey, setApiKey] = useState("");
    const [params, setParams] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!apiKey) {
            alert("Please provide an API key");
            return;
        }

        setLoading(true);
        setResponse(null);

        try {
            const url = new URL(`https://api.forg.to/v1${endpoint}`);
            Object.entries(params).forEach(([key, value]) => {
                if (value) url.searchParams.append(key, value);
            });

            const res = await fetch(url.toString(), {
                method,
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            setResponse({
                status: res.status,
                data,
            });
        } catch (err: any) {
            setResponse({ error: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-sans">
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-white shadow-2xl flex flex-col"
            >
                <div className="flex items-center justify-between border-b border-border px-6 py-4 sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-semibold text-foreground">Test Endpoint</h3>
                    <button
                        onClick={onClose}
                        className="rounded-md p-1.5 text-foreground/50 hover:bg-black/5 hover:text-foreground transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6 flex items-center gap-3 rounded-lg bg-sidebar p-3 border border-border">
                        <span className="rounded bg-accent/10 px-2 py-1 text-xs font-bold text-accent">
                            {method}
                        </span>
                        <code className="text-sm text-foreground/80 font-mono">
                            /v1{endpoint}
                        </code>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium text-foreground">Authentication</h4>
                            <div>
                                <label className="mb-1.5 block text-xs text-foreground/70">
                                    Bearer Token <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="forg_..."
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                                />
                            </div>
                        </div>

                        {queryParams.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium text-foreground">Query Parameters</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {queryParams.map((p) => (
                                        <div key={p.name}>
                                            <label className="mb-1.5 block text-xs text-foreground/70">
                                                {p.name} {p.required && <span className="text-red-400">*</span>}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={p.default || ""}
                                                value={params[p.name] || ""}
                                                onChange={(e) =>
                                                    setParams((prev) => ({
                                                        ...prev,
                                                        [p.name]: e.target.value,
                                                    }))
                                                }
                                                className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !apiKey}
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                            ) : (
                                <>
                                    <Play size={16} />
                                    Send Request
                                </>
                            )}
                        </button>
                    </form>

                    {response && (
                        <div className="mt-8">
                            <div className="mb-3 flex items-center justify-between">
                                <h4 className="text-sm font-medium text-foreground">Response</h4>
                                {response.status && (
                                    <span
                                        className={cn(
                                            "rounded px-2 py-0.5 text-xs font-semibold",
                                            response.status >= 200 && response.status < 300
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        )}
                                    >
                                        {response.status}
                                    </span>
                                )}
                            </div>
                            <div className="rounded-lg border border-border bg-code-bg p-4 overflow-x-auto">
                                <pre className="text-xs text-foreground/90 font-mono leading-relaxed">
                                    <code>{JSON.stringify(response.data || response.error, null, 2)}</code>
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
