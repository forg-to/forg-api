import { codeExamples } from "@/lib/docs/codeExamples";
import { codeToHtml } from "shiki";
import { RightPanelClient } from "./RightPanelClient";

export async function RightPanel() {
    const htmlMap: Record<string, Record<string, string>> = {};

    for (const [section, examples] of Object.entries(codeExamples)) {
        htmlMap[section] = {};
        for (const [lang, code] of Object.entries(examples)) {
            const shikiLang = lang === 'curl' ? 'shell' : lang;

            const html = await codeToHtml(code, {
                lang: shikiLang as any,
                theme: 'min-light', // switched to min-light for clean white look
            });
            htmlMap[section][lang] = html;
        }
    }

    return <RightPanelClient htmlMap={htmlMap} />;
}
