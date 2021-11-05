import { AppProps } from 'next/app';
import '../styles/global.css';

// Import global styles for the entire app
export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
