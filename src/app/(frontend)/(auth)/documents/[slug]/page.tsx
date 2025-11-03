import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import type { Document, Media } from '@/payload-types'
import { IconCornerUpRight } from '@tabler/icons-react'

// دریافت سند با slug
async function getDocument(slug: string) {
  const payload = await getPayload({ config: await configPromise })

  const result = await payload.find({
    collection: 'documents',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!result.docs || result.docs.length === 0) {
    return null
  }

  return result.docs[0] as Document
}

// فرمت تاریخ به شمسی
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// دریافت اندازه فایل به صورت خوانا
function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + ' بایت'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' کیلوبایت'
  return (bytes / (1024 * 1024)).toFixed(2) + ' مگابایت'
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const document = await getDocument(decodedSlug)

  if (!document) {
    notFound()
  }

  const files = Array.isArray(document.files) ? document.files : []

  return (
    <div className="">
      {/* دکمه بازگشت */}
      <Link
        href="/documents"
        className="inline-flex items-center gap-2 text-brand hover:text-brand-light  mb-6 transition-colors"
      >
        <IconCornerUpRight className="bg-brand-light size-8 p-1 rounded-lg hover:bg-brand" />
      </Link>

      {/* اطلاعات سند */}
      <div className="bg-white rounded-lg mb-6 pb-3">
        <h1 className="text-xl font-black text-gray-900 mb-4">{document.title}</h1>

        <div className="flex gap-4 text-xs text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span>آخرین به‌روزرسانی: {formatDate(document.updatedAt)}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span>{files.length} فایل</span>
          </div>
        </div>
      </div>

      {/* لیست فایل‌ها */}
      {files.length > 0 ? (
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-sm font-black text-gray-900">فایل‌های پیوست</h2>
          </div>

          <ul className="divide-y divide-gray-200">
            {files.map((file) => {
              const media = typeof file === 'object' ? (file as Media) : null
              if (!media) return null

              return (
                <li key={media.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* آیکون فایل */}
                      <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-brand"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>

                      {/* اطلاعات فایل */}
                      <div>
                        <h3 className="font-semibold text-gray-900">{media.filename}</h3>
                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                          {media.filesize && <span>{formatFileSize(media.filesize)}</span>}
                          {/* {media.mimeType && <span>{media.mimeType}</span>} */}
                        </div>
                      </div>
                    </div>

                    {/* دکمه دانلود */}
                    <a
                      href={media.url || '#'}
                      download
                      className="flex items-center text-xs gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
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
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                      دانلود
                    </a>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <p className="text-gray-500">هیچ فایلی برای این سند وجود ندارد</p>
        </div>
      )}
    </div>
  )
}
