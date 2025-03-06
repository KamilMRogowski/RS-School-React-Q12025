/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // Changes the build output directory to `./dist/`.
  // basePath: '/RS-School-React-Q12025', // Basepath for gh-pages deploy
  sassOptions: {
    includePaths: ['./src/styles'],
  },
};

export default nextConfig;
