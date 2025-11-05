// src/components/OccasionBanner.tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import OccasionBannerClient from './OccasionBannerClient'

export type Banner = {
  id: string
  title: string
  image: {
    url: string
    alt?: string
  }
  link?: string
}

async function getActiveBanner(): Promise<Banner | null> {
  try {
    const payload = await getPayload({ config: await configPromise })
    const now = new Date()

    const result = await payload.find({
      collection: 'occasion-banners',
      where: {
        and: [
          {
            isActive: {
              equals: true,
            },
          },
          {
            startDate: {
              less_than_equal: now.toISOString(),
            },
          },
          {
            endDate: {
              greater_than: now.toISOString(),
            },
          },
        ],
      },
      sort: '-order',
      limit: 1,
    })

    if (result.docs && result.docs.length > 0) {
      const banner = result.docs[0]
      const imageUrl =
        typeof banner.image === 'object' && banner.image?.url ? banner.image.url : null

      // اگر URL تصویر نداشت، بنر رو نشون نده
      if (!imageUrl) {
        return null
      }

      return {
        id: banner.id,
        title: banner.title,
        image: {
          url: imageUrl,
          alt: banner.title,
        },
        link: banner.link || undefined,
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching active banner:', error)
    return null
  }
}

export default async function OccasionBanner() {
  const banner = await getActiveBanner()

  if (!banner) return null

  return <OccasionBannerClient banner={banner} />
}
