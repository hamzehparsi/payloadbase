import { CollectionConfig } from 'payload'

export const Shahid: CollectionConfig = {
  slug: 'shahid',
  labels: {
    plural: 'شهدا',
    singular: 'شهید',
  },
  admin: {
    useAsTitle: 'fullName',
    group: 'محتوا',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'نام و نام خانوادگی',
    },
    {
      name: 'image',
      type: 'upload',
      label: 'تصویر شهید',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'لطفاً تصویر با کیفیت و مناسب آپلود کنید',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'نمایش در سایت',
      defaultValue: true,
      admin: {
        description: 'آیا این شهید در سایت نمایش داده شود؟',
        position: 'sidebar',
      },
    },
  ],
}
