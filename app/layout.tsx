import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Research 2026 CQU | AI & Construction SMEs",
  description:
    "An annotated reading library on the readiness of regional Queensland construction SMEs to adopt AI-enabled project management tools for delay mitigation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
