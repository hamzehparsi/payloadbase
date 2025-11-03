import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { IconCornerUpRight } from '@tabler/icons-react'

type Tag = {
  id: string
  name: string
  slug: string
}

type Post = {
  id: string
  title: string
  slug: string
  excerpt?: string
  createdAt: string
  hashtags?: (string | Tag)[]
}

// دریافت هشتگ با slug
async function getTag(slug: string) {
  const payload = await getPayload({ config: await configPromise })

  const result = await payload.find({
    collection: 'tags',
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

  return result.docs[0] as Tag
}

// دریافت مطالب با هشتگ مشخص
async function getPostsByTag(tagId: string) {
  const payload = await getPayload({ config: await configPromise })

  const result = await payload.find({
    collection: 'news',
    where: {
      hashtags: {
        in: [tagId],
      },
    },
    sort: '-createdAt',
    limit: 50,
  })

  return result.docs as Post[]
}

// فرمت تاریخ به شمسی
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  const tag = await getTag(decodedSlug)

  if (!tag) {
    notFound()
  }

  const posts = await getPostsByTag(tag.id)

  return (
    <div className="">
      {/* دکمه بازگشت */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-brand hover:text-brand-light  mb-6 transition-colors"
      >
        <IconCornerUpRight className="bg-brand-light size-8 p-1 rounded-lg hover:bg-brand" />
      </Link>

      {/* هدر هشتگ */}
      <div className="bg-brand-dark rounded-lg p-3 mb-8 text-white">
        <div className="flex items-center gap-3">
          <span className="text-xl text-brand">#</span>
          <h1 className="text-xl text-brand font-bold">{tag.name}</h1>
        </div>
        {/* <p className="text-brand-light">{posts.length} مطلب با این هشتگ</p> */}
      </div>

      {/* لیست مطالب */}
      {posts.length === 0 ? (
        <div className="p-4 text-center">
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
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <p className="text-gray-500">هیچ مطلبی با این هشتگ یافت نشد</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="transition-all duration-300 p-6 group"
            >
              <div className="text-sm text-gray-500 whitespace-nowrap mb-4">
                {formatDate(post.createdAt)}
              </div>
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-black text-gray-900 group-hover:text-brand transition-colors">
                  {post.title}
                </h2>
              </div>

              {post.excerpt && <p className="text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>}

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(post.hashtags) &&
                    post.hashtags.slice(0, 3).map((t) => {
                      const tagObj = typeof t === 'object' ? (t as Tag) : null
                      if (!tagObj) return null

                      return (
                        <span
                          key={tagObj.id}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-brand-light text-gray-700 rounded-full text-xs"
                        >
                          <span>#</span>
                          <span>{tagObj.name}</span>
                        </span>
                      )
                    })}
                </div>

                <span className="text-brand text-sm font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                  مشاهده مطلب
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
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
