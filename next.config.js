/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next");
const nextConfig = withPlaiceholder({
  reactStrictMode: true,
  images: {
    domains: ["bayut-production.s3.eu-central-1.amazonaws.com"],
  },
});

module.exports = nextConfig;
