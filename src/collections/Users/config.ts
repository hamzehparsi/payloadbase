import type { CollectionConfig } from 'payload'
import { protectRoles } from './hooks/protectRoles'
import editor from '../access/editor'
import user from '../access/user'
import admin from '../access/admin'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    plural: 'کاربران',
    singular: 'کاربر',
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: editor, // فقط editor یا admin می‌تونن یوزر بسازن
    read: user, // یوزر می‌تونه پروفایل خودش رو بخونه، editor و admin همه رو
    update: user, // همون منطق بالا
    delete: admin, // فقط admin می‌تونه حذف کنه
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      hooks: {
        beforeChange: [protectRoles],
      },
    },
  ],
}
