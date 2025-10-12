import { UserProfile } from '@/components/UserProfile'
import React from 'react'

interface SearchParams {
  [key: string]: string | undefined
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<React.ReactElement> {
  return (
    <div className="">
      <UserProfile />
    </div>
  )
}
