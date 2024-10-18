/** @type {import('next').NextConfig} */
const nextConfig = {
   webpack: (config) => {
      config.externals.push({
         'utf-8-validate': 'commonjs utf-8-validate',
         bufferutil: 'commonjs bufferutil'
      });

      return config;
   },
   typescript: {
      ignoreBuildErrors: true,
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'utfs.io',
            port: ''
         }
      ]
   }
};

module.exports = {
   typescript: {
     // !! WARN !!
     // Dangerously allow production builds to successfully complete even if
     // your project has type errors.
     // !! WARN !!
     ignoreBuildErrors: true,
   },
 }

export default nextConfig;
