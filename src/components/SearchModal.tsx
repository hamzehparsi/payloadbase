// components/SearchModal.tsx
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { IconSearch, IconLoader2 } from '@tabler/icons-react'
import Image from 'next/image'

interface SearchResult {
  id: string
  title: string
  slug: string
  excerpt?: string
  type: string
  collection: 'news' | 'shahid'
  image?: {
    url: string
  }
  fullName?: string
}

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (query.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)

    try {
      // جستجو در اخبار
      const newsRes = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/news?where[or][0][title][contains]=${query}&where[or][1][excerpt][contains]=${query}&where[status][equals]=true&limit=5`,
      )
      const newsData = await newsRes.json()

      // جستجو در شهدا
      const shahidRes = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/shahid?where[or][0][fullName][contains]=${query}&where[or][1][excerpt][contains]=${query}&where[isActive][equals]=true&limit=5`,
      )
      const shahidData = await shahidRes.json()

      // ترکیب نتایج
      const combinedResults: SearchResult[] = [
        ...newsData.docs.map((item: any) => ({
          ...item,
          collection: 'news' as const,
        })),
        ...shahidData.docs.map((item: any) => ({
          ...item,
          collection: 'shahid' as const,
          title: item.fullName,
        })),
      ]

      setResults(combinedResults)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    onOpenChange(false)
    setSearchQuery('')
    setResults([])

    if (result.collection === 'news') {
      router.push(`/news/${result.slug}`)
    } else if (result.collection === 'shahid') {
      router.push(`/shahid/${result.slug}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
        <div dir="rtl">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="text-xl font-black text-gray-900 text-right">جستجو</DialogTitle>
            <DialogDescription className="text-sm text-gray-600 text-right">
              در اخبار، مطالب آموزشی و شهدا جستجو کنید
            </DialogDescription>
          </DialogHeader>

          {/* Input جستجو */}
          <div className="px-6 py-4">
            <div className="relative">
              <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="جستجو..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pr-10 text-right border !shadow-none focus-visible:border-none"
                autoFocus
              />
              {isLoading && (
                <IconLoader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand animate-spin" />
              )}
            </div>
          </div>

          {/* نتایج جستجو */}
          <div className="px-6 pb-6 overflow-y-auto max-h-[50vh]">
            {searchQuery.length < 2 && (
              <div className="text-center py-12 text-gray-500 text-sm">
                حداقل 2 کاراکتر وارد کنید
              </div>
            )}

            {searchQuery.length >= 2 && !isLoading && results.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-sm">نتیجه‌ای یافت نشد</div>
            )}

            {results.length > 0 && (
              <div className="space-y-3">
                {results.map((result) => (
                  <button
                    key={`${result.collection}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-right p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 flex items-start gap-4"
                  >
                    {/* محتوا */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            result.collection === 'news'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {result.collection === 'news' ? 'خبر' : 'شهید'}
                        </span>
                        {result.type && result.collection === 'news' && (
                          <span className="text-xs text-gray-500">
                            {result.type === 'video' && 'ویدیو'}
                            {result.type === 'photo-report' && 'گزارش تصویری'}
                            {result.type === 'news' && 'خبر'}
                            {result.type === 'learning' && 'آموزشی'}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{result.title}</h3>
                      {result.excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-2">{result.excerpt}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
