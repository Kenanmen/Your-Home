import type { Metadata } from 'next'
import { League_Spartan } from 'next/font/google'
import './globals.css'

const leagueSpartan = League_Spartan({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YourHome - Property Listings',
  description: 'Discover your dream home hassle-free on our real estate platform',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className={leagueSpartan.className}>{children}</body>
    </html>
  )
}
