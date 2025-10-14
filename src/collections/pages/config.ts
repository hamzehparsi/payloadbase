// collections/Pages.ts
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    plural: 'صفحه‌ها',
    singular: 'صفحه',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'excerpt', 'publishedAt', 'status'],
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
      index: true, // اضافه کردن index
      admin: {
        description: 'آدرس صفحه - مثال: about-us',
      },
    },
    // {
    //   name: 'body',
    //   type: 'richText',
    //   label: 'محتوای صفحه',
    //   required: true,
    // },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'خلاصه',
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
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'status',
      type: 'checkbox',
      label: 'منتشر شده',
      defaultValue: true,
    },
  ],
}
