import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Loopnote | Your Thoughts, in Flow",
  description: "A premium note-taking experience designed for clarity, recurring ideas, and deep focus.",
  keywords: ["notes", "productivity", "focus", "loopnote", "zen", "writing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <div className="bg-mesh" />
        {children}
      </body>
    </html>
  );
}
