// src/app/(frontend)/shahid/page.tsx
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface ShahidItem {
  id: string
  fullName: string
  slug: string
  excerpt?: string
  image: {
    url: string
    alt?: string
  }
  isActive: boolean
}

interface ShahidResponse {
  docs: ShahidItem[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

interface ShahidPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

async function getShahidList(page: number = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/shahid?where[isActive][equals]=true&limit=12&page=${page}`,
      {
        next: { revalidate: 60 },
      },
    )

    if (!res.ok) {
      return null
    }

    const data: ShahidResponse = await res.json()

    return data
  } catch (error) {
    console.error('Error fetching shahid:', error)
    return null
  }
}

export default async function ShahidPage({ searchParams }: ShahidPageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const shahidData = await getShahidList(currentPage)

  if (!shahidData || shahidData.docs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">شهیدی یافت نشد</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Grid لیست شهدا */}
      <div className="">
        {shahidData.docs.map((shahid) => (
          <Link key={shahid.id} href={`/shahid/${shahid.slug}`} className="flex items-center gap-6">
            <div className="flex flex-col w-1/4 items-center hover:scale-105 transition-transform duration-300">
              {/* تصویر شهید */}
              <div className="relative w-full h-auto">
                <div className="p-4">
                  <img
                    src={shahid.image.url}
                    alt={shahid.image.alt || shahid.fullName}
                    className="object-cover rounded-lg mx-auto m-4 w-full aspect-[3/4]"
                  />
                </div>
                {/* نام شهید */}
                <div className="text-center bg-brand-light w-full rounded-xl p-4 absolute -bottom-3 flex flex-col items-center">
                  <div className="relative -top-7 bg-red-600 text-xs px-3 py-1 text-white inline-block rounded-xl">
                    شهید حراستی سرفراز
                  </div>
                  <h3 className="text-sm tracking-tighter -mt-4 text-brand font-black">
                    {shahid.fullName}
                  </h3>
                </div>
              </div>
            </div>
            <div className="w-3/4 text-sm text-brand-gray">{shahid.excerpt}</div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {shahidData.totalPages > 1 && (
        <Pagination dir="rtl" className="mt-8">
          <PaginationContent>
            {/* دکمه قبلی */}
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? `/shahid?page=${currentPage - 1}` : '#'}
                className={!shahidData.hasPrevPage ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {/* شماره صفحات */}
            {Array.from({ length: shahidData.totalPages }, (_, i) => i + 1).map((pageNum) => {
              // نمایش صفحات نزدیک به صفحه فعلی
              if (
                pageNum === 1 ||
                pageNum === shahidData.totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={`/shahid?page=${pageNum}`}
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
                href={currentPage < shahidData.totalPages ? `/shahid?page=${currentPage + 1}` : '#'}
                className={!shahidData.hasNextPage ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
