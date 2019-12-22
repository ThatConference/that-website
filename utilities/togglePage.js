import React from 'react';
import Error from '../pages/_error';

export default WrappedComponent =>
  class extends React.Component {
    static async getInitialProps({ query: { feature } }) {
      if (feature === process.env.FEATURE_KEYWORD) {
        return { featureKeyword: feature };
      }
      return { statusCode: 404 };
    }

    render() {
      const { statusCode } = this.props;
      if (statusCode) {
        return <Error statusCode={statusCode} />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
