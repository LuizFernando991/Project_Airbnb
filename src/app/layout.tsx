import './globals.css'
import { Nunito } from 'next/font/google'

import Navbar from '@/components/navbar/Navbar'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'
import ToasterProvider from '@/providers/ToasterProvider'
import getCurrentUser from '@/app/actions/getCurrentUser'

const font = Nunito({
  subsets: ['latin']
})

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
          {children}
      </body>
    </html>
  )
}
