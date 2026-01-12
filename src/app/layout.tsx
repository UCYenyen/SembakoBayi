import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider"
import { Navbar04 } from "@/components/ui/shadcn-io/navbar-04";
import { Toaster } from "sonner";
import { createClient } from "@/utils/supabase/server";
import Footer from "@/components/ui/personal/layout/Footer";
import AuthSessionProvider from "@/components/ui/personal/layout/AuthSessionProvider";

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthSessionProvider initialUser={user}>
            
            <Navbar04 user={user} />
            {children}
            <Toaster />
            <Footer />
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
