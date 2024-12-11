import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// reactStrictMode: true, // Comment to fix nextjs send double request
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.com',
				pathname: '**',
			}
		],
	},
};

export default nextConfig;
