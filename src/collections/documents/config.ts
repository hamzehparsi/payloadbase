import { CollectionConfig } from 'payload'

// تابع برای تولید slug
const generateSlug = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF\u0750-\u077F\s-]/g, '') // پشتیبانی از حروف فارسی و عربی
    .replace(/[\s_]+/g, '-') // جایگزینی فاصله و underline با خط تیره
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    .substring(0, 100) // محدود کردن طول slug
}
const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'سند',
    plural: 'قوانین و مقررات',
  },
  admin: {
    useAsTitle: 'title',
    group: 'محتوا',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'عنوان',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'نامک (URL)',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'آدرس صفحه - به صورت خودکار از عنوان تولید می‌شود',
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.title) {
              return generateSlug(data.title)
            }
            return undefined
          },
        ],
      },
    },
    {
      name: 'files',
      type: 'upload',
      label: 'فایل‌ها',
      relationTo: 'media',
      hasMany: true,
      required: false,
      admin: {
        description: 'فایل‌های مرتبط با این سند',
      },
    },
  ],
}

export default Documents
