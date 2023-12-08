import "./globals.css"

import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { auth, ClerkProvider } from "@clerk/nextjs"

import Footer from "@/components/footer"
import { TailwindIndicator } from "@/components/helpers/tailwind-indicator"
import { ThemeProvider } from "@/components/helpers/theme-provider"
import { Navbar } from "@/components/navbar"
import {ReactNode} from "react";

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quanta AI",
  description:
    "Next-Gen AI-tool for Quanta - the groundbreaking solution for every kind of AI assist. Unlock the full potential of Quanta.",
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const { userId } = auth()
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={montserrat.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar userId={userId} />
            {children}
            <Footer />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
