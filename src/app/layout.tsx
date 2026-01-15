import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar04 } from "@/components/ui/shadcn-io/navbar-04";
import { Toaster } from "@/components/ui/shadcn-ui/sonner";
import Footer from "@/components/ui/personal/layout/Footer";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sembako Bayi",
  description: "Sembako bayi adalah website resmi dari sembako bayi ponorogo. Website ini menyediakan berbagai informasi mengenai produk sembako bayi yang kami tawarkan.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user || null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar04 user={user} />
        {children}
        <Toaster richColors closeButton containerAriaLabel="SEMBAKO BAYI" />
        <Footer />
      </body>
    </html>
  );
}