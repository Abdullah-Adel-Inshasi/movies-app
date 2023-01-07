/** @type {import('next').NextConfig} */
const { i18n } = require("next-i18next");
const fs = require("fs");

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
  webpack(config) {
    config.resolve.modules.push(__dirname)
    return config;
  },
};

module.exports = nextConfig;
