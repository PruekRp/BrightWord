import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '../components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BrightWord',
  description: 'Aichatbot for BrightWord',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='p-4 m-auto max-w-7xl '>{/*if want border max width max-w-7xl use this*/}
      <NavBar/>
        {children}
        </div>
        </body>
    </html>
  )
}
