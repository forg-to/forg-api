"use client";

import { useEffect, useRef } from "react";
import { useDocs } from "./DocsContext";

export function SectionObserver({ children }: { children: React.ReactNode }) {
    const { setActiveSection } = useDocs();
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                const intersecting = entries.filter((e) => e.isIntersecting);
                if (intersecting.length > 0) {
                    setActiveSection(intersecting[0].target.id);
                }
            },
            { rootMargin: "-20% 0px -60% 0px" }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((s) => observerRef.current?.observe(s));

        return () => observerRef.current?.disconnect();
    }, [setActiveSection]);

    return <div className="space-y-24">{children}</div>;
}
