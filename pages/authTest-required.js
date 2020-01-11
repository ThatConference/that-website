import React from 'react';
import debug from 'debug';

import User from '../components/User';
import { useRequireAuth } from '../hooks/requireAuth';

const dlog = debug('that:website:pages:authTest-useRequired');

function AuthRequired() {
  const { user, loading } = useRequireAuth('/authTest-required');

  if (loading) {
    return <>loading</>;
  }

  dlog('authTest auth %o', user);
  return <User user={user} loading={loading} />;
}

export default AuthRequired;
