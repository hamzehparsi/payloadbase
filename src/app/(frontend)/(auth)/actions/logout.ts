'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  // delete the payload-token from the session
  cookieStore.delete('payload-token')

  // هدایت به صفحه اصلی
  redirect('/')
}
