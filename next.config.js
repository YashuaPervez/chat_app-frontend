/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_API_URL: process.env.BASE_API_URL,
    SOCKET_URL: process.env.SOCKET_URL,
  },
};

module.exports = nextConfig;
