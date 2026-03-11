"use client";

import React from "react";

type DocsContextType = {
    activeSection: string;
    setActiveSection: (id: string) => void;
    activeLang: "curl" | "javascript" | "python";
    setActiveLang: (lang: "curl" | "javascript" | "python") => void;
};

const DocsContext = React.createContext<DocsContextType | undefined>(undefined);

export function DocsProvider({ children }: { children: React.ReactNode }) {
    const [activeSection, setActiveSection] = React.useState("introduction");
    const [activeLang, setActiveLang] = React.useState<"curl" | "javascript" | "python">("curl");

    return (
        <DocsContext.Provider value={{ activeSection, setActiveSection, activeLang, setActiveLang }}>
            {children}
        </DocsContext.Provider>
    );
}

export function useDocs() {
    const context = React.useContext(DocsContext);
    if (!context) {
        throw new Error("useDocs must be used within a DocsProvider");
    }
    return context;
}
