import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '../components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BrightWord chatbox',
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
        <div className='className="p-4 max-w-7xl m-auto'>
      <NavBar/>
        {children}
        </div>
        </body>
    </html>
  )
}
