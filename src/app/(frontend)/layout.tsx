import React from 'react'
import './globals.css'
import localFont from 'next/font/local'
import { UserProfile } from '@/components/UserProfile'
import { getUser } from './(auth)/actions/getUser'
import { UserProvider } from '@/contexts/UserContext'
import Link from 'next/link'
import Image from 'next/image'
import SecureIcon from '@/components/SecureIcon'
import { useRouter } from 'next/navigation'
import MiddleFixedMenu from '@/components/MiddleFixedMenu'
import FooterMenuFixed from '@/components/FooterMenuFixed'

const yekanBakh = localFont({
  src: [
    {
      path: '../../fonts/woff2/YekanBakhFaNum-Regular.woff2',
      weight: '400',
      style: 'normal',
    },

    {
      path: '../../fonts/woff2/YekanBakhFaNum-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../fonts/woff2/YekanBakhFaNum-ExtraBlack.woff2',
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
          <div className="mx-auto max-w-7xl pt-10">
            {/* <div className="flex w-full gap-5 justify-between"> */}
            <div className="w-52 border-l border-slate-200 h-[51rem] fixed">
              <div className="flex flex-col justify-between h-full">
                <Link href={'/'}>
                  <div className="flex items-end gap-2">
                    <Image
                      priority={true}
                      src="/logo.svg"
                      width={48}
                      height={48} // ← اضافه کن
                      alt="اداره حراست شرکت پالایش نفت آبادان"
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
            <div className="flex mr-72 gap-4">
              <div className="w-3/4">{children}</div>
              <div className="w-1/4">چپ</div>
            </div>
            {/* </div> */}
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
