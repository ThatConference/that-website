/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

export async function fetchUser(cookie = '') {
  if (typeof window !== 'undefined' && window.__user) {
    return window.__user;
  }

  const res = await fetch(
    '/api/me',
    cookie
      ? {
          headers: {
            cookie,
          },
        }
      : {},
  );

  if (!res.ok) {
    delete window.__user;
    return null;
  }

  const json = await res.json();
  if (typeof window !== 'undefined') {
    window.__user = json;
  }
  return json;
}

export function useFetchUser({ required } = {}) {
  const [loading, setLoading] = useState(
    () => !(typeof window !== 'undefined' && window.__user),
  );
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.__user || null;
  });

  useEffect(
    () => {
      if (!loading && user) {
        return;
      }
      setLoading(true);
      let isMounted = true;

      fetchUser().then(u => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !u) {
            window.location.href = '/api/login';
            return;
          }
          setUser(u);
          setLoading(false);
        }
      });

      // eslint-disable-next-line consistent-return
      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return { user, loading };
}
