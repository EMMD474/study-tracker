import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import "./globals.css";
import { Toaster } from "sonner";
import TopNav from "@/components/TopNav";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Median Stratum",
  description: "Your Ultimate Academic Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Providers>
            {/* <TopNav /> */}
            {children}
            <Toaster richColors position="top-center" closeButton />
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
