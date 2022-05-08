/** @type {import('next').NextConfig} */

const { BLOG_WORD_LIMIT, TITLE_NAME, IMG_UNOPTIMIZE, SOCKET_URL, NODE_ENV, WEATHER_API_KEY } = process.env

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.nba.com', 'openweathermap.org']
  },
  env: {
    BLOG_WORD_LIMIT,
    TITLE_NAME,
    IMG_UNOPTIMIZE,
    SOCKET_URL,
    WEATHER_API_KEY
  },
  compiler: {
    removeConsole: NODE_ENV === 'production',
  },
}

module.exports = nextConfig
