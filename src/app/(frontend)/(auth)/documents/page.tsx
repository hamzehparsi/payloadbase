import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Payload } from 'payload'

// تایپ برای Document
type Document = {
  id: string
  title: string
  slug: string
  updatedAt: string
}

// دریافت اسناد
async function getDocuments() {
  const payload: Payload = await getPayload({ config: await configPromise })

  const documents = await payload.find({
    collection: 'documents',
    sort: '-updatedAt',
    limit: 100,
  })

  return documents.docs as Document[]
}

// فرمت تاریخ به شمسی
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function DocumentsPage() {
  const documents = await getDocuments()

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">اسناد</h1>

      {documents.length === 0 ? (
        <p className="text-gray-500 text-center py-12">هیچ سندی یافت نشد</p>
      ) : (
        <div className="">
          <ul className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <li key={doc.id}>
                <Link
                  href={`/documents/${doc.slug}`}
                  className="block hover:bg-gray-50 rounded-xl transition-colors p-6"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg tracking-tighter font-semibold text-gray-900 mb-2">
                      {doc.title}
                    </h2>
                    <span className="text-sm text-gray-500 mr-4 whitespace-nowrap">
                      {formatDate(doc.updatedAt)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
