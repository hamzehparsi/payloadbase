// src/app/(frontend)/news/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { IconBellRinging, IconBrandYoutube, IconPhoto } from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'اداره حراست | اخبار و تازه ها',
  description: 'اخبار و تازه ها',
}
interface NewsItem {
  id: string
  title: string
  slug: string
  excerpt: string
  image: {
    url: string
    alt?: string
  }
  publishedAt: string
  type: string
  hashtags?: Array<{ name: string }>
}

interface NewsResponse {
  docs: NewsItem[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

interface NewsPageProps {
  searchParams: Promise<{
    page?: string
    type?: string
  }>
}

async function getNewsList(page: number = 1, type?: string) {
  try {
    let url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/news?where[status][equals]=true&where[type][not_equals]=learning&depth=1&limit=5&page=${page}&sort=-publishedAt`

    // اگر فیلتر نوع انتخاب شده بود
    if (type && type !== 'all') {
      url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/news?where[status][equals]=true&where[type][equals]=${type}&depth=1&limit=5&page=${page}&sort=-publishedAt`
    }

    const res = await fetch(url, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      return null
    }

    const data: NewsResponse = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching news:', error)
    return null
  }
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const selectedType = params.type || 'all'
  const newsData = await getNewsList(currentPage, selectedType)

  if (!newsData || newsData.docs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">خبری یافت نشد</p>
      </div>
    )
  }

  const filters = [
    { label: 'همه', value: 'all', icon: null },
    { label: 'اخبار و تازه‌ها', value: 'news', icon: IconBellRinging },
    { label: 'گزارش تصویری', value: 'photo-report', icon: IconPhoto },
    { label: 'ویدیو', value: 'video', icon: IconBrandYoutube },
  ]

  return (
    <div className="space-y-8">
      {/* فیلتر */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-semibold text-gray-700">دسته‌بندی:</span>
          {filters.map((filter) => {
            const Icon = filter.icon
            const isActive = selectedType === filter.value

            return (
              <Link
                key={filter.value}
                href={`/news?type=${filter.value}`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{filter.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* تعداد نتایج */}
      {/* <div className="text-sm text-gray-600">{newsData.totalDocs} مورد یافت شد</div> */}

      {/* لیست اخبار */}
      <div className="-mt-4">
        {newsData.docs.map((news) => (
          <Link key={news.id} href={`/news/${news.slug}`}>
            <div className="flex items-center gap-0 py-4 group">
              {/* بخش تصویر - سمت راست */}
              <div className="relative h-40 w-1/3 order-1 md:order-1">
                {news.image?.url ? (
                  <Image
                    src={news.image.url}
                    alt={news.image.alt || news.title}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
                    <span className="text-8xl opacity-30">📰</span>
                  </div>
                )}
                <div className="absolute right-6 bottom-6">
                  {/* نوع محتوا */}
                  {news.type && (
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-slate-300 rounded-full text-xs text-slate-700">
                      {news.type === 'video' && (
                        <>
                          <IconBrandYoutube className="text-slate-700 size-5" />
                          <span>ویدیو</span>
                        </>
                      )}
                      {news.type === 'photo-report' && (
                        <>
                          <IconPhoto className="text-slate-700 size-5" />
                          <span>گزارش تصویری</span>
                        </>
                      )}
                      {news.type === 'news' && (
                        <>
                          <IconBellRinging className="text-slate-700 size-5" />
                          <span>اخبار و تازه ها</span>
                        </>
                      )}
                    </span>
                  )}
                </div>
              </div>

              {/* بخش محتوا - سمت چپ */}
              <CardContent className="flex w-1/2 flex-col justify-center order-2 md:order-2 p-6">
                {/* هشتگ‌ها و تاریخ */}
                <div className="flex items-center divide-x divide-slate-200 mb-4 flex-wrap">
                  {/* هشتگ‌ها */}
                  {news.hashtags && news.hashtags.length > 0 && (
                    <div className="flex items-center font-thin gap-2 flex-wrap pl-4">
                      {news.hashtags.slice(0, 3).map((hashtag, index) => (
                        <span
                          key={index}
                          className="inline-flex text-brand-gray items-center gap-1 rounded-full text-xs"
                        >
                          #<span>{hashtag.name}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* تاریخ */}
                  <div className="flex items-center gap-2 text-xs text-brand-gray pr-4">
                    <span className="font-thin">
                      {new Date(news.publishedAt).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* عنوان */}
                <h2 className="text-sm leading-8 group-hover:text-brand text-blue-dark transition-all duration-300 ease-in-out font-black mb-4">
                  {news.title}
                </h2>
              </CardContent>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {newsData.totalPages > 1 && (
        <Pagination dir="rtl" className="mt-8">
          <PaginationContent>
            {/* دکمه قبلی */}
            <PaginationItem>
              <PaginationPrevious
                href={
                  currentPage > 1
                    ? `/news?page=${currentPage - 1}${selectedType !== 'all' ? `&type=${selectedType}` : ''}`
                    : '#'
                }
                className={!newsData.hasPrevPage ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {/* شماره صفحات */}
            {Array.from({ length: newsData.totalPages }, (_, i) => i + 1).map((pageNum) => {
              if (
                pageNum === 1 ||
                pageNum === newsData.totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={`/news?page=${pageNum}${selectedType !== 'all' ? `&type=${selectedType}` : ''}`}
                      isActive={pageNum === currentPage}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              }

              if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }

              return null
            })}

            {/* دکمه بعدی */}
            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < newsData.totalPages
                    ? `/news?page=${currentPage + 1}${selectedType !== 'all' ? `&type=${selectedType}` : ''}`
                    : '#'
                }
                className={!newsData.hasNextPage ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
