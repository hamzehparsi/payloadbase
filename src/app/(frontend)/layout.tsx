import React from 'react'
import './globals.css'
import localFont from 'next/font/local'
import { UserProfile } from '@/components/UserProfile'
import { getUser } from './(auth)/actions/getUser'
import { UserProvider } from '@/contexts/UserContext'

const yekanBakh = localFont({
  src: [
    {
      path: '../../fonts/woff2/YekanBakh-Regular.woff2',
      weight: '400',
      style: 'normal',
    },

    {
      path: '../../fonts/woff2/YekanBakh-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../fonts/woff2/YekanBakh-ExtraBlack.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-yekan',
  display: 'swap',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const user = await getUser()
  return (
    <html lang="fa" dir="rtl" className={yekanBakh.variable}>
      <body>
        <UserProvider initialUser={user}>
          <UserProfile />
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
