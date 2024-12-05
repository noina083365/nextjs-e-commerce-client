import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReduxProvider } from '@/components/provider';
import '@/styles/globals.css';

const geistSans = localFont({
	src: '../styles/fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: '../styles/fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'E-Commerce',
	description: 'E-Commerce system by Next.js',
	icons: {
		icon: '/ecommerce-favicon.ico',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
