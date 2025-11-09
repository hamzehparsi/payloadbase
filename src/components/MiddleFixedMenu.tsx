// components/MiddleFixedMenu.tsx
'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import SecureIcon from './SecureIcon'
import Link from 'next/link'
import {
  IconBell,
  IconBrandYoutube,
  IconFileTextShield,
  IconFileTypeDoc,
  IconFlag,
  IconSearch,
  IconShieldHalfFilled,
  IconSitemap,
} from '@tabler/icons-react'
import SearchModal from './SearchModal'

export default function MiddleFixedMenu() {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  const isHome = pathname === '/' || pathname === '/frontend/'
  const isAbout = pathname === '/pages/about-us'

  return (
    <div>
      <div className="flex flex-col gap-4 w-full px-4">
        <Link
          href="/"
          className={`flex cursor-pointer items-center gap-2 transition-all ease-in-out duration-300 text-sm px-4 py-2 rounded-md ${
            isHome
              ? 'bg-brand-light text-brand font-bold'
              : 'text-slate-500 hover:text-brand hover:bg-brand-light'
          }`}
        >
          <SecureIcon />
          <div className="text-xs">خانه</div>
        </Link>

        <Link
          href="/pages/about-us"
          className={`flex cursor-pointer items-center gap-2 transition-all ease-in-out duration-300 text-sm px-4 py-2 rounded-md ${
            isAbout
              ? 'bg-brand-light text-brand font-bold'
              : 'text-slate-500 hover:text-brand hover:bg-brand-light'
          }`}
        >
          <IconFileTextShield />
          <div className="text-xs">دربــاره ما</div>
        </Link>
        <Link
          href="/offices"
          className={`flex cursor-pointer items-center gap-2 transition-all ease-in-out duration-300 text-sm px-4 py-2 rounded-md ${
            pathname === '/offices'
              ? 'bg-brand-light text-brand font-bold'
              : 'text-slate-500 hover:text-brand hover:bg-brand-light'
          }`}
        >
          <IconSitemap />
          <div className="text-xs">معرفی واحد ها</div>
        </Link>
        <Link
          href="/news"
          className={`flex cursor-pointer items-center gap-2 transition-all ease-in-out duration-300 text-sm px-4 py-2 rounded-md ${
            pathname === '/news'
              ? 'bg-brand-light text-brand font-bold'
              : 'text-slate-500 hover:text-brand hover:bg-brand-light'
          }`}
        >
          <IconBell />
          <div className="text-xs">اخبــار و تــازه ها</div>
        </Link>

        <Link
          href="/learning"
          className={`flex cursor-pointer items-center gap-2 transition-all ease-in-out duration-300 text-sm px-4 py-2 rounded-md ${
            pathname === '/learning'
              ? 'bg-brand-light text-brand font-bold'
              : 'text-slate-500 hover:text-brand hover:bg-brand-light'
          }`}
        >
          <IconBrandYoutube />
          <div className="text-xs">مطالب آموزشی</div>
        </Link>
        <Link
          href="/documents"
          className={`flex cursor-pointer items-center gap-2 transition-all ease-in-out duration-300 text-sm px-4 py-2 rounded-md ${
            pathname === '/documents'
              ? 'bg-brand-light text-brand font-bold'
              : 'text-slate-500 hover:text-brand hover:bg-brand-light'
          }`}
        >
          <IconFileTypeDoc />
          <div className="text-xs">قوانین و مقررات</div>
        </Link>

        <Link
          href="/shahid"
          className={`flex cursor-pointer items-center gap-2 transition-all ease-in-out duration-300 text-sm px-4 py-2 rounded-md ${
            pathname === '/shahid'
              ? 'bg-brand-light text-brand font-bold'
              : 'text-slate-500 hover:text-brand hover:bg-brand-light'
          }`}
        >
          <IconFlag />
          <div className="text-xs">معـرفی شهیـدان</div>
        </Link>

        <button
          onClick={() => setSearchOpen(true)}
          className="flex cursor-pointer items-center gap-2 transition-all ease-in-out duration-300 text-sm px-4 py-2 rounded-md text-slate-500 hover:text-brand hover:bg-brand-light"
        >
          <IconSearch />
          <div className="text-xs">جستــجو</div>
        </button>
      </div>

      {/* Modal جستجو */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
