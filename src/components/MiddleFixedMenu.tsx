// components/MiddleFixedMenu.tsx
'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import SecureIcon from './SecureIcon'
import Link from 'next/link'
import {
  IconBell,
  IconBrandYoutube,
  IconFileTypeDoc,
  IconFlag,
  IconSearch,
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shield-ellipsis-icon lucide-shield-ellipsis"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="M8 12h.01" />
            <path d="M12 12h.01" />
            <path d="M16 12h.01" />
          </svg>
          <div className="text-xs">دربــاره ما</div>
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
