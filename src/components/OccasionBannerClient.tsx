// src/components/OccasionBannerClient.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { Banner } from './OccasionBanner'

interface OccasionBannerClientProps {
  banner: Banner
}

export default function OccasionBannerClient({ banner }: OccasionBannerClientProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // چک کن که کاربر قبلاً بنر رو بسته یا نه
    const closedBanners = JSON.parse(localStorage.getItem('closedBanners') || '[]')

    if (!closedBanners.includes(banner.id)) {
      // بعد از 1 ثانیه نشون بده
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [banner.id])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      // ذخیره ID بنر بسته شده
      const closedBanners = JSON.parse(localStorage.getItem('closedBanners') || '[]')
      closedBanners.push(banner.id)
      localStorage.setItem('closedBanners', JSON.stringify(closedBanners))
    }, 300)
  }

  if (!isVisible) return null

  const BannerContent = (
    <div
      className={`fixed bottom-6 left-6 z-50 max-w-md transition-all duration-300 ${
        isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <Alert className="relative overflow-hidden border-2 border-brand shadow-2xl p-0">
        {/* دکمه بستن */}
        <button
          onClick={handleClose}
          className="absolute top-2 left-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
          aria-label="بستن"
        >
          <X size={20} />
        </button>

        {/* محتوای بنر */}
        <div className="relative">
          <div className="relative w-full h-48">
            <Image
              src={banner.image.url}
              alt={banner.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <AlertDescription className="p-4 bg-white">
            <h3 className="font-bold text-lg text-gray-900 mb-1">{banner.title}</h3>
            {banner.link && (
              <p className="text-sm text-brand hover:text-brand-dark transition-colors">
                اطلاعات بیشتر ←
              </p>
            )}
          </AlertDescription>
        </div>
      </Alert>
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
