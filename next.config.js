/** @type {import('next').NextConfig} */

const { BLOG_WORD_LIMIT, TITLE_NAME, IMG_UNOPTIMIZE, NODE_ENV,
  SOCKET_URL,
  WEATHER_API_KEY,
  CALENDAR_IDS, DEFAULT_MEET_DURATION, MEET_START_HOUR, MEET_END_HOUR,
  GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env


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
    WEATHER_API_KEY,
    CALENDAR_IDS, DEFAULT_MEET_DURATION, MEET_START_HOUR, MEET_END_HOUR,
    GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI
  },
  compiler: {
    removeConsole: NODE_ENV === 'production',
  },
}

module.exports = nextConfig
