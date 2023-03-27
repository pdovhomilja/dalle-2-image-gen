/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "links.papareact.com",
      "ai-image-blob.fra1.digitaloceanspaces.com",
    ],
  },
};

module.exports = nextConfig;
