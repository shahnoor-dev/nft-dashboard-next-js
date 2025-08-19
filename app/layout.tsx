import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "@/app/client-layout"

export const metadata: Metadata = {
  title: "NFT Dashboard",
  description: "Create and sell extraordinary NFTs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="antialiased bg-gray-50">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
