"use client";

import { useState } from "react";
import { TryItModal } from "./TryItModal";

export function TryItButton({
    method,
    endpoint,
    queryParams
}: {
    method: "GET" | "POST";
    endpoint: string;
    queryParams?: { name: string; required?: boolean; default?: string }[];
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1.5 rounded-md border border-border bg-white px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm transition-colors hover:bg-black/5 hover:border-black/20"
            >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Try it
            </button>

            <TryItModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                method={method}
                endpoint={endpoint}
                queryParams={queryParams}
            />
        </>
    );
}
