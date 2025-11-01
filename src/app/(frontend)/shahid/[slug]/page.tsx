// src/app/(frontend)/shahid/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'
// import { serializeLexical } from '@payloadcms/richtext-lexical/lexical/serialize'

interface ShahidPageProps {
  params: Promise<{
    slug: string
  }>
}

interface ShahidItem {
  id: string
  fullName: string
  slug: string
  excerpt?: string
  body?: any
  image: {
    url: string
    alt?: string
  }
  isActive: boolean
}

async function getShahid(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/shahid?where[slug][equals]=${slug}&where[isActive][equals]=true`,
      {
        next: { revalidate: 60 },
      },
    )

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.docs[0] || null
  } catch (error) {
    console.error('Error fetching shahid:', error)
    return null
  }
}

// تابع helper برای تبدیل Lexical به HTML
function lexicalToHTML(content: any): string {
  if (!content || !content.root) return ''

  let html = ''
  const root = content.root

  root.children?.forEach((node: any) => {
    if (node.type === 'paragraph') {
      html += '<p class="mb-4">'
      node.children?.forEach((child: any) => {
        if (child.type === 'text') {
          let text = child.text
          if (child.format & 1) text = `<strong>${text}</strong>` // bold
          if (child.format & 2) text = `<em>${text}</em>` // italic
          html += text
        } else if (child.type === 'link') {
          const linkText = child.children?.[0]?.text || ''
          const target = child.fields?.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
          html += `<a href="${child.fields?.url}" class="text-brand hover:text-brand-dark underline"${target}>${linkText}</a>`
        }
      })
      html += '</p>'
    } else if (node.type === 'list') {
      const tag = node.listType === 'number' ? 'ol' : 'ul'
      const listClass = node.listType === 'number' ? 'list-decimal' : 'list-disc'
      html += `<${tag} class="${listClass} mr-6 mb-4">`
      node.children?.forEach((listItem: any) => {
        html += '<li class="mb-2">'
        listItem.children?.forEach((child: any) => {
          if (child.type === 'text') {
            html += child.text
          }
        })
        html += '</li>'
      })
      html += `</${tag}>`
    }
  })

  return html
}

export async function generateMetadata({ params }: ShahidPageProps) {
  const { slug } = await params
  const shahid = await getShahid(slug)

  if (!shahid) {
    return {
      title: 'شهید یافت نشد',
    }
  }

  return {
    title: `شهید ${shahid.fullName}`,
    description: shahid.excerpt,
  }
}

export default async function ShahidDetailPage({ params }: ShahidPageProps) {
  const { slug } = await params
  const shahid = await getShahid(slug)

  if (!shahid) {
    notFound()
  }

  const bodyHTML = shahid.body ? lexicalToHTML(shahid.body) : ''

  return (
    <div className="space-y-8">
      {/* محتوای اصلی */}
      <div className="flex gap-6 items-center">
        {/* تصویر و نام شهید - سمت راست */}
        <div className="flex flex-col w-1/4 items-center sticky top-4">
          {/* تصویر شهید */}
          <div className="relative w-full h-auto">
            <div className="p-4">
              <img
                src={shahid.image.url}
                alt={shahid.image.alt || shahid.fullName}
                className="object-cover rounded-lg mx-auto m-4 w-full aspect-[3/4]"
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

        {/* محتوای متنی - سمت چپ */}
        <div className="w-3/4 space-y-6">
          {/* چکیده */}
          {shahid.excerpt && (
            <div className="">
              <p className="text-sm text-brand-gray leading-relaxed">{shahid.excerpt}</p>
            </div>
          )}

          {/* اگر هیچ محتوایی نداشت */}
          {!bodyHTML && !shahid.excerpt && (
            <div className="text-center py-12 text-gray-500">
              <p>اطلاعات بیشتری در دسترس نیست</p>
            </div>
          )}
        </div>
      </div>
      {/* متن اصلی */}
      {bodyHTML && (
        <div className="">
          <div
            className="prose prose-lg max-w-none text-sm text-brand-gray leading-8"
            dangerouslySetInnerHTML={{ __html: bodyHTML }}
          />
        </div>
      )}
      {/* فوتر با اطلاعات اضافی */}
      <div className="bg-gradient-to-l from-red-50 to-orange-50 rounded-xl p-6 text-center border border-red-100">
        <p className="text-sm text-gray-700 mb-2">
          "هر چه امروز کشور ما دارد و هرچه در آینده بدست بیاورد به برکت خون این جوانان شهیداست"
        </p>
        <p className="text-xs text-gray-500"> مقام معظم رهبری🌹</p>
      </div>
    </div>
  )
}
