/* eslint-disable consistent-return */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import debug from 'debug';
import auth0 from '../lib/auth0';

const dlog = debug('that:website:components:with-auth');

export default function withAuth(InnerComponent) {
  return class Authenticated extends Component {
    static async getInitialProps({ req, res }) {
      /*
        right now this is only pulling info from the auth0 session
        it doesn't include the true me
      */

      const session = await auth0.getSession(req);

      if (!session || !session.user) {
        dlog('no user, redirecting to login');
        res.writeHead(302, {
          Location: `/api/login?redirect-url=${req.url}`,
        });
        res.end();
        return;
      }

      return { user: session };
    }

    constructor(props) {
      super(props);
    }

    render() {
      const { user } = this.props;
      return (
        <div>
          <InnerComponent {...this.props} user={user} />
        </div>
      );
    }
  };
}
