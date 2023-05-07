import PageSchema from '@/components/PageSchema'
import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: "300", subsets: ["latin"]})

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
        <PageSchema>
          {children}
        </PageSchema>
      </body>
    </html>
  )
}
