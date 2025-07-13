const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.manasaspices.com',
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
  