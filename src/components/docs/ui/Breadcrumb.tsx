import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: string[] }) {
    return (
        <div className="flex items-center gap-1.5 text-[13px] font-medium text-foreground/50 mb-6 font-sans tracking-wide">
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                    <span className={i === items.length - 1 ? "text-foreground" : ""}>
                        {item}
                    </span>
                    {i < items.length - 1 && <ChevronRight size={14} className="text-border" />}
                </div>
            ))}
        </div>
    );
}
