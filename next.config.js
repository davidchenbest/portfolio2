/** @type {import('next').NextConfig} */

const { BLOG_WORD_LIMIT } = process.env

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com']
  },
  env: {
    BLOG_WORD_LIMIT
  }
}

module.exports = nextConfig
