import moment from 'moment';

const fs = require('fs');

const OMIT_FILES = [
  '_app.js',
  '_document.js',
  '_error.js',
  'authTest-hook.js',
  'authTest-required.js',
  'authTest-ssr.js',
  'me.js',
  'logout.js',
  'login.js',
  'callback.js',
  '[post].js',
  '[memberSlug].js',
  '[sessionId].js',
  '[slug].js',
  'sample-form.js',
  'toggle-page.js',
  '[markdown].js',
];

const walkSync = dir => {
  const fileObj = [];

  // Get all files of the current directory & iterate over them
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (OMIT_FILES.includes(file)) return;

    const filePath = `${dir}${file}`;
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      // Recurse one folder deeper
      const results = walkSync(`${filePath}/`);
      results.forEach(item => fileObj.push(item));
    } else {
      // Construct this file's pathname excluding the "pages" folder & its extension
      const cleanFileName = filePath
        .substr(0, filePath.lastIndexOf('.'))
        .replace('pages/', '');

      // Add this file to `fileObj`
      fileObj.push({
        page: `/${cleanFileName}`,
        lastModified: fileStat.mtime,
      });
    }
  });

  return fileObj;
};

const getPages = () => {
  return walkSync('pages/');
};

const getBlogPosts = () => {
  return walkSync('markdown/blog/');
};

const getPagesXml = pages => {
  const pagesXml = [];

  pages.forEach(post => {
    const formattedDate = moment(post.lastModified).format('YYYY-MM-DD');

    // Can include <priority>{float value}</priority> with URL
    // will revisit if need to, for now, just listing pages
    pagesXml.push(`
    <url>
      <loc>${`https://www.thatconference.com${post.page}`}</loc>
      <lastmod>${formattedDate}</lastmod>
    </url>`);
  });

  return {
    pagesXml: pagesXml.join(''),
  };
};

const getBlogPostsXml = blogPosts => {
  const postsXml = [];

  blogPosts.forEach(post => {
    const formattedDate = moment(post.lastModified).format('YYYY-MM-DD');

    // Can include <priority>{float value}</priority> with URL
    // will revisit if need to, for now, just listing pages
    postsXml.push(`
    <url>
      <loc>${post.page.replace(
        '/markdown',
        'https://www.thatconference.com',
      )}</loc>
      <lastmod>${formattedDate}</lastmod>
    </url>`);
  });

  return {
    postsXml: postsXml.join(''),
  };
};

const sitemapXml = ({ pages, blogPosts }) => {
  const { pagesXml } = getPagesXml(pages);
  const { postsXml } = getBlogPostsXml(blogPosts);

  return `
    <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${pagesXml}
      ${postsXml}
    </urlset>
  `;
};

const Sitemap = () => {
  return '';
};

Sitemap.getInitialProps = async ({ res }) => {
  const pages = getPages();
  const blogPosts = getBlogPosts();
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.write(sitemapXml({ pages, blogPosts }));
  res.end();
};

export default Sitemap;
