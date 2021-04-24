import React from 'react';

import redirect from '../../../lib/redirect';

const ThatUsTickets = () => {
  return <> </>;
};

ThatUsTickets.getInitialProps = ({ res }) => {
  const url = process.env.THAT_US_TICKETS;

  return redirect({ res, url });
};

export default ThatUsTickets;
