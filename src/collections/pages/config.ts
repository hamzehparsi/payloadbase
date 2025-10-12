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
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
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
      admin: {
        description: 'آدرس صفحه - مثال: about-us',
      },
      // اتوماتیک از روی title ساخته شود
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'محتوای صفحه',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'خلاصه',
      admin: {
        description: 'خلاصه‌ای کوتاه از محتوای صفحه',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'تصویر شاخص',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'تنظیمات SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'عنوان متا',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'توضیحات متا',
          maxLength: 160,
        },
        {
          name: 'metaImage',
          type: 'upload',
          label: 'تصویر متا',
          relationTo: 'media',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
      ],
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
  ],
}
