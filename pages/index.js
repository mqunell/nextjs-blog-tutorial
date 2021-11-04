import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

/**
 * Static Generation (SSG):
 * getStaticProps() runs at build time and only on the server. It can only be
 * exported from a page file, because React needs the data before the page is
 * rendered.
 *
 * Server-side Rendering (SSR) would use getServerSideProps(context).
 * Client-side Rendering (CSR) would use a Next.js React hook called SWR.
 */
export async function getStaticProps() {
	const allPostsData = getSortedPostsData();

	return { props: { allPostsData } };
}

export default function Home({ allPostsData }) {
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
			</section>

			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
