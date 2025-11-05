import type { CollectionConfig } from 'payload'

export const OccasionBanners: CollectionConfig = {
  slug: 'occasion-banners',
  labels: {
    plural: 'بنرهای مناسبتی',
    singular: 'بنر مناسبتی',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'image', 'startDate', 'endDate', 'isActive'],
    group: 'محتوا',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'عنوان مناسبت',
      required: true,
      admin: {
        description: 'عنوان بنر مناسبتی (مثال: نوروز 1404، عید فطر)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'تصویر بنر',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description: 'تصویر بنر مناسبتی (سایز توصیه شده: 1920x400 پیکسل)',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'تاریخ شروع انتشار',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        description: 'تاریخی که بنر باید شروع به نمایش شود',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'yyyy/MM/dd - HH:mm',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'تاریخ پایان انتشار',
      required: true,
      admin: {
        description: 'تاریخی که بنر باید از نمایش خارج شود',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'yyyy/MM/dd - HH:mm',
        },
      },
      //   validate: (value, { data }) => {
      //     if (value && data?.startDate) {
      //       const start = new Date(data.startDate)
      //       const end = new Date(value)
      //       if (end <= start) {
      //         return 'تاریخ پایان باید بعد از تاریخ شروع باشد'
      //       }
      //     }
      //     return true
      //   },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'فعال',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'وضعیت دستی بنر (حتی اگر در بازه زمانی باشد)',
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'لینک (اختیاری)',
      admin: {
        description: 'لینک مقصد هنگام کلیک روی بنر',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'ترتیب نمایش',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'اولویت نمایش (عدد کمتر = اولویت بیشتر)',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // بررسی خودکار فعال بودن بر اساس تاریخ
        if (data.startDate && data.endDate) {
          const now = new Date()
          const start = new Date(data.startDate)
          const end = new Date(data.endDate)

          // اگر تاریخ پایان گذشته باشد، بنر را غیرفعال کن
          if (now > end) {
            data.isActive = false
          }
        }
        return data
      },
    ],
  },
}
