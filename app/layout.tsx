import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "SignalDeck | GitHub analytics cockpit",
  description: "Dashboard de analytics com charts animadas, GitHub API externa e fallback mock.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${body.variable} ${display.variable} antialiased`}>
        <div className="workspace-grid" aria-hidden />
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
