// collections/News.ts
import type { CollectionConfig } from 'payload'

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

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    plural: 'اخبار و تازه ها',
    singular: 'خبر',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'hashtags', 'type', 'image'],
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
      admin: {
        description: 'عنوان خبر - نامک به صورت خودکار از این فیلد تولید می‌شود',
      },
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
      name: 'publishedAt',
      type: 'date',
      label: 'تاریخ انتشار',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',

        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy/MM/dd',
        },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'چکیده',
      admin: {
        rows: 2,
        rtl: true,
      },
    },
    {
      name: 'hashtags',
      type: 'relationship',
      label: 'هشتگ‌ها',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        description: 'هشتگ‌های مرتبط با این خبر',
      },
    },

    {
      name: 'body',
      type: 'textarea',
      label: 'متن اصلی',
      admin: {
        rows: 4,
        rtl: true,
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'تصویر نماد',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'نوع محتوا',
      required: true,
      defaultValue: 'news',
      options: [
        {
          label: 'اخبار و تازه‌ها',
          value: 'news',
        },
        {
          label: 'گزارش تصویری',
          value: 'photo-report',
        },
        {
          label: 'ویدیو',
          value: 'video',
        },
        {
          label: 'آموزشی',
          value: 'learning',
        },
      ],
      admin: {
        description: 'نوع محتوای این خبر را انتخاب کنید',
      },
    },
    {
      name: 'status',
      type: 'checkbox',
      label: 'منتشر شده',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    // فیلد گالری برای گزارش تصویری
    {
      name: 'gallery',
      type: 'upload',
      label: 'گالری تصاویر',
      relationTo: 'media',
      hasMany: true, // این اجازه می‌دهد چندین تصویر انتخاب شود
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        condition: (data) => data.type === 'photo-report',
        description: 'تصاویر گزارش تصویری را انتخاب کنید (می‌توانید چندین عکس انتخاب کنید)',
      },
    },

    {
      name: 'videoFile',
      type: 'upload',
      label: 'فایل ویدیو',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'video' },
      },
      admin: {
        condition: (data) => data.type === 'video',
        description: 'یا می‌توانید فایل ویدیو را مستقیماً آپلود کنید',
      },
    },
  ],
}
