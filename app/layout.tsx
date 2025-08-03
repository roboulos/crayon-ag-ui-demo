import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crayon AG UI Demo",
  description: "Generative UI with Crayon Framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}