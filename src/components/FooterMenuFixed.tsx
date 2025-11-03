'use client'

import Link from 'next/link'
import { useUser } from '@/contexts/UserContext'

export default function MiddleFixedMenu() {
  const { user } = useUser()

  return (
    <div>
      <div>
        <div className="flex flex-col gap-4 w-full px-4">
          {user ? (
            <Link
              href={'/dashboard'}
              className="flex cursor-pointer items-center gap-2 hover:text-brand hover:bg-brand-light transition-all ease-in-out duration-300 text-sm px-4 py-2 rounded-md text-slate-500"
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
                className="lucide lucide-user-round-icon lucide-user-round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
              <div className="flex flex-col gap-1">
                <div className="font-bold">{user.fullname}</div>
                <div className="text-xs">{user.username || user.email}</div>
              </div>
            </Link>
          ) : (
            <Link
              href={'/account/login'}
              className="flex cursor-pointer items-center gap-2 hover:text-brand hover:bg-brand-light transition-all ease-in-out duration-300 text-sm px-4 py-2 rounded-md text-slate-500"
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
                className="lucide lucide-user-round-icon lucide-user-round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>

              <div className="text-xs">ورود</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
