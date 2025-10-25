'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IconArrowUpRight } from '@tabler/icons-react'

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
  // انتخاب 2 خبر بعد از آخرین خبر (خبر دوم و سوم)
  const secondAndThirdNews = React.useMemo(() => {
    if (!news || news.length < 3) return []

    // مرتب‌سازی بر اساس تاریخ انتشار (جدیدترین اول)
    const sortedNews = [...news].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )

    // برگرداندن 2 خبر بعد از آخرین خبر (index 1 و 2)
    return sortedNews.slice(1, 3)
  }, [news])

  if (secondAndThirdNews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">خبری برای نمایش وجود ندارد</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto" dir="rtl">
      <div className="flex items-center gap-6">
        {secondAndThirdNews.map((item) => (
          <div key={item.id} className="overflow-hidden w-1/2">
            <Link
              href={`/news/${item.slug || item.id}`}
              className="flex items-center group group-hover:-translate-y-2 transition-all duration-300 ease-in-out"
            >
              {/* محتوا */}
              <div className="bg-brand-light p-2 rounded-lg group-hover:bg-brand transition-all duration-300 ease-in-out">
                <IconArrowUpRight className="text-brand flex justify-center h-full mx-auto group-hover:text-white transition-all duration-300 ease-in-out size-8 p-1" />
              </div>
              <div className="p-4 w-5/6">
                {/* عنوان */}
                <h3 className="tracking-tighter text-sm font-thin text-gray-600 group-hover:text-brand transition-all duration-300 ease-in-out mb-2 line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
