import { Raleway } from 'next/font/google'
import './globals.css'

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Portfolio',
  description: 'Manage rent and bills easily',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${raleway.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-raleway">{children}</body>
    </html>
  )
}
