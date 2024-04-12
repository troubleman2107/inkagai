"use client ";

import "./globals.css";
import type { Metadata } from "next";
import { Provider } from "@/components/provider";

import localFont from "next/font/local";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Session,
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import Header from "@/components/header";

const spaceMono = localFont({
  src: [
    {
      path: "../public/fonts/space-mono/SpaceMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/space-mono/SpaceMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/space-mono/SpaceMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/space-mono/SpaceMono-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "Inkigai",
  generator: "Next.js",
  applicationName: "Inkigai",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Boilerplate",
    "Template",
    "shadcn-ui",
  ],
  authors: [{ name: "Virgil", url: "https://obedd.vercel.app" }],
  creator: "Virgil",
  publisher: "Virgil",
  alternates: {},
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kaminari.vercel.app"),
  openGraph: {
    title: "Inkigai",
    description: "Next.js, TailwindCSS and shadcn-ui Starter Template",
    url: "https://kaminari.vercel.app",
    siteName: "Inkigai",
    images: [
      {
        url: "https://kaminari.vercel.app/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://kaminari.vercel.app/og-dark.png",
        width: 1800,
        height: 1600,
        alt: "Next.js, TailwindCSS and shadcn-ui Starter Template",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={`${spaceMono.className}`}>
        <Provider attribute="class" defaultTheme="system" enableSystem>
          <main
            className={`flex h-screen flex-col justify-between bg-white p-9 text-zinc-700 dark:bg-black dark:text-zinc-400`}
          >
            <div className="flex w-full items-center justify-between">
              <Link
                href="/"
                className={`flex items-center text-2xl font-bold dark:text-white`}
              >
                Inkigai.{" "}
                <span
                  className={`group ml-2 inline-block rounded-3xl bg-[#fafafa] px-3 text-sm font-bold text-black`}
                >
                  <span className="">v3.2</span>
                </span>
              </Link>
              <div className="flex items-center justify-between gap-5">
                {session && <Header session={session} />}
                <ThemeToggle />
              </div>
            </div>
            {children}
            <div className="flex w-full items-center justify-between"></div>
          </main>
        </Provider>
      </body>
    </html>
  );
}
