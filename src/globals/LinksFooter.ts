// globals/Links.ts
import type { GlobalConfig } from 'payload'

interface LinkItem {
  title: string
  url: string
  description?: string
  openInNewTab: boolean
  isActive: boolean
}

interface LinksRowLabelProps {
  data?: {
    title?: string
  }
  index?: number
}

export const LinksFooter: GlobalConfig = {
  slug: 'links',
  label: 'پیوندها',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'لیست پیوندها',
      labels: {
        singular: 'پیوند',
        plural: 'پیوندها',
      },
      admin: {
        description: 'لیست پیوندهای مفید - می‌توانید ترتیب آنها را با drag & drop تغییر دهید',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'عنوان',
          required: true,
          admin: {
            placeholder: 'مثال: سامانه کارگزینی',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'آدرس لینک',
          required: true,
          admin: {
            placeholder: 'https://example.com',
          },
          validate: (value: string | string[] | null | undefined) => {
            if (typeof value === 'string' && !value.startsWith('http')) {
              return 'آدرس باید با http:// یا https:// شروع شود'
            }
            return true
          },
        },

        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'باز شدن در تب جدید',
          defaultValue: true,
        },
        {
          name: 'isActive',
          type: 'checkbox',
          label: 'فعال',
          defaultValue: true,
          admin: {
            description: 'آیا این پیوند در سایت نمایش داده شود؟',
          },
        },
      ],
    },
  ],
}
