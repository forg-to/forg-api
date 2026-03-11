export function ParamsTable({
    title,
    parameters,
}: {
    title?: string;
    parameters: {
        name: string;
        type: string;
        required?: boolean;
        default?: string;
        description: string;
    }[];
}) {
    return (
        <div className="my-8">
            {title && <h3 className="text-lg font-serif font-semibold mb-4 text-foreground">{title}</h3>}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-border/60">
                            <th className="py-3 px-4 font-semibold text-foreground bg-sidebar">Parameter</th>
                            <th className="py-3 px-4 font-semibold text-foreground bg-sidebar">Type</th>
                            <th className="py-3 px-4 font-semibold text-foreground bg-sidebar">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60 text-foreground/80">
                        {parameters.map((p) => (
                            <tr key={p.name} className="hover:bg-sidebar/50 transition-colors">
                                <td className="py-4 px-4 align-top">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-mono text-[13px] font-medium text-foreground">{p.name}</span>
                                        {p.required && (
                                            <span className="text-[10px] font-bold tracking-wider text-red-600 uppercase">Required</span>
                                        )}
                                        {p.default && (
                                            <span className="text-[11px] font-mono text-foreground/50 mt-1">default: {p.default}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-4 align-top">
                                    <span className="text-[13px] font-mono text-foreground/60">{p.type}</span>
                                </td>
                                <td className="py-4 px-4 align-top leading-relaxed">
                                    {p.description}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
