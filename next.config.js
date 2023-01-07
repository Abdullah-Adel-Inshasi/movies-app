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
    const srcPath = (subdir) => path.join(__dirname, "src", subdir);
    const getFilesAndDirectories = (source) =>
      fs
        .readdirSync(source, { withFileTypes: true })
        .map((dirent) => dirent.name);
    let absoluteImports = {};
    getFilesAndDirectories("src").forEach((fileName) => {
      const fileNameWithoutExtension = path.parse(fileName).name;
      absoluteImports[`@/${fileNameWithoutExtension}`] = srcPath(fileName);
    });
    config.resolve.alias = { ...config.resolve.alias, ...absoluteImports };
    return config;
  },
};

module.exports = nextConfig;
