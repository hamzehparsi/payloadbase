// app/pages/[slug]/page.tsx
import { notFound } from 'next/navigation'

// // تایپ‌های TypeScript
interface Page {
  id: string
  title: string
  slug: string
  body: any // richText content
  excerpt?: string
  image?: {
    url: string
    alt?: string
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    metaImage?: {
      url: string
    }
  }
  status: boolean
  createdAt: string
  updatedAt: string
}

interface PageResponse {
  docs: Page[]
}

// کامپوننت اصلی صفحه
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages?where[slug][equals]=${slug}&where[status][equals]=true`,
    {
      next: { revalidate: 60 }, // ISR
    },
  )

  if (!res.ok) {
    notFound()
  }

  const data: PageResponse = await res.json()
  const page = data.docs[0]

  if (!page) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      {/* تصویر شاخص */}
      {page.image?.url && (
        <div className="mb-8">
          <img
            src={page.image.url}
            alt={page.image.alt || page.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* عنوان */}
      <h1 className="text-4xl font-bold mb-4">{page.title}</h1>

      {/* خلاصه */}
      {page.excerpt && <p className="text-xl text-gray-600 mb-8">{page.excerpt}</p>}

      {/* محتوا */}

      {/* اطلاعات اضافی */}
      <div className="mt-12 pt-8 border-t text-sm text-gray-500">
        <p>آخرین بروزرسانی: {new Date(page.updatedAt).toLocaleDateString('fa-IR')}</p>
      </div>
    </div>
  )
}
