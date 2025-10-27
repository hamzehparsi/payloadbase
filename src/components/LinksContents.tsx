// app/components/LinksContents.tsx
import Link from 'next/link'
import { IconLink } from '@tabler/icons-react'

interface LinkItem {
  title: string
  url: string
  description?: string
  isActive?: boolean
}

interface LinksData {
  items: LinkItem[]
}

export default async function LinksContents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/contents`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    return null
  }

  const data: LinksData = await res.json()

  // فیلتر کردن لینک‌های فعال
  const activeLinks = data.items?.filter((link) => link.isActive) || []

  if (activeLinks.length === 0) {
    return null
  }

  return (
    <div className="mt-2">
      {/* لیست لینک‌ها */}
      <div className="space-y-0">
        {activeLinks.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="flex items-center justify-between gap-3 py-2 transition-all group"
          >
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <IconLink className="w-3 h-3 text-brand-gray opacity-0 group-hover:opacity-100 group-hover:text-brand transition-all duration-300 ease-in-out" />

              <span className="font-thin text-xs text-brand-gray group-hover:text-brand group-hover:-translate-x-2 transition-all duration-300 ease-in-out truncate">
                {link.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
