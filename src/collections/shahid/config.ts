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
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'چکیده',
      admin: {
        rows: 2,
        rtl: true,
      },
    },
    // collections/Shahid.ts - اصلاح hook
    {
      name: 'slug',
      type: 'text',
      label: 'نامک (URL)',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'آدرس صفحه - به صورت خودکار از نام تولید می‌شود',
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.fullName) {
              // ← تغییر از title به fullName
              return generateSlug(data.fullName)
            }
            return undefined
          },
        ],
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'متن اصلی',
    },
  ],
}
