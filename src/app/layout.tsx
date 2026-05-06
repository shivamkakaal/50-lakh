import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "₹50,00,000 Loan. 1 Son. 1 Mission. | Mission 50 Lakh",
  description:
    "Join the journey to help a son repay his family's ₹50 lakh loan. Every rupee counts. 100% transparent. Real story, real impact.",
  keywords: ["donation", "crowdfunding", "loan", "help", "mission", "support", "India"],
  openGraph: {
    title: "₹50,00,000 Loan. 1 Son. 1 Mission.",
    description: "Join the journey to help a son repay his family's ₹50 lakh loan.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0B1D2A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
