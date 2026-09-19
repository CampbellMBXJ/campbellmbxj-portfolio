/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Avoid the Pages Router dev-indicator race in Next 16.3.5.
  devIndicators: false,
  agentRules: false,
};

module.exports = nextConfig;
