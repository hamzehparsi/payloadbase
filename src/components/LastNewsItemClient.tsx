'use client'

import React from 'react'

interface NewsItem {
  title: string
  excerpt: string
  image: object
  body: string
  createdAt: string
  id: string
  publishedAt: string
  status: boolean
}

interface LastNewsItemClientProps {
  news: NewsItem[]
}

export default function LastNewsItemClient({ news }: LastNewsItemClientProps) {
  return (
    <div>
      {news.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.excerpt}</p>
          <small>{new Date(item.publishedAt).toLocaleDateString('fa-IR')}</small>
        </div>
      ))}
    </div>
  )
}
