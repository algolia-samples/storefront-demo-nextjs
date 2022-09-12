const withTM = require('next-transpile-modules')([
  '@algolia/ui-components-horizontal-slider-react',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['d28i4xct2kl5lp.cloudfront.net', 'tailwindui.com'],
  },
};

module.exports = withTM(nextConfig);
