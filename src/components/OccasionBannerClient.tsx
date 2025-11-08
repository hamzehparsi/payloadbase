// src/components/OccasionBannerClient.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import type { Banner } from './OccasionBanner'

interface OccasionBannerClientProps {
  banner: Banner
}

export default function OccasionBannerClient({ banner }: OccasionBannerClientProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    // فقط چک کن که در همین بارگذاری بسته نشده باشه
    if (!isClosed) {
      // بعد از 2 ثانیه نشون بده
      setTimeout(() => setIsVisible(true), 2000)
    }
  }, [isClosed])

  const handleClose = (e?: React.MouseEvent) => {
    // جلوگیری از اجرای لینک اگه بنر لینک داشته باشه
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosed(true)
    }, 300)
  }

  if (!isVisible) return null

  const BannerContent = (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-md transition-all duration-300 ${
        isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="relative overflow-hidden rounded-lg shadow-2xl">
        {/* دکمه بستن */}
        <button
          onClick={handleClose}
          className="absolute top-2 left-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
          aria-label="بستن"
        >
          <X size={20} />
        </button>

        {/* محتوای بنر */}
        <div className="relative w-48 h-72">
          <Image
            src={banner.image.url}
            alt={banner.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </div>
  )

  // اگه لینک داره، کل بنر رو کلیک‌پذیر کن
  if (banner.link) {
    return (
      <Link href={banner.link} target="_blank" rel="noopener noreferrer">
        {BannerContent}
      </Link>
    )
  }

  return BannerContent
}
