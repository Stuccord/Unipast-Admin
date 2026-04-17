/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['hzbqsvfxpkaygocjodjk.supabase.co'],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '20mb',
        },
    },
};


export default nextConfig;
