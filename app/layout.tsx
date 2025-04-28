import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Beyond Driven Communication Assessment",
  description: "Discover your communication strengths and growth areas with the Beyond Driven assessment tool",
  keywords: [
    "communication assessment",
    "relationship skills",
    "Beyond Driven",
    "emotional intelligence",
    "conflict navigation",
  ],
  authors: [{ name: "Beyond Driven" }],
  creator: "Beyond Driven",
  publisher: "Beyond Driven",
  openGraph: {
    title: "Beyond Driven Communication Assessment",
    description: "Discover your communication strengths and growth areas with the Beyond Driven assessment tool",
    url: "https://beyonddriven.com/assessment",
    siteName: "Beyond Driven",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beyond Driven Communication Assessment",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond Driven Communication Assessment",
    description: "Discover your communication strengths and growth areas with the Beyond Driven assessment tool",
    images: ["/og-image.png"],
    creator: "@BeyondDriven",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
