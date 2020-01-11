import React from 'react';

import { UserProvider } from '../hooks/user';

const User = ({ user, loading = false, children }) => (
  <UserProvider value={{ user, loading }}>
    <>{children}</>
  </UserProvider>
);

export default User;
