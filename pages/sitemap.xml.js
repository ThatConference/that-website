import moment from 'moment';

const getXml = pageValues => {
  const pageName = pageValues.page.replace('/markdown', '');
  const formattedDate = moment(pageValues.lastModified).format('YYYY-MM-DD');
  return `
    <url>
      <loc>${`https://www.thatconference.com${pageName}`}</loc>
      <lastmod>${formattedDate}</lastmod>
    </url>
  `;
};

const sitemapXml = ({ pages }) => {
  return `
    <urlset
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      ${Object.entries(pages).map(page => getXml(page[1]))}
    </urlset>
  `;
};

const Sitemap = () => {
  return '';
};

Sitemap.getInitialProps = async ({ res }) => {
  const apiResponse = await fetch('/api/sitemap');
  const json = await apiResponse.json();

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.write(sitemapXml({ pages: json }));
  res.end();
};

export default Sitemap;
