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
  title: 'Sinister/Edit — Independent Video Editor',
  description: 'Short-form, sports, and music-led video editing by Sinister.',
  applicationName: 'Sinister Editing Portfolio',
  keywords: ['video editor', 'DaVinci Resolve', 'sports edits', 'visual storytelling'],
  openGraph: {
    title: 'Sinister/Edit — Cut the Expected.',
    description: 'Raw footage in. A sharper feeling out. Short-form video editing by Sinister.',
    type: 'website',
    siteName: 'Sinister',
    url: 'https://sinister-editing-portfolio.websites4u.chatgpt.site',
    images: [
      {
        url: 'https://sinister-editing-portfolio.websites4u.chatgpt.site/og.png',
        width: 1731,
        height: 909,
        alt: 'Sinister/Edit — Cut the Expected.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sinister/Edit — Cut the Expected.',
    description: 'Short-form, sports, and music-led video editing by Sinister.',
    images: ['https://sinister-editing-portfolio.websites4u.chatgpt.site/og.png'],
  },
  alternates: {
    canonical: 'https://sinister-editing-portfolio.websites4u.chatgpt.site',
  },
};

export const viewport: Viewport = {
  themeColor: '#f2efe6',
  colorScheme: 'light',
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
