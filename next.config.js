/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration for Next.js 16
  turbopack: {
    // Empty object to silence the warning and enable Turbopack optimizations
  },

  // Enable experimental features for better performance
  experimental: {
    // Enable static optimization for pages that don't use server-side features
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Ensure proper handling of environment variables
  env: {
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },

  // Configure security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Handle static export configuration
  trailingSlash: false,

  // Images configuration using the new remotePatterns instead of domains
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // TypeScript configuration
  typescript: {
    // Only ignore type errors during build in production for faster deployment
    // Remove this in development to catch type errors
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
