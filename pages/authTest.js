import React from 'react';
import { useFetchUser } from '../lib/user';

function Home() {
  const { user, loading } = useFetchUser();

  return (
    <>
      <h3>auth</h3>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in{' '}
            <i>Profile</i> and <i>Logout</i>
          </p>
        </>
      )}

      {user && (
        <>
          <h4>Rendered user info on the client</h4>
          <img src={user.picture} alt="this is yo face" />
          <p>nickname: {user.nickname}</p>
          <p>name: {user.name}</p>
        </>
      )}
    </>
  );
}

export default Home;
