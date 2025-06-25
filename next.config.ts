import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig

/*
Key Differences
TypeScript version benefits:

Type safety - Get autocomplete and error checking for configuration options
Better IDE support - IntelliSense shows available configuration properties
Import/Export syntax - Uses modern ES modules instead of CommonJS

What is next.config and its significance?
The next.config file is the central configuration hub for your Next.js application. Here's why it's crucial:
Core Functions
Build Configuration

Controls how Next.js builds and bundles your application
Defines optimization settings, webpack modifications, and build behavior

Runtime Behavior

Sets up redirects, rewrites, and headers
Configures API routes and middleware behavior

Feature Flags

Enables/disables experimental features
Controls React modes and development settings

Your Current Configuration Breakdown
reactStrictMode: true

Enables React's Strict Mode for better development experience
Helps identify unsafe lifecycles, legacy API usage, and side effects
Only affects development mode

experimental.appDir: true

Enables the new App Router (this is now stable in Next.js 13.4+)
You can remove this line if using Next.js 13.4 or later

images.remotePatterns

Configures which external domains can serve images through next/image
Your '**' wildcard allows images from any HTTPS domain
Important for security and performance optimization

Common Additional Configurations
typescriptconst nextConfig: NextConfig = {
  // Your existing config...
  
  // Environment variables
  env: {
    CUSTOM_KEY: 'value',
  },
  
  // Custom webpack configuration
  webpack: (config) => {
    // Modify webpack config
    return config
  },
  
  // Redirects and rewrites
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ]
  },
  
  // Output configuration
  output: 'standalone', // For Docker deployments
  
  // Base path for deployment
  basePath: '/my-app',
  
  // Asset prefix for CDN
  assetPrefix: 'https://cdn.example.com',
}
Impact on Your Codebase
Development Experience

Faster builds with proper optimization settings
Better debugging with React Strict Mode
Type safety prevents configuration errors

Production Performance

Image optimization settings affect loading speed
Build optimizations reduce bundle size
Proper configuration improves Core Web Vitals

Deployment

Controls how your app behaves in different environments
Affects static generation, server-side rendering, and API behavior

The next.config file essentially shapes your entire Next.js application's behavior, making it one of the most important files in your project for both development and production performance.
*/
