import React from 'react';

import redirect from '../../lib/redirect';

const Prospectus = ({ res }) => {
  return <> </>;
};

Prospectus.getInitialProps = ({ res }) => {
  const url = process.env.WI_PROSPECTUS_URL;

  return redirect({ res, url });
};

export default Prospectus;
