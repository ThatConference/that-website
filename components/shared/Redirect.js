import React from 'react';

import redirect from '../../lib/redirect';

export default url => {
  return class extends React.Component {
    static async getInitialProps({ res }) {
      redirect({ res, url });
    }

    render() {
      return <> </>;
    }
  };
};
