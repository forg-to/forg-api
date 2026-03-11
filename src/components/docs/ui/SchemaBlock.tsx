"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function SchemaBlock({ schema }: { schema: Record<string, unknown> }) {
    const [copied, setCopied] = useState(false);
    const jsonString = JSON.stringify(schema, null, 2);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(jsonString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-md border border-border bg-sidebar overflow-hidden my-4">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={handleCopy}
                    className="rounded p-1.5 bg-white border border-border text-foreground hover:bg-black/5 shadow-sm transition-all"
                >
                    {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                </button>
            </div>
            <pre className="p-4 text-[13px] leading-relaxed overflow-x-auto font-mono text-foreground/80">
                <code>{jsonString}</code>
            </pre>
        </div>
    );
}
