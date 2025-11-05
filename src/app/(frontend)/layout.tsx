import React from 'react'
import './globals.css'
import localFont from 'next/font/local'
import { UserProfile } from '@/components/UserProfile'
import { getUser } from './(auth)/actions/getUser'
import { UserProvider } from '@/contexts/UserContext'
import Link from 'next/link'
import Image from 'next/image'
import SecureIcon from '@/components/SecureIcon'
import MiddleFixedMenu from '@/components/MiddleFixedMenu'
import FooterMenuFixed from '@/components/FooterMenuFixed'
import Footer from '@/components/Footer'
import LastShahidItem from '@/components/LastShahidItem'
import WeeklyHadith from '@/components/WeeklyHadith'
import OccasionBanner from '@/components/OccasionBanner'

const dana = localFont({
  src: [
    {
      path: '../../fonts/woff2/Dana-Light.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../fonts/woff2/Dana-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/woff2/Dana-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../fonts/woff2/Dana-DemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../fonts/woff2/Dana-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../fonts/woff2/Dana-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../fonts/woff2/Dana-fat.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-dana',
  display: 'swap',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const user = await getUser()

  return (
    <html lang="fa" dir="rtl" className={dana.variable}>
      <body className={dana.className}>
        <UserProvider initialUser={user}>
          <div className="mx-auto max-w-screen-xl pt-10">
            <div className="w-52 border-l border-slate-200 h-[51rem] fixed">
              <div className="flex flex-col justify-between h-full">
                <Link href={'/'}>
                  <div className="flex items-end gap-2">
                    <img
                      src="/logo.svg"
                      alt="اداره حراست شرکت پالایش نفت آبادان"
                      className="!w-12 !h-auto"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-black text-[16px] text-brand">اداره حراست</h1>
                      <h2 className="font-light text-[10px] text-slate-400">
                        شرکت پالایش نفت آبادان
                      </h2>
                    </div>
                  </div>
                </Link>
                <div>
                  <MiddleFixedMenu />
                </div>
                <FooterMenuFixed />
              </div>
            </div>
            <div className="flex mr-[235px] gap-4">
              <div className="w-4/5">
                <WeeklyHadith />
                <div className="">
                  {children}
                  <OccasionBanner />
                </div>
              </div>
              <div className="w-1/5">
                <LastShahidItem />
                <Link href={'/documents'}>
                  <Image
                    src="/doc.svg"
                    alt="سند"
                    width={200}
                    height={200}
                    className="mt-10 w-full h-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-screen-xl pt-10">
            <div className="w-96 fixed"></div>
            <div className="mr-[235px]">
              <Footer />
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
