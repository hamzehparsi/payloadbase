'use client'

import { useUser } from '@/contexts/UserContext'
import { useState } from 'react'
import { logout } from '@/app/(frontend)/(auth)/actions/logout'

export function UserProfile() {
  const { user, setUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  if (!user) {
    return null
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      setUser(null) // اول state رو null کن
      await logout() // بعد redirect میشه به /
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-between items-center gap-4 p-4 bg-gray-100 rounded-lg">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <div className="font-bold tracking-tighter">{user.fullname}</div>
          <span className="text-sm text-gray-600">خوش آمدید</span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="px-4 py-1 text-red-600 rounded-2xl border border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'در حال خروج...' : 'خروج'}
      </button>
    </div>
  )
}
