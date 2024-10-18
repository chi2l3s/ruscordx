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
   eslint: {
      ignoreDuringBuilds: true
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



export default nextConfig;
