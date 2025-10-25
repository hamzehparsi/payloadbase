import LastHashtagClient from './LastHashtagClient'

interface Tag {
  id: string
  name: string
  slug: string
}

interface NewsItem {
  hashtags: (Tag | string)[]
}

interface NewsResponse {
  docs: NewsItem[]
}

export default async function LastHashtag() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/news?where[status][equals]=true&where[type][equals]=learning&depth=2&limit=50&sort=-createdAt`,
    {
      // next: { revalidate: 3600 }, // هر 1 ساعت یکبار refresh می‌شه
    },
  )

  if (!res.ok) {
    return null
  }

  const data: NewsResponse = await res.json()

  const uniqueTags = new Map<string, Tag>()

  data.docs.forEach((news) => {
    if (news.hashtags && Array.isArray(news.hashtags)) {
      news.hashtags.forEach((tag) => {
        if (tag && typeof tag === 'object' && 'id' in tag) {
          if (!uniqueTags.has(tag.id)) {
            uniqueTags.set(tag.id, tag as Tag)
          }
        }
      })
    }
  })

  const tags = Array.from(uniqueTags.values()).slice(0, 5)

  if (tags.length === 0) {
    return null
  }

  return <LastHashtagClient tags={tags} />
}
