/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploads.mangadex.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },      
      {
        protocol: 'https',
        hostname: 'mangahot.jp',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
