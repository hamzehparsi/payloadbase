// globals/WeeklyHadith.ts
import type { GlobalConfig } from 'payload'

export const WeeklyHadith: GlobalConfig = {
  slug: 'weekly-hadith',
  label: 'حدیث هفته',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      label: 'متن حدیث',
      required: true,
      admin: {
        rows: 4,
        rtl: true,
        description: 'متن حدیث را وارد کنید',
      },
    },
  ],
}
