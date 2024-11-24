import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vote application",
  description: "Created by Anton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="corporate" lang="en">
      <body>
        <div className="fixed top-5 left-5 z-10">
          <Link href="/">
            <button className="text-2xl text-blue-500 hover:text-blue-700">
              &larr;
            </button>
          </Link>
        </div>

        {children}
      </body>
    </html>
  );
}
