import Router from 'next/router';

export default ({ res, url, statusCode = '302' }) => {
  if (res) {
    // ssr
    res.writeHead(statusCode, { Location: url });
    res.end();
  } else {
    // is client side.
    Router.push(url);
  }
};
