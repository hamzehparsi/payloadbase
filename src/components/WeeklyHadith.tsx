// app/components/WeeklyHadithCard.tsx
import Image from 'next/image'
interface Hadith {
  text: string
}

export default async function WeeklyHadithCard() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/weekly-hadith`, {
    next: { revalidate: 3600 }, // هر 1 ساعت revalidate شود
  })

  if (!res.ok) {
    return null
  }

  const hadith: Hadith = await res.json()

  return (
    <div className="pt-1 mb-6">
      <div className="flex items-start gap-3 divide-x divide-slate-200">
        <img className="pl-3 h-6" src="/hadis.svg" alt="حدیث روز" />
        <div className="text-brand-gray text-sm leading-relaxed">{hadith.text}</div>
      </div>
    </div>
  )
}
