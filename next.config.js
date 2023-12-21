const path = require("path");
const { use } = require("react");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};
const withNextIntl = require("next-intl/plugin")();

const svgrRules = {
  test: /\.svg$/,
  use: [
    {
      loader: "@svgr/webpack",
      options: {
        icon: true,
      },
    },
  ],
};

module.exports = withNextIntl({
  ...nextConfig,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config) {
    config.module.rules.push(svgrRules);
    return config;
  },
});
