/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
    ignoreDuringBuilds: true,
},
loader: "custom",
output: 'export',
};

export default nextConfig;
