import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahayog | Decentralised Disaster Relief Governance",
  description:
    "Cryptographically enforced, community-governed disaster relief fund management on Polygon zkEVM. Real-time transparency for Eastern India relief operations.",
  keywords: "disaster relief, blockchain, governance, Assam, West Bengal, fund accountability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
