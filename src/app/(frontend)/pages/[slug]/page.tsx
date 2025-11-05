// app/pages/[slug]/page.tsx
// import { EmptyDemo } from '@/app/(frontend)/not-found'

import { notFound } from 'next/navigation' // ✅ درست

// تایپ‌های TypeScript
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

// تولید metadata برای SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages?where[slug][equals]=${slug}&where[status][equals]=true`,
    {
      next: { revalidate: 60 },
    },
  )

  if (!res.ok) return {}

  const data: PageResponse = await res.json()
  const page = data.docs[0]

  if (!page) return {}

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || page.excerpt,
  }
}

// کامپوننت اصلی صفحه
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages?where[slug][equals]=${slug}&where[status][equals]=true`,
    {
      next: { revalidate: 60 },
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
    <div className="container mx-auto">
      {/* تصویر شاخص */}
      {page.image?.url && (
        <div className="mb-4">
          <img
            src={page.image.url}
            alt={page.image.alt || page.title}
            className="w-full h-[30rem] object-cover rounded-lg"
          />
        </div>
      )}

      {/* عنوان */}
      <h1 className="text-2xl font-black mb-2">{page.title}</h1>

      {/* خلاصه */}
      {page.excerpt && (
        <p className="text-sm font-light leading-6 !text-justify text-gray-400 mb-8">
          {page.excerpt}
        </p>
      )}

      {/* اطلاعات اضافی */}
      {/* <div className="mt-12 pt-8 border-t text-sm text-gray-500">
        <p>آخرین بروزرسانی: {new Date(page.updatedAt).toLocaleDateString('fa-IR')}</p>
      </div> */}
    </div>
  )
}
