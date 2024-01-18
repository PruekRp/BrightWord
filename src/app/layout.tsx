import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '../components/NavBar'
import AuthProvider from '@/providers/AuthProvider'

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
        <AuthProvider>
        <div className='p-4 m-auto max-w-7xl bg-white'>{/*if want border max width max-w-7xl use this*/}
        <NavBar/>
        {children}
        </div>
        </AuthProvider>
        </body>
    </html>
  )
}
