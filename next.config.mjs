/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // Changes the build output directory to `./dist/`.
  basePath: '/RS-School-React-Q12025', // Sets the base path for the application.
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};

export default nextConfig;
