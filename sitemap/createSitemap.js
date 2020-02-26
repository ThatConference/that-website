/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* this ***only*** runs at build */
const fs = require('fs');
const glob = require('glob');

const OMIT_FILES = [
  'pages/_app.js',
  'pages/_document.js',
  'pages/_error.js',
  'pages/[memberSlug].js',
  'pages/[post].js',
  'pages/[sessionId].js',
  'pages/[slug].js',
  'pages/api/callback.js',
  'pages/api/login.js',
  'pages/api/logout.js',
  'pages/api/me.js',
  'pages/blog/[post].js',
  'pages/member/[memberSlug].js',
  'pages/member/session-edit/[sessionId].js',
  'pages/member/session-preview/[sessionId].js',
  'pages/partner/[slug].js',
  'pages/samples/sample-form.js',
  'pages/samples/toggle-page.js',
  'pages/wi/[markdown].js',
  'pages/work-in-progress.js',
];

const walkSync = details => {
  const fileObj = [];
  const filesFound = glob.sync(`${details.dir}/**/*.${details.ext}`);

  filesFound.forEach(file => {
    if (OMIT_FILES.includes(file)) return;
    const fileStat = fs.statSync(file);

    const cleanFileName = file
      .substr(0, file.lastIndexOf('.'))
      .replace('pages/', '');

    fileObj.push({
      page: `/${cleanFileName}`,
      lastModified: fileStat.mtime,
    });
  });

  return fileObj;
};

(function createSitemap() {
  console.log('creating sitemap json');
  try {
    const allStaticFiles = [
      ...walkSync({ dir: 'pages', ext: 'js' }),
      ...walkSync({ dir: 'markdown', ext: 'md' }),
    ];

    fs.writeFileSync('./sitemap/pages.json', JSON.stringify(allStaticFiles), {
      encoding: 'utf8',
      flag: 'w',
    });
  } catch (e) {
    console.log('file write error %O', e);
  }
})();
