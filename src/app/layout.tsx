import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wesley Coetzee | Software Engineer",
  description: "Software wizard based in The Netherlands",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-M18S2XK0BZ"
        />
        <Script strategy="lazyOnload" id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-M18S2XK0BZ');
        `}
        </Script>
        <div className="bg-slate-200 h-screen overflow-hidden flex justify-center items-center w-full tracking-tighter">
          {children}
          <Header />
          <Footer />
        </div>
      </body>
    </html>
  );
}
