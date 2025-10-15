import React from 'react'

import './globals.css'
import LastNewsItem from '@/components/LastNewsItem'
import WeeklyHadith from '@/components/WeeklyHadith'

export default async function HomePage() {
  // const { user } = await payload.auth({ headers })

  return (
    <>
      <div>
        <WeeklyHadith />
        <LastNewsItem />
      </div>
    </>
  )
}
