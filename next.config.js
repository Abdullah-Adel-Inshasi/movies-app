/** @type {import('next').NextConfig} */
const { i18n } = require("next-i18next");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;
