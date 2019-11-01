import React from 'react';
import getConfig from 'next/config';

import redirect from '../../lib/redirect';

const { publicRuntimeConfig } = getConfig();

const Prospectus = ({ res }) => {
  return <> </>;
};

Prospectus.getInitialProps = ({ res }) => {
  const url = publicRuntimeConfig.WI_PROSPECTUS_URL;

  return redirect({ res, url });
};

export default Prospectus;
