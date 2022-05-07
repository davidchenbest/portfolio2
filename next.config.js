/** @type {import('next').NextConfig} */

const { BLOG_WORD_LIMIT, TITLE_NAME } = process.env

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.nba.com']
  },
  env: {
    BLOG_WORD_LIMIT,
    TITLE_NAME
  }
}

module.exports = nextConfig
