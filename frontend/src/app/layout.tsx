import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Example Store",
  description: "Your favourite shoe store!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-full h-screen`}>{children}</body>
    </html>
  );
}
