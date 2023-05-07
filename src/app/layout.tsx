import React from "react"
import PageSchema from '@/components/PageSchema'
import './globals.css'
import { Roboto_Mono } from 'next/font/google'

const roboto = Roboto_Mono({ weight: "300", subsets: ["latin"]})

export const metadata = {
  title: 'Week 6 Class 3'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <React.StrictMode>
          <PageSchema>
            {children}
          </PageSchema>
        </React.StrictMode>
      </body>
    </html>
  )
}
