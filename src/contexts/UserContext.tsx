'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Manager } from '@/payload-types'

interface UserContextType {
  user: Manager | null
  setUser: (user: Manager | null) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode
  initialUser: Manager | null
}) {
  const [user, setUser] = useState<Manager | null>(initialUser)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>{children}</UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
