import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  // webpack: (webpackConfig) => {
  //   webpackConfig.resolve.extensionAlias = {
  //     '.cjs': ['.cts', '.cjs'],
  //     '.js': ['.ts', '.tsx', '.js', '.jsx'],
  //     '.mjs': ['.mts', '.mjs'],
  //   }

  //   return webpackConfig
  // },
  turbopack: {}, // 👈 این خط باعث میشه خطا از بین بره
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
