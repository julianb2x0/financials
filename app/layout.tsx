import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Bebas_Neue } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Attachment Insight Assessment",
  description: "Discover your attachment patterns across different relationship contexts",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'