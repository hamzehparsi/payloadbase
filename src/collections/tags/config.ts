// collections/Tags.ts
import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    plural: 'هشتگ‌ها',
    singular: 'هشتگ',
  },
  admin: {
    useAsTitle: 'name',
    group: 'محتوا',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'نام هشتگ',
      required: true,
      unique: true,
      admin: {
        description: 'نام هشتگ (مثال: سیاسی، اقتصادی، ورزشی)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'نامک',
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.name) {
              return data.name
                .trim()
                .toLowerCase()
                .replace(/[\s_]+/g, '-')
                .replace(/-+/g, '-')
            }
            return undefined
          },
        ],
      },
    },
  ],
}
