import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"


import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import Header from "@/components/Home/header"
import SyncUser from "@/actions/checkUser"

import { UserProvider } from "@/context/UserContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SafeHer - Women Safety App",
  description: "Empowering women with safety tools and resources",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (

    <ClerkProvider 
    appearance={{
      baseTheme: dark,
    }}>
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${inter.className} h-full w-full`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem 
          disableTransitionOnChange
        >
        
        <UserProvider>
        <Header/>
     

        <main className="min-h-screen">
        {children}
        </main>

        <footer className="bg-muted/50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-200">Developed by CodeCrafters</div>
        </footer>
        </UserProvider>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}

