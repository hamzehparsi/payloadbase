// components/AdminRoot.tsx
'use client'

import React from 'react'
import localFont from 'next/font/local'

const yekanBakh = localFont({
  src: [
    {
      path: '../fonts/woff2/YekanBakhFaNum-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/woff2/YekanBakhFaNum-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/woff2/YekanBakhFaNum-ExtraBlack.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-yekan',
  display: 'swap',
})

interface AdminRootProps {
  children: React.ReactNode
}

const AdminRoot: React.FC<AdminRootProps> = ({ children }) => {
  return (
    <div className={yekanBakh.className} style={{ fontFamily: 'var(--font-yekan)' }}>
      {children}
    </div>
  )
}

export default AdminRoot
