import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VidFlow - Video Scroll Feed",
  description:
    "A TikTok-style vertical video scroll feed built with Next.js and TypeScript. Scroll through short-form videos with smooth snap scrolling and auto-play.",
  keywords: ["video", "scroll feed", "tiktok", "nextjs", "short video"],
  authors: [{ name: "VidFlow Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
