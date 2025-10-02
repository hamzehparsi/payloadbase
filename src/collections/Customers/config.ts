import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import user from '../access/user'
import admin from '../access/admin'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    tokenExpiration: 7200, // 2 ساعت
    verify: {
      generateEmailSubject: (args) => {
        return `Hey ${args?.user?.firstName ? args?.user.firstName : args?.user.email}, verify your email address!`
      },
      generateEmailHTML: (args) => {
        return `<div><h1>Hey ${args.user?.firstName ? args.user.firstName : args.user.email}!</h1><br /><p>Verify your email address by going to ${process.env.COOKIE_DOMAIN}/verify?token=${args.token}</p></div>`
      },
    },
    forgotPassword: {
      generateEmailSubject: (args) => {
        // we need to use `args` and conditional chaining here to prevent type issues
        return `Hey ${args?.user?.firstName ? args?.user.firstName : args?.user.email}! Reset your password.`
      },
      generateEmailHTML: (args) => {
        return `<div><h1>Hey ${args?.user?.firstName ? args?.user.firstName : args?.user.email}!</h1><br /><p>You (or someone else) requested to reset your password. If this wasn't you, you can safely ignore this email. Otherwise, reset your password by going to ${process.env.COOKIE_DOMAIN}/password-reset?token=${args?.token}</p></div>`
      },
    },
    cookies: {
      secure: true,
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  access: {
    create: anyone,
    read: user,
    update: user,
    delete: admin,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
      ],
    },
    // {
    //   name: 'username',
    //   type: 'text',
    // },
    {
      name: 'tier',
      type: 'radio',
      interfaceName: 'tierProps',
      options: ['Free', 'Basic', 'Pro', 'Enterprise'],
      defaultValue: 'Free',
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        // برای هر عملیات، fake email بساز
        if (data?.username && (!data.email || operation === 'create')) {
          data.email = `${data.username}@customers.local`
        }
        return data
      },
    ],
  },
}
