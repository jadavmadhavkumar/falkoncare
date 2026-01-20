import type React from "react"
import type { Metadata } from "next"
import { Roboto, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ConvexClientProvider } from "@/components/providers/convex-provider"
import { Toaster } from "sonner"
import "./globals.css"

// Roboto for body text
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: 'swap',
})

// Poppins for headings
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Falkon - Water Tank Cleaning Services",
  description: "Professional water tank cleaning and maintenance services",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConvexClientProvider>
      <html lang="en">
        <body className={`${roboto.variable} ${poppins.variable} font-sans`}>
          {children}
          <Toaster />
          <Analytics />
        </body>
      </html>
    </ConvexClientProvider>
  )
}
