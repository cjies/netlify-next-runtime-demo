/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // fallback to DEPLOY_PRIME_URL (default env var by Netlify) if NEXTAUTH_URL is not set
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || process.env.DEPLOY_PRIME_URL,
  },
  webpack(config) {
    // resolve .graphql or .gql files
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  }
};

export default nextConfig;
