import React from 'react'

interface SearchParams {
  [key: string]: string | undefined
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<React.ReactElement> {
  return <div className="h-[100vh] w-full mx-auto sm:max-w-sm text-center">dashboard page</div>
}
