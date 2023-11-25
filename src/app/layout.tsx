import type { Metadata } from "next";
import { Inter } from "next/font/google";

//
import Providers from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatting App",
  description: "Dummy chatting app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-blue-100 min-h-screen flex items-center justify-center">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
