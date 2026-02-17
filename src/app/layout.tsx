import type { Metadata } from 'next';
import { DM_Sans, Crimson_Pro } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { NavBar } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wezzcoetzee.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Wesley Coetzee | Tech Lead & Software Engineer',
    template: '%s | Wesley Coetzee',
  },
  description:
    'Tech Lead and Principal Software Engineer based in Auckland, NZ. Building scalable solutions and leading engineering teams to deliver exceptional products.',
  authors: [{ name: 'Wesley Coetzee' }],
  creator: 'Wesley Coetzee',
  publisher: 'Wesley Coetzee',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    url: 'https://wezzcoetzee.com',
    siteName: 'Wesley Coetzee',
    title: 'Wesley Coetzee | Tech Lead & Software Engineer',
    description:
      'Tech Lead and Principal Software Engineer based in Auckland, NZ. Building scalable solutions and leading engineering teams.',
    images: [
      {
        url: 'https://avatars.githubusercontent.com/u/15249642?v=4',
        width: 460,
        height: 460,
        alt: 'Wesley Coetzee',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@wezzcoetzee',
    creator: '@wezzcoetzee',
    title: 'Wesley Coetzee | Tech Lead & Software Engineer',
    description:
      'Tech Lead and Software Engineer based in Auckland, NZ. Building scalable solutions and leading engineering teams.',
    images: ['https://avatars.githubusercontent.com/u/15249642?v=4'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'}if(t==='light'){document.documentElement.setAttribute('data-theme','light')}document.documentElement.classList.add('no-transitions');requestAnimationFrame(function(){requestAnimationFrame(function(){document.documentElement.classList.remove('no-transitions')})})}catch(e){}})();`,
          }}
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#0a0a0a" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#faf8f5" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a" />
      </head>
      <body className={`${dmSans.variable} ${crimsonPro.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to content
        </a>
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
        <div className="min-h-screen bg-background text-foreground">
          <NavBar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
