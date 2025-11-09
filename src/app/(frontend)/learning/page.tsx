// src/app/(frontend)/learning/page.tsx
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
import { IconBook } from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'اداره حراست | مطالب آموزشی',
  description: 'مطالب آموزشی',
}
interface LearningItem {
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

interface LearningResponse {
  docs: LearningItem[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

interface LearningPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

async function getLearningList(page: number = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/news?where[status][equals]=true&where[type][equals]=learning&depth=1&limit=5&page=${page}&sort=-publishedAt`,
      {
        next: { revalidate: 60 },
      },
    )

    if (!res.ok) {
      return null
    }

    const data: LearningResponse = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching learning content:', error)
    return null
  }
}

export default async function LearningPage({ searchParams }: LearningPageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const learningData = await getLearningList(currentPage)

  if (!learningData || learningData.docs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">مطلب آموزشی یافت نشد</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* لیست مطالب آموزشی */}
      <div className="-mt-4">
        {learningData.docs.map((item) => (
          <Link key={item.id} href={`/news/${item.slug}`}>
            <div className="flex items-center group gap-0 py-4">
              {/* بخش تصویر - سمت راست */}
              <div className="relative h-40 w-1/3 order-1 md:order-1">
                {item.image?.url ? (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || item.title}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
                    <span className="text-8xl opacity-30">📚</span>
                  </div>
                )}
                <div className="absolute right-6 bottom-6">
                  {/* نوع محتوا */}
                  {/* <span className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-slate-300 rounded-full text-xs text-slate-700">
                    <IconBook className="text-slate-700 size-5" />
                    <span>مطالب آموزشی</span>
                  </span> */}
                </div>
              </div>

              {/* بخش محتوا - سمت چپ */}
              <CardContent className="flex w-1/2 flex-col justify-center order-2 md:order-2 p-6">
                {/* هشتگ‌ها و تاریخ */}
                <div className="flex items-center divide-x divide-slate-200 mb-4 flex-wrap">
                  {/* هشتگ‌ها */}
                  {item.hashtags && item.hashtags.length > 0 && (
                    <div className="flex items-center font-thin gap-2 flex-wrap pl-4">
                      {item.hashtags.slice(0, 3).map((hashtag, index) => (
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
                      {new Date(item.publishedAt).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* عنوان */}
                <h2 className="text-sm leading-8 group-hover:text-brand text-blue-dark hover:text-brand transition-all duration-300 ease-in-out font-black mb-4">
                  {item.title}
                </h2>

                {/* چکیده */}
                {/* {item.excerpt && (
                  <p className="text-gray-700 text-base md:text-sm leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                )} */}
              </CardContent>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {learningData.totalPages > 1 && (
        <Pagination dir="rtl" className="mt-8">
          <PaginationContent>
            {/* دکمه قبلی */}
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? `/learning?page=${currentPage - 1}` : '#'}
                className={!learningData.hasPrevPage ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {/* شماره صفحات */}
            {Array.from({ length: learningData.totalPages }, (_, i) => i + 1).map((pageNum) => {
              // نمایش صفحات نزدیک به صفحه فعلی
              if (
                pageNum === 1 ||
                pageNum === learningData.totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={`/learning?page=${pageNum}`}
                      isActive={pageNum === currentPage}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              }

              // نمایش سه نقطه
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
                  currentPage < learningData.totalPages ? `/learning?page=${currentPage + 1}` : '#'
                }
                className={!learningData.hasNextPage ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
