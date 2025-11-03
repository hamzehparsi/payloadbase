import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { IconTag, IconTagFilled } from '@tabler/icons-react'
import { toPersianNumber } from '@/utils/persianNumber'

type Tag = {
  id: string
  name: string
  slug: string
}

// دریافت تمام هشتگ‌ها
async function getAllTags() {
  const payload = await getPayload({ config: await configPromise })

  const result = await payload.find({
    collection: 'tags',
    sort: 'name',
    limit: 100,
  })

  return result.docs as Tag[]
}

// شمارش مطالب هر هشتگ
async function getTagPostCount(tagId: string) {
  const payload = await getPayload({ config: await configPromise })

  const result = await payload.find({
    collection: 'news',
    where: {
      hashtags: {
        in: [tagId],
      },
    },
    limit: 0, // فقط می‌خواهیم تعداد را بدانیم
  })

  return result.totalDocs
}

export default async function AllTagsPage() {
  const tags = await getAllTags()

  // دریافت تعداد مطالب برای هر هشتگ
  const tagsWithCounts = await Promise.all(
    tags.map(async (tag) => ({
      ...tag,
      postCount: await getTagPostCount(tag.id),
    })),
  )

  // مرتب‌سازی بر اساس تعداد مطالب (بیشترین به کمترین)
  const sortedTags = tagsWithCounts.sort((a, b) => b.postCount - a.postCount)

  return (
    <div className="p-4">
      {/* هدر صفحه */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">تمام هشتگ‌ها</h1>
        <p className="text-gray-600">{toPersianNumber(tags.length)} هشتگ موجود</p>
      </div>

      {/* لیست هشتگ‌ها */}
      {sortedTags.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center">
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
              <line x1="4" x2="20" y1="9" y2="9" />
              <line x1="4" x2="20" y1="15" y2="15" />
              <line x1="10" x2="8" y1="3" y2="21" />
              <line x1="16" x2="14" y1="3" y2="21" />
            </svg>
          </div>
          <p className="text-gray-500">هیچ هشتگی یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.slug}`}
              className="group  transition-all duration-300 p-6 "
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center group-hover:bg-brand transition-colors">
                    <span className="text-2xl text-brand group-hover:text-white transition-colors">
                      #
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 group-hover:text-brand transition-colors">
                      {tag.name}
                    </h3>
                    <p className="text-sm text-gray-500">{toPersianNumber(tag.postCount)} مطلب</p>
                  </div>
                </div>

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
                  className="text-gray-400 group-hover:text-brand transition-colors"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* آمار کلی */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-brand to-brand-dark rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <IconTag className="text-gray-700" />
            </div>
            <div>
              <p className="text-sm opacity-90">تعداد هشتگ‌ها</p>
              <p className="text-3xl font-bold">{toPersianNumber(tags.length)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <IconTag className="text-gray-700" />
            </div>
            <div>
              <p className="text-sm opacity-90">کل مطالب</p>
              <p className="text-3xl font-bold">
                {toPersianNumber(sortedTags.reduce((sum, tag) => sum + tag.postCount, 0))}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <IconTag className="text-gray-700" />
            </div>
            <div>
              <p className="text-sm opacity-90">محبوب‌ترین هشتگ</p>
              <p className="text-xl font-bold truncate">
                {toPersianNumber(sortedTags[0]?.name || '-')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
