import React from 'react';
import debug from 'debug';

import withAuth from '../components/with-auth';
import User from '../components/User';

const dlog = debug('that:website:authTest-hoc');

function AuthTestSSR({ user }) {
  dlog('authTest-ssr started with user %o', user);

  return (
    <User user={user}>
      <h1>Profile</h1>

      <div>
        <h3>Profile (server rendered)</h3>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </User>
  );
}

export default withAuth(AuthTestSSR);
