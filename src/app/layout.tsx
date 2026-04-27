import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  metadataBase: new URL("https://api.forg.to"),
  title: {
    default: "forg.to API Documentation",
    template: "%s | forg.to API",
  },
  description: "Official public API for forg.to. Fetch builders, products, and updates to build tools on top of the build-in-public ecosystem.",
  keywords: ["forg api", "forg.to documentation", "build in public api", "developer portal", "indie hacker tools"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://api.forg.to",
    siteName: "forg.to API",
    title: "forg.to API Documentation",
    description: "Official public API for forg.to — fetch builders, products, and updates.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "forg.to API",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@forg_to",
    creator: "@whykislay",
    title: "forg.to API Documentation",
    description: "Official public API for forg.to — fetch builders, products, and updates.",
    images: ["/logo.png"],
  },
};

const bricolage = localFont({
  src: "../../public/fonts/Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf",
  variable: "--font-bricolage",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body>{children}</body>
    </html>
  );
}
