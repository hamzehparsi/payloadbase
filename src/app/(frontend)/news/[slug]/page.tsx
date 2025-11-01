// src/app/(frontend)/news/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { IconBellRinging, IconBook, IconBrandYoutube, IconPhoto } from '@tabler/icons-react'

interface NewsPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getNews(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/news?where[slug][equals]=${slug}&depth=1`,
      {
        next: { revalidate: 30 },
      },
    )

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.docs[0] || null
  } catch (error) {
    console.error('Error fetching news:', error)
    return null
  }
}

export async function generateMetadata({ params }: NewsPageProps) {
  const { slug } = await params
  const news = await getNews(slug)

  if (!news) {
    return {
      title: 'خبر یافت نشد',
    }
  }

  return {
    title: news.title,
    description: news.excerpt,
  }
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params
  const news = await getNews(slug)

  if (!news) {
    notFound()
  }

  return (
    <div className="space-y-8">
      {/* هدر خبر */}
      <div className="flex items-center gap-0">
        {/* بخش تصویر - سمت راست */}
        <div className="relative h-64 w-1/2 order-1 md:order-1">
          {news.image?.url ? (
            <Image
              src={news.image.url}
              alt={news.image.alt || news.title}
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
              <span className="text-8xl opacity-30">📰</span>
            </div>
          )}
          <div className="absolute right-6 bottom-6">
            {/* نوع محتوا */}
            {news.type && (
              <span className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-slate-300 rounded-full text-xs text-slate-700">
                {news.type === 'video' && (
                  <>
                    <IconBrandYoutube className="text-slate-700 size-5" />
                    <span>ویدیو</span>
                  </>
                )}
                {news.type === 'photo-report' && (
                  <>
                    <IconPhoto className="text-slate-700 size-5" />
                    <span>گزارش تصویری</span>
                  </>
                )}
                {news.type === 'news' && (
                  <>
                    <IconBellRinging className="text-slate-700 size-5" />
                    <span>اخبار و تازه ها</span>
                  </>
                )}
                {news.type === 'learning' && (
                  <>
                    <IconBook className="text-slate-700 size-5" />
                    <span>مطالب آموزشی</span>
                  </>
                )}
              </span>
            )}
          </div>
        </div>

        {/* بخش محتوا - سمت چپ */}
        <CardContent className="flex w-1/2 flex-col justify-center order-2 md:order-2">
          {/* هشتگ‌ها و تاریخ */}
          <div className="flex items-center divide-x divide-slate-200 mb-4 flex-wrap">
            {/* هشتگ‌ها */}
            {news.hashtags && news.hashtags.length > 0 && (
              <div className="flex items-center font-thin gap-2 flex-wrap pl-4">
                {news.hashtags.map((hashtag: any, index: number) => (
                  <span
                    key={index}
                    className="inline-flex text-brand-gray items-center gap-1 rounded-full text-xs"
                  >
                    #<span>{typeof hashtag === 'object' ? hashtag.name : hashtag}</span>
                  </span>
                ))}
              </div>
            )}

            {/* تاریخ */}
            <div className="flex items-center gap-2 text-xs text-brand-gray pr-4">
              <span className="font-thin">
                {new Date(news.publishedAt).toLocaleDateString('fa-IR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* عنوان */}
          <h2 className="text-xl leading-9 text-brand hover:text-blue-dark transition-all duration-300 ease-in-out font-black mb-4">
            {news.title}
          </h2>

          {/* چکیده */}
          {news.excerpt && (
            <p className="text-gray-700 text-base md:text-sm leading-relaxed">{news.excerpt}</p>
          )}
        </CardContent>
      </div>

      {/* محتوای اصلی */}
      <div className="">
        {/* متن اصلی */}
        {news.body && (
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap leading-8 text-gray-800">{news.body}</p>
          </div>
        )}

        {/* گالری تصاویر - یک تصویر فول در هر اسلاید */}
        {news.type === 'photo-report' && news.gallery && news.gallery.length > 0 && (
          <div className="" dir="rtl">
            <Carousel
              opts={{
                align: 'center',
                loop: true,
                direction: 'rtl',
              }}
              className="w-full"
            >
              <CarouselContent>
                {news.gallery.map((image: any, index: number) => (
                  <CarouselItem key={index} className="basis-full">
                    <Card className="!border-none !shadow-none overflow-hidden">
                      <div className="relative aspect-video w-full">
                        <Image
                          src={typeof image === 'object' ? image.url : image}
                          alt={
                            typeof image === 'object' && image.alt
                              ? image.alt
                              : `تصویر ${index + 1}`
                          }
                          fill
                          className="object-cover rounded-2xl"
                          sizes="100vw"
                        />
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* دکمه‌های ناوبری */}
              <CarouselPrevious className="left-5 hidden md:flex" />
              <CarouselNext className="right-5 hidden md:flex" />
            </Carousel>
          </div>
        )}

        {/* ویدیو */}
        {news.type === 'video' && (
          <div className="mt-8">
            {/* ویدیو آپلود شده */}
            {news.videoFile?.url && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">ویدیو</h3>
                <video controls className="w-full rounded-lg shadow-lg" poster={news.image?.url}>
                  <source src={news.videoFile.url} type="video/mp4" />
                  مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                </video>
              </div>
            )}

            {/* لینک ویدیو خارجی */}
            {news.videoUrl && !news.videoFile?.url && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">ویدیو</h3>
                <div className="aspect-video">
                  <iframe
                    src={news.videoUrl}
                    className="w-full h-full rounded-lg shadow-lg"
                    allowFullScreen
                    title={news.title}
                  />
                </div>
              </div>
            )}

            {/* مدت زمان ویدیو */}
            {news.videoDuration && (
              <p className="text-sm text-gray-600 mt-2">مدت زمان: {news.videoDuration}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
