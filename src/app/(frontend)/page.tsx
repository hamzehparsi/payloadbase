import React from 'react'

import './globals.css'
import LastNewsItem from '@/components/LastNewsItem'
import WeeklyHadith from '@/components/WeeklyHadith'
import LastLearningItem from '@/components/LastLearningItem'

export default async function HomePage() {
  return (
    <>
      <div>
        <WeeklyHadith />
        <LastNewsItem />
        <LastLearningItem />
      </div>
    </>
  )
}
