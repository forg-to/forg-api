import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "forg.to API",
  description: "The forg.to public API — fetch builders, products, and updates.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
