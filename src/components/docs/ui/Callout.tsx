import { AlertCircle, Info } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Callout({
    children,
    type = "info"
}: {
    children: ReactNode;
    type?: "info" | "warning" | "danger";
}) {
    return (
        <div className={cn(
            "flex gap-3 rounded-lg p-4 my-6 text-sm leading-relaxed border",
            type === "info" && "bg-blue-50/50 border-blue-100 text-blue-900",
            type === "warning" && "bg-orange-50/50 border-orange-100 text-orange-900",
            type === "danger" && "bg-red-50/50 border-red-100 text-red-900",
        )}>
            <div className="shrink-0 mt-0.5">
                {type === "info" ? (
                    <Info size={16} className="text-blue-600" />
                ) : type === "warning" ? (
                    <AlertCircle size={16} className="text-orange-600" />
                ) : (
                    <AlertCircle size={16} className="text-red-600" />
                )}
            </div>
            <div>{children}</div>
        </div>
    );
}
