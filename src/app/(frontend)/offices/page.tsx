import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'
import { Metadata } from 'next'

type Page = {
  id: string
  title: string
  slug: string
  excerpt?: string
  offices: boolean
  updatedAt: string
}

// دریافت صفحات با offices = true
async function getOfficePages() {
  const payload = await getPayload({ config: await configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: {
      offices: {
        equals: true,
      },
    },
    sort: 'title',
    limit: 100,
  })

  return result.docs as Page[]
}

// فرمت تاریخ به شمسی
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const metadata: Metadata = {
  title: 'اداره حراست | معرفی ادارات',
  description: 'معرفی ادارات',
}
export default async function OfficesPage() {
  const pages = await getOfficePages()

  return (
    <div className="py-4">
      {/* هدر صفحه */}
      <h1 className="text-2xl font-black text-gray-900 mb-2">معرفی واحدها</h1>
      <div className="mb-4">{/* <p className="text-gray-600">{pages.length} اداره</p> */}</div>

      {/* لیست ادارات */}
      {pages.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <p className="text-gray-500">هیچ اداره‌ای یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/pages/${page.slug}`}
              className="group hover:bg-brand-light rounded-xl transition-all duration-300 ease-in-out"
            >
              <div className="p-6">
                {/* آیکون اداره */}

                {/* عنوان */}
                <div className="flex justify-between group items-center">
                  <h2 className="text-lg font-black text-gray-900 group-hover:text-brand transition-all duration-300 ease-in-out">
                    {page.title}
                  </h2>
                  <div className="inline-flex items-center gap-2 text-brand group-hover:text-brand-light transition-all duration-300 ease-in-out">
                    <IconArrowLeft className="bg-brand-light size-8 p-1 rounded-lg group-hover:bg-brand transition-all duration-300 ease-in-out" />
                  </div>
                </div>

                {/* چکیده */}
                {/* {page.excerpt && (
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{page.excerpt}</p>
                )} */}

                {/* تاریخ به‌روزرسانی */}
                {/* <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <span>آخرین به‌روزرسانی</span>
                  <span>{formatDate(page.updatedAt)}</span>
                </div> */}

                {/* دکمه مشاهده */}
                {/* <div className="mt-4 flex items-center gap-2 text-brand font-medium group-hover:gap-3 transition-all"> */}
                {/* <span>مشاهده جزئیات</span> */}
                {/* </div> */}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
