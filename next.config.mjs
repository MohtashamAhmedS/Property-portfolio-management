/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [70, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ihhyrprisdwkwukivxfm.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig;
