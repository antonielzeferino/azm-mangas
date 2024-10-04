import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import { heroData } from "@/data/heroData";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AZM MANGAS",
  description: "Explore our application built with the MangaDex API, offering a seamless experience for browsing and discovering manga. Stay updated with the latest releases, view detailed chapters, and immerse yourself in the world of manga. Fast, user-friendly, and powered by modern web technologies",
  authors: { name: "Antoniel Zeferino", url: 'https://github.com/antonielzeferino' }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {heroData.map((image) => (
          <link key={image.src} rel="preload" href={image.src} as="image" />
        ))}
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-screen overflow-x-hidden min-h-screen flex flex-col`}
      >
        {children}
        <footer className="w-full h-10 bg-gray-800 p-2 flex items-center justify-center">
          <h3 className="text-white">
            Application built using the
            <a href="https://mangadex.org" className="text-blue-400 ps-2" target="_blank" rel="noopener noreferrer">
              MangaDex API
            </a>
          </h3>
        </footer>
      </body>
    </html>
  );
}
