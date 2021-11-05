import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

/**
 * This app reads blog posts from files on the server. getSortedPostsData()
 * could also fetch data from an external API or query a database directly.
 * Reading from the server and querying a database are possible because this
 * code runs server-side at build time (due to being called from index.js's
 * getStaticProps() function).
 *
 * getAllPostIds() (used by [id].js's getStaticPaths() function) can also
 * fetch data from any source for the same reasons.
 */

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);

	const allPostsData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, '');

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);

		// Combine the data with the id
		return {
			id,
			...(matterResult.data as { date: string; title: string }),
		};
	});

	// Sort posts by date
	return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Returns a list of file names formatted for dynamic routing
 *
 * @returns {array} [{ params: { id } }]
 */
export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map((fileName) => ({
		params: {
			id: fileName.replace(/\.md$/, ''),
		},
	}));
}

/**
 * Get the data for a specific post
 *
 * @param {string} id The name of the blog post/file
 * @returns {object} { id, title, date, contentHtml }
 */
export async function getPostData(id: string) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// Parse the metadata using gray-matter
	const matterResult = matter(fileContents);

	// Convert markdown to HTML using remark
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);

	const contentHtml = processedContent.toString();

	// Combine the data with the id
	return {
		id,
		...(matterResult.data as { date: string; title: string }),
		contentHtml,
	};
}
