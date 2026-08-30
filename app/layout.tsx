import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sinister-editing-portfolio.websites4u.chatgpt.site'),
  title: 'Sinister — Video Editor & Visual Storyteller',
  description: 'Aggressive pacing, precise storytelling, and high-impact edits by Sinister.',
  applicationName: 'Sinister Editing Portfolio',
  keywords: ['video editor', 'DaVinci Resolve', 'sports edits', 'visual storytelling'],
  openGraph: {
    title: 'Sinister — I Cut for Impact.',
    description: 'Aggressive pacing. Precise storytelling. Edits engineered to make people stop, feel, and remember.',
    type: 'website',
    siteName: 'Sinister',
    url: 'https://sinister-editing-portfolio.websites4u.chatgpt.site',
    images: [
      {
        url: 'https://sinister-editing-portfolio.websites4u.chatgpt.site/og.png',
        width: 1732,
        height: 908,
        alt: 'Sinister — I Cut for Impact.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sinister — I Cut for Impact.',
    description: 'Aggressive pacing. Precise storytelling. High-impact edits.',
    images: ['https://sinister-editing-portfolio.websites4u.chatgpt.site/og.png'],
  },
  alternates: {
    canonical: 'https://sinister-editing-portfolio.websites4u.chatgpt.site',
  },
};

export const viewport: Viewport = {
  themeColor: '#070706',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
