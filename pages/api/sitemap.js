import fs from 'fs';

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

  // Get all files of the current directory & iterate over them
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (OMIT_FILES.includes(file)) return;

    const filePath = `${dir}${file}`;
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      // Recurse one folder deeper
      const results = walkSync(`${filePath}/`);

      Object.assign(fileObj, results);
    } else {
      // Construct this file's pathname excluding the "pages" folder & its extension
      const cleanFileName = filePath
        .substr(0, filePath.lastIndexOf('.'))
        .replace('pages/', '');

      // Add this file to `fileObj`
      fileObj[cleanFileName] = {
        page: `/${cleanFileName}`,
        lastModified: fileStat.mtime,
      };
    }
  });

  return fileObj;
};

export default (req, res) => {
  const allStaticFiles = {
    ...walkSync('pages/'),
    ...walkSync('markdown/'),
  };

  res.status(200).json(allStaticFiles);
};
