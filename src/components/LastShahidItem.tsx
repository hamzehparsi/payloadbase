// components/LastShahidItem.tsx
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface Shahid {
  id: string
  fullName: string
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
  isActive: boolean
}

export default async function LastShahidItem() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/shahid?depth=1&sort=-createdAt&limit=1&where[isActive][equals]=true`,
    {
      next: { revalidate: 3600 }, // هر یک ساعت کش رو بروز می‌کنه
    },
  )

  if (!res.ok) {
    return notFound()
  }

  const data = await res.json()
  const shahid = data.docs[0] as Shahid | undefined

  if (!shahid) {
    return null
  }

  return (
    <div className="flex flex-col items-center -mt-8">
      {/* تصویر شهید */}
      <div className="relative w-full h-auto">
        <div className="p-4">
          <img
            src={shahid.image.url}
            alt={shahid.image.alt || shahid.fullName}
            className="object-cover rounded-lg mx-auto m-4"
          />
        </div>
        {/* نام شهید */}
        <div className="text-center bg-brand-light w-full rounded-xl p-4 absolute -bottom-3 flex flex-col items-center">
          <div className="relative -top-7 bg-red-600 text-xs px-3 py-1 text-white inline-block rounded-xl">
            شهید حراستی سرفراز
          </div>
          <h3 className="text-sm tracking-tighter -mt-4 text-brand font-black">
            {shahid.fullName}
          </h3>
        </div>
      </div>
    </div>
  )
}
