"use client";

import { useDocs } from "./DocsContext";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const languages = [
    { id: "python", label: "Python" },
    { id: "javascript", label: "TypeScript" },
    { id: "curl", label: "cURL" },
] as const;

export function RightPanelClient({ htmlMap }: { htmlMap: Record<string, Record<string, string>> }) {
    const { activeSection, activeLang, setActiveLang } = useDocs();
    const [copied, setCopied] = useState(false);

    const safelyGetHtml = () => {
        try {
            return htmlMap[activeSection]?.[activeLang] || "";
        } catch {
            return "";
        }
    };

    const currentHtml = safelyGetHtml();

    const handleCopy = async () => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = currentHtml;
        const text = tempDiv.textContent || tempDiv.innerText || "";
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!currentHtml) return null;

    return (
        <div className="flex flex-col rounded-xl border border-border bg-white shadow-sm overflow-hidden sticky top-12">
            <div className="flex items-center gap-1 border-b border-border bg-white px-2 py-1.5 overflow-x-auto">
                {languages.map((lang) => (
                    <button
                        key={lang.id}
                        onClick={() => setActiveLang(lang.id)}
                        className={cn(
                            "rounded-md px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap",
                            activeLang === lang.id
                                ? "bg-code-bg text-foreground shadow-sm ring-1 ring-border"
                                : "text-foreground/50 hover:bg-black/5 hover:text-foreground"
                        )}
                    >
                        {lang.label}
                    </button>
                ))}

                <div className="flex-1" />
                <button
                    onClick={handleCopy}
                    className="rounded-md p-1.5 text-foreground/40 hover:bg-black/5 hover:text-foreground transition-colors shrink-0"
                    title="Copy code"
                >
                    {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                </button>
            </div>

            <div className="relative flex-1 p-5 bg-white">
                <div className="overflow-x-auto text-[13px] leading-relaxed relative font-mono [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0">
                    <div dangerouslySetInnerHTML={{ __html: currentHtml }} />
                </div>
            </div>
        </div>
    );
}
