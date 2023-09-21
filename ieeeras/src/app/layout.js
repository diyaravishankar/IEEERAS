import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IEEE RAS VIT Chennai',
  description: 'Built with effort',
}

//below code is to be changed such that it imports navbar and the basic css here
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
