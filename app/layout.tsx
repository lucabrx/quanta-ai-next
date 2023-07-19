import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quanta AI',
  description:
    'Next-Gen AI-tool for Quanta - the groundbreaking solution for every kind of AI assist. Unlock the full potential of Quanta.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrat.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
