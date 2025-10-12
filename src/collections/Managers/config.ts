import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import user from '../access/user'
import admin from '../access/admin'

export const Managers: CollectionConfig = {
  slug: 'managers',
  labels: {
    plural: 'مدیران',
    singular: 'مدیر',
  },
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    tokenExpiration: 7200,
    // این قسمت مهمه - به Payload میگه از username برای لاگین استفاده کنه
    loginWithUsername: {
      allowEmailLogin: false, // غیرفعال کردن لاگین با email
      requireEmail: false, // email اجباری نیست
    },
    cookies: {
      secure: true,
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  access: {
    create: admin,
    read: user,
    update: user,
    delete: admin,
  },
  fields: [
    {
      name: 'username',
      label: 'نام کاربری',
      type: 'text',
      required: true,
      unique: true, // مهم: باید unique باشه
      index: true, // برای سرعت بیشتر
    },
    {
      name: 'status',
      type: 'checkbox',
      label: 'فعال',
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        // ساخت fake email برای سازگاری با Payload
        if (data?.username) {
          data.email = `${data.username}@managers.local`
        }
        return data
      },
    ],
  },
}
