"use client";

import Link from "next/link";
import Image from "next/image";
import { useDocs } from "./DocsContext";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navGroups = [
    {
        title: "Getting Started",
        items: [
            { id: "introduction", label: "Introduction" },
            { id: "authentication", label: "Authentication" },
            { id: "rate-limits", label: "Rate Limits" },
            { id: "errors", label: "Errors" },
        ],
    },
    {
        title: "Endpoints",
        items: [
            { id: "products", label: "Products" },
            { id: "users", label: "Users" },
        ],
    },
    {
        title: "Reference",
        items: [
            { id: "changelog", label: "Changelog" },
        ],
    },
];

export function Sidebar() {
    const { activeSection } = useDocs();
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        setIsOpen(false);
    };

    const SidebarContent = () => (
        <div className="flex h-full flex-col font-sans">
            <div className="p-5 pb-3 border-b border-border">
                <Link href="https://forg.to" target="_blank" className="flex items-center gap-2.5 group">
                    <Image
                        src="/logo.png"
                        alt="forg"
                        width={32}
                        height={32}
                        className="rounded-lg object-contain group-hover:scale-105 transition-transform"
                    />
                    <div className="flex items-center gap-1.5">
                        <span className="font-bricolage font-bold text-xl tracking-tight text-foreground leading-none">
                            Forg
                        </span>
                        <span className="rounded bg-accent/15 border border-accent/25 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-accent leading-none">
                            API
                        </span>
                    </div>
                </Link>
            </div>

            <div className="px-5 py-4">
                <div className="relative group/search">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/40">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search.."
                        className="w-full bg-white border border-border rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent shadow-sm transition-shadow"
                    />
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 pb-8 space-y-6 mt-2">
                {navGroups.map((group) => (
                    <div key={group.title}>
                        <h4 className="mb-2 px-3 text-xs font-bold text-foreground/90">
                            {group.title}
                        </h4>
                        <div className="space-y-0.5">
                            {group.items.map((item) => {
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={cn(
                                            "block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors",
                                            isActive
                                                ? "bg-accent/10 text-accent font-medium shadow-sm"
                                                : "text-foreground/70 hover:bg-black/5 hover:text-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 mt-auto">
                <Link
                    href="https://forg.to/settings/api"
                    target="_blank"
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/90 shadow-sm"
                >
                    Get API key
                </Link>
            </div>
        </div>
    );

    return (
        <>
            <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between border-b border-border bg-sidebar px-4 py-3">
                <Link href="https://forg.to" target="_blank" className="flex items-center gap-2.5">
                    <Image src="/logo.png" alt="forg" width={28} height={28} className="rounded-md object-contain" />
                    <div className="flex items-center gap-1.5">
                        <span className="font-bricolage font-bold text-lg tracking-tight text-foreground leading-none">Forg</span>
                        <span className="rounded bg-accent/15 border border-accent/25 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-accent leading-none">API</span>
                    </div>
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-foreground/70 hover:text-foreground"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed inset-y-0 left-0 w-[280px] bg-sidebar shadow-xl border-r border-border">
                        <SidebarContent />
                    </div>
                </div>
            )}

            <div className="hidden lg:block h-full">
                <SidebarContent />
            </div>
        </>
    );
}
