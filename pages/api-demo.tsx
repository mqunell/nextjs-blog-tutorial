import useSWR, { SWRResponse } from 'swr';
import Layout from '../components/layout';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ApiDemo() {
	const { data, error } = useSWR('/api/hello', fetcher);

	// Determine the output to display based on useSWR results
	const getFetchText = () => {
		if (error) return 'Failed to load';
		if (!data) return 'Loading...';
		return data.text;
	};

	return (
		<Layout>
			<h1>CSR Demo</h1>
			<p>The `useSWR` hook fetches data from `api/hello`:</p>
			<p>{getFetchText()}</p>
		</Layout>
	);
}
