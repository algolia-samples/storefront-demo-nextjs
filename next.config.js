/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      'd28i4xct2kl5lp.cloudfront.net',
      'tailwindui.com',
      'cdn-demo.algolia.com',
      'res.cloudinary.com',
    ],
  },
};

module.exports = nextConfig;
