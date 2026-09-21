/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/**": ["./prisma/dev.db", "./prisma/schema.prisma"],
  },
};

export default nextConfig;