import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReduxProvider } from '@/components/provider';
import { SidebarProvider } from '@/contexts/SidebarContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{pageProps.title || `E-Commerce`}</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/ecommerce-favicon.ico" />
			</Head>

			<ReduxProvider>
				<SidebarProvider>
					<Component {...pageProps} />
				</SidebarProvider>
			</ReduxProvider>
		</>
	);
}