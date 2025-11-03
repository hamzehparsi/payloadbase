'use client'

import React from 'react'
import Link from 'next/link'

interface Tag {
  id: string
  name: string
  slug: string
}

interface LastHashtagClientProps {
  tags: Tag[]
}

export default function LastHashtagClient({ tags }: LastHashtagClientProps) {
  return (
    <div className="bg-brand-light rounded-full p-2 mt-7">
      <div className="flex flex-wrap gap-6 items-center justify-center">
        <Link
          href={'/tags'}
          className="bg-brand rounded-full text-sm tracking-tighter text-white px-5 py-1"
        >
          نمایش همه هشتگ‌ها
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/tags/${tag.slug}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 hover:bg-brand font-thin text-gray-700 hover:text-white rounded-full text-sm transition-all duration-300 ease-in-out"
          >
            <span className="text-xs">#</span>
            <span className="">{tag.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
