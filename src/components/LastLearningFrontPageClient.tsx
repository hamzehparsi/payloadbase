'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { IconBellRinging, IconBrandYoutube, IconPhoto } from '@tabler/icons-react'

interface NewsItem {
  title: string
  excerpt: string
  image: {
    url: string
    alt?: string
  }
  body: string
  createdAt: string
  id: string
  publishedAt: string
  status: boolean
  slug: string
  hashtags?: Array<{ name: string }>
  type?: string
}

interface LastNewsItemClientProps {
  news: NewsItem[]
}

export default function LastNewsItemClient({ news }: LastNewsItemClientProps) {
  // مرتب‌سازی اخبار بر اساس تاریخ انتشار و گرفتن آخرین خبر
  const lastNews = React.useMemo(() => {
    if (!news || news.length === 0) return null

    const sortedNews = [...news].sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })

    return sortedNews[0]
  }, [news])

  if (!lastNews) {
    return (
      <div className="w-full text-center py-8" dir="rtl">
        <p className="text-gray-500">خبری برای نمایش وجود ندارد.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto" dir="rtl">
      <Card className="overflow-hidden border-none !shadow-none">
        <Link href={`/news/${lastNews.slug || lastNews.id}`}>
          <div className="flex items-center gap-0">
            {/* بخش تصویر - سمت راست */}
            <div className="w-full md:w-1/2">
              {lastNews.image?.url ? (
                <img
                  src={lastNews.image.url}
                  alt={lastNews.image.alt || lastNews.title}
                  className="object-cover rounded-2xl h-48 w-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
                  <span className="text-8xl opacity-30">📰</span>
                </div>
              )}
            </div>

            {/* بخش محتوا - سمت چپ */}
            <CardContent className="flex w-full md:w-1/2 flex-col justify-center order-2 md:order-2 p-6">
              {/* هشتگ‌ها و تاریخ */}
              <div className="flex items-center divide-x divide-slate-200 mb-4 flex-wrap">
                {/* هشتگ‌ها */}
                {lastNews.hashtags && lastNews.hashtags.length > 0 && (
                  <div className="flex items-center font-thin gap-2 flex-wrap pl-4">
                    {lastNews.hashtags.slice(0, 3).map((hashtag, index) => (
                      <span
                        key={index}
                        className="inline-flex text-gray-600 items-center gap-1 rounded-full text-xs"
                      >
                        #<span>{hashtag.name}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* تاریخ */}
                <div className="flex items-center gap-2 text-xs text-gray-600 pr-4">
                  <span className="font-thin">
                    {new Date(lastNews.publishedAt).toLocaleDateString('fa-IR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* عنوان */}
              <h2 className="text-[16px] leading-7 text-blue-dark hover:text-brand transition-all duration-300 ease-in-out font-black mb-3">
                {lastNews.title}
              </h2>

              {/* چکیده */}
              {/* {lastNews.excerpt && (
                <p className="text-gray-700 text-base md:text-sm leading-relaxed">
                  {lastNews.excerpt}
                </p>
              )} */}
            </CardContent>
          </div>
        </Link>
      </Card>
    </div>
  )
}
