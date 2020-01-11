import React, { useEffect } from 'react';
import debug from 'debug';
import _ from 'lodash';

import { useRouter } from 'next/router';
import { useFetchUser } from '../hooks/user';
import User from '../components/User';

const dlog = debug('that:website:pages:authTest-useAuth');

function AuthHook() {
  dlog('authTest started');

  const router = useRouter();
  const { user, loading } = useFetchUser();

  useEffect(() => {
    if (!loading && _.isEmpty(user)) {
      dlog('redirecting to login...');
      router.push(`/api/login?redirect-url=/authTest-hook`);
    }
  });

  return (
    <User user={user} loading={loading}>
      <h1>Profile</h1>

      {loading && <p>Loading profile...</p>}

      {!loading && !_.isEmpty(user) && (
        <>
          <p>Profile:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </User>
  );
}

export default AuthHook;
