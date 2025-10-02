'use client'

import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { logout } from '@/app/(frontend)/(auth)/actions/logout'

export function UserProfile() {
  const { user, setUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  if (!user) {
    return null
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const result = await logout()

      if (result.success) {
        setUser(null) // state رو بدون refresh آپدیت میکنه
        router.push('/account/login')
      }
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
      <div className="flex flex-col">
        <span className="text-sm text-gray-600">خوش آمدید</span>
        <span className="font-bold text-lg">{user.username}</span>
      </div>

      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
      >
        {isLoading ? 'در حال خروج...' : 'خروج'}
      </button>
    </div>
  )
}
