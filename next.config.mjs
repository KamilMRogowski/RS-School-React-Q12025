/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  basePath: '/RS-School-React-Q12025', // Sets the base path for the application.
  sassOptions: {
    includePaths: ['./src/styles'],
  },
};

export default nextConfig;
