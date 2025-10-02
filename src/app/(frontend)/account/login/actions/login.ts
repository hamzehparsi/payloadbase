'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import type { Manager } from '@/payload-types'

interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  success: boolean
  error?: string
  user?: Manager // اضافه کردن user
}

export type Result = {
  exp?: number
  token?: string
  user?: Manager
}

export async function login({ username, password }: LoginParams): Promise<LoginResponse> {
  const payload = await getPayload({ config })
  try {
    const result: Result = await payload.login({
      collection: 'managers',
      data: {
        username,
        password,
      },
    })

    if (result.token && result.user) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        maxAge: 7200,
      })

      return { success: true, user: result.user } // برگردوندن user
    } else {
      return { success: false, error: 'نام کاربری یا رمز عبور اشتباه است' }
    }
  } catch (e) {
    console.log('Login error: ', e)
    return { success: false, error: 'خطایی رخ داده است' }
  }
}
