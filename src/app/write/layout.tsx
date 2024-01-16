import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'New Post | BrightWord',
    description: 'write for BrightWord',
  }
  

export default function WriteLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {children}
      </section>
    )
  }