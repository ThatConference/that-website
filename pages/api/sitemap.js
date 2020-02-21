import fs from 'fs';
import debug from 'debug';
import * as Sentry from '@sentry/browser';

const dlog = debug('that:api:sitemap');

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
  const fileObj = {};
  dlog('sitemap walk sync', process.env.PROJECT_ROOT, dir);

  console.log('sitemap walk sync', __dirname, dir);

  console.log('__dirname', __dirname);
  const filesDirname = fs.readdirSync(__dirname);
  console.log('filesDirname', filesDirname);

  console.log('process.env.PROJECT_ROOT', process.env.PROJECT_ROOT);
  const filesRoot = fs.readdirSync(process.env.PROJECT_ROOT);
  console.log('filesRoot', filesRoot);

  try {
    console.log('reading the things... ', `${process.env.PROJECT_ROOT}/${dir}`);
    // Get all files of the current directory & iterate over them
    const files = fs.readdirSync(__dirname);
    // const files = fs.readdirSync(`${process.env.PROJECT_ROOT}/${dir}`);
    console.log('files', files);

    files.forEach(file => {
      if (OMIT_FILES.includes(file)) return;

      const filePath = `${__dirname}/${dir}/${file}`;
      dlog('filepath', filePath);
      console.log('filepath', filePath);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        // Recurse one folder deeper
        const results = walkSync(`${filePath}/`);

        Object.assign(fileObj, results);
      } else {
        // Construct this file's pathname excluding the "pages" folder & its extension
        const cleanFileName = file
          .substr(0, file.lastIndexOf('.'))
          .replace('pages/', '');

        // Add this file to `fileObj`
        fileObj[cleanFileName] = {
          page: `/${cleanFileName}`,
          lastModified: fileStat.mtime,
        };
      }
    });
  } catch (error) {
    console.log('error - walk sync', error);
    dlog('walksync errored: %o', error);
    Sentry.captureException(error);
  }

  return fileObj;
};

export default (req, res) => {
  const allStaticFiles = {
    ...walkSync('pages'),
    ...walkSync('markdown'),
  };

  res.status(200).json(allStaticFiles);
};
