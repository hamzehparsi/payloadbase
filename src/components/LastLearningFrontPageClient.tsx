'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import {
  IconBellRinging,
  IconBrandYoutube,
  IconBrandYoutubeFilled,
  IconPhoto,
  IconPhotoFilled,
  IconQuoteFilled,
} from '@tabler/icons-react'

interface NewsItem {
  title: string
  excerpt: string
  image: {
    url: string
    alt?: string
  }
  body: string
  createdAt: string
  id: string
  publishedAt: string
  status: boolean
  slug: string
  hashtags?: Array<{ name: string }>
  type?: string
}

interface LastNewsItemClientProps {
  news: NewsItem[]
}

export default function LastNewsItemClient({ news }: LastNewsItemClientProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  // تنظیمات Autoplay
  const plugin = React.useRef(
    Autoplay({
      delay: 4000, // 4 ثانیه تاخیر بین اسلایدها
      stopOnInteraction: true, // وقتی کاربر با اسلاید تعامل کند، متوقف شود
      stopOnMouseEnter: true, // وقتی موس روی اسلاید رفت، متوقف شود
    }),
  )

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="w-full" dir="rtl">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full max-w-7xl mx-auto"
        opts={{
          align: 'center',
          loop: true,
          direction: 'rtl',
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {news.map((item) => (
            <CarouselItem key={item.id} className="md:basis-full border-none shadow-none">
              <Card className="overflow-hidden border-none !shadow-none">
                <Link href={`/news/${item.slug || item.id}`}>
                  <div className="flex items-center gap-0">
                    {/* بخش تصویر - سمت راست */}
                    <div className="relative h-64 w-1/2 order-1 md:order-1">
                      {item.image?.url ? (
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || item.title}
                          fill
                          className="object-cover rounded-2xl"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      ) : (
                        <div className="w-full">
                          <span className="text-8xl opacity-30">📰</span>
                        </div>
                      )}
                      <div className="absolute right-6 bottom-6">
                        {/* نوع محتوا */}
                        {item.type && (
                          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-slate-300  rounded-full text-xs text-slate-700">
                            {item.type === 'video' && (
                              <>
                                <IconBrandYoutube className="text-slate-700 size-5" />
                                <span className="">ویدیو</span>
                              </>
                            )}
                            {item.type === 'photo-report' && (
                              <>
                                <IconPhoto className=" text-slate-700 size-5" />
                                <span>گزارش تصویری</span>
                              </>
                            )}
                            {item.type === 'news' && (
                              <>
                                <IconBellRinging className="text-slate-700 size-5" />
                                <span>اخبار و تازه ها</span>
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
                        {item.hashtags && item.hashtags.length > 0 && (
                          <div className="flex items-center font-thin gap-2 flex-wrap pl-4">
                            {item.hashtags.slice(0, 3).map((hashtag, index) => (
                              <span
                                key={index}
                                className="inline-flex text-brand-gray items-center gap-1 rounded-full text-xs"
                              >
                                #<span>{hashtag.name}</span>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* تاریخ */}
                        <div className="flex items-center gap-2 text-xs text-brand-gray pr-4">
                          <span className="font-thin">
                            {new Date(item.publishedAt).toLocaleDateString('fa-IR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      {/* عنوان */}
                      <h2 className="text-xl leading-9 text-brand hover:text-blue-dark transition-all duration-300 ease-in-out font-black">
                        {item.title}
                      </h2>

                      {/* چکیده */}
                      {item.excerpt && (
                        <p className="text-gray-700 text-base md:text-sm leading-relaxed ">
                          {item.excerpt}
                        </p>
                      )}
                    </CardContent>
                  </div>
                </Link>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* اندیکاتورها و دکمه‌های ناوبری */}
      <div className="flex items-center justify-center gap-4">
        {/* نقطه‌های اندیکاتور */}
        <div className="flex gap-2">
          {news.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index ? 'w-8 h-3 bg-cyan-500' : 'w-3 h-3 bg-brand-dark hover:bg-brand'
              }`}
              aria-label={`برو به اسلاید ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
