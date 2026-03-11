import { Metadata } from "next";
import { DocsProvider } from "@/components/docs/DocsContext";
import { Sidebar } from "@/components/docs/Sidebar";
import { RightPanel } from "@/components/docs/RightPanel";

export const metadata: Metadata = {
    title: "API Documentation | forg.to",
    description: "Build an audience while you build your product.",
};

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DocsProvider>
            <div className="flex min-h-screen w-full flex-col lg:flex-row bg-background text-foreground">
                {/* Left Sidebar */}
                <div className="hidden lg:block lg:w-[280px] shrink-0 border-r border-border bg-sidebar sticky top-0 h-screen overflow-y-auto">
                    <Sidebar />
                </div>

                {/* Center Main Content */}
                <main className="flex-1 min-w-0 px-6 py-12 lg:px-16 lg:py-16 pb-32 max-w-4xl w-full">
                    {children}
                </main>

                {/* Right Panel for Code Examples */}
                <div className="hidden xl:block xl:w-[480px] shrink-0 sticky top-0 h-screen overflow-y-auto px-6 py-8">
                    <RightPanel />
                </div>
            </div>
        </DocsProvider>
    );
}
