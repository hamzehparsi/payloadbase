import React from 'react'

import './globals.css'
import LastNewsItem from '@/components/LastNewsItem'
import WeeklyHadith from '@/components/WeeklyHadith'
import LastLearningItem from '@/components/LastLearningItem'
import LatestLearningFront from '@/components/LatestLearningFront'
import LastHashtag from '@/components/LastHashtag'
import Footer from '@/components/Footer'

export default async function HomePage() {
  return (
    <>
      <div>
        <WeeklyHadith />
        <LastNewsItem />
        <LastLearningItem />
        <LatestLearningFront />
        <LastHashtag />
      </div>
    </>
  )
}
