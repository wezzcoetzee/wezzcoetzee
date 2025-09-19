import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wesley Coetzee | Software Engineer',
  description: 'Software wizard based in The Netherlands',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#ffffeb" />

      <meta name="theme-color" content="#ffffeb" />
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
        <ThemeProvider defaultTheme="system">
          {/* Theme toggle button - fixed position */}
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          
          <div className="gradient-bg overflow-auto tracking-tighter">
            <div className="overflow-auto">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
