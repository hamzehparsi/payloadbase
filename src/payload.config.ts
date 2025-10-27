// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { fa } from '@payloadcms/translations/languages/fa'
import { en } from '@payloadcms/translations/languages/en'

import { Users } from './collections/Users/config'
import { Media } from './collections/Media'
import { Managers } from './collections/Managers/config'
import { Pages } from './collections/pages/config'
import { News } from './collections/news/config'
import { Tags } from './collections/tags/config'
import { WeeklyHadith } from './globals/WeeklyHadith'
import { LinksFooter } from './globals/LinksFooter'
import { LinksContents } from './globals/LinksContents'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Managers, Pages, News, Tags],
  editor: lexicalEditor(),
  globals: [WeeklyHadith, LinksFooter, LinksContents],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
        rtl: false,
      },
      {
        label: 'Farsi',
        code: 'fa',
        // opt-in to setting default text-alignment on Input fields to rtl (right-to-left)
        // when current locale is rtl
        rtl: true,
      },
    ],
    defaultLocale: 'en', // required
    fallback: true, // defaults to true
  },
  i18n: {
    supportedLanguages: { en, fa },
  },

  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
