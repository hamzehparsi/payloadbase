import LastLearningFrontPageClient from './LastLearningFrontPageClient'

interface NewsItem {
  title: string
  slug: string
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
}

interface PageResponse {
  docs: NewsItem[]
}

export default async function LastNewsItem() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/news?where[status][equals]=true&where[type][equals]=learning&limit=5&sort=-publishedAt`,
    {
      next: { revalidate: 60 },
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch news')
  }

  const data: PageResponse = await res.json()

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mt-4 px-1">
        <h3 className="text-[11px] font-black text-brand-gray">مطالب آموزشی</h3>
        <div className="flex-1 h-px bg-slate-200"></div>
        <span className="text-xs text-brand-gray">آرشیو</span>
      </div>
      <LastLearningFrontPageClient news={data.docs} />
    </div>
  )
}
