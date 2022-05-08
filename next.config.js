/** @type {import('next').NextConfig} */

const { BLOG_WORD_LIMIT, TITLE_NAME, IMG_UNOPTIMIZE, SOCKET_URL } = process.env

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.nba.com']
  },
  env: {
    BLOG_WORD_LIMIT,
    TITLE_NAME,
    IMG_UNOPTIMIZE,
    SOCKET_URL
  }
}

module.exports = nextConfig
