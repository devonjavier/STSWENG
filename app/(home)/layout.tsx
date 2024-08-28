import '../globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google' 
import Navigation from '../components/NavBar'
import Footer from '../components/Footer'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Indigo Studios',
  description: 'Site for Indigo Studios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${rubik.className}`}>
        <Navigation />
        <main className="flex-grow bg-white">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
};


