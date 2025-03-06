/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // Changes the build output directory to `./dist/`.
  // basePath: '/RS-School-React-Q12025', // Set basepath for gh-pages deploy
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};

export default nextConfig;
