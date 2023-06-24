/** @type {import('next').NextConfig} */

const { BLOG_WORD_LIMIT, TITLE_NAME, IMG_UNOPTIMIZE, NODE_ENV,
  SOCKET_URL,
  WEATHER_API_KEY,
  CALENDAR_IDS, DEFAULT_MEET_DURATION, MEET_START_HOUR, MEET_END_HOUR, TIMEZONE,
  GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI,
  SPOTIFY_CLIENT_ID } = process.env


const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.nba.com', 'openweathermap.org',
      'i.scdn.co', 'mosaic.scdn.co', 'thisis-images.scdn.co', 'seeded-session-images.scdn.co'],
    unoptimized: true,
  },
  env: {
    BLOG_WORD_LIMIT,
    TITLE_NAME,
    IMG_UNOPTIMIZE,
    SOCKET_URL,
    WEATHER_API_KEY,
    CALENDAR_IDS, DEFAULT_MEET_DURATION, MEET_START_HOUR, MEET_END_HOUR, TIMEZONE,
    GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI,
    SPOTIFY_CLIENT_ID
  },
  compiler: {
    removeConsole: NODE_ENV === 'production',
  },
}

module.exports = nextConfig
