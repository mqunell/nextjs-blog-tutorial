import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>

			<section className={utilStyles.headingMd}>
				<p>
					Hey, I'm Matt. I have some experience with standard React via Create
					React App, and now I'm learning Next.js!
				</p>

				<Link href="posts/first-post">
					<a>First Post</a>
				</Link>
			</section>
		</Layout>
	);
}
