import LastLearningFrontPageClient from './LastLearningFrontPageClient'
import LatestLearningFrontClient from './LatestLearningFrontClient'

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
      <LatestLearningFrontClient news={data.docs} />
    </div>
  )
}
