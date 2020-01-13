/* eslint-disable import/prefer-default-export */
import debug from 'debug';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFetchUser } from './user';

const dlog = debug('that:website:hooks:requireAuth');

export function useRequireAuth(redirectUrl = '/') {
  dlog('use require auth called %o', redirectUrl);

  const ufu = useFetchUser();
  const router = useRouter();

  dlog('useRequireAuth user is %o', ufu.user);

  useEffect(() => {
    if (!ufu.loading && !ufu.user) {
      dlog('redirecting to login...');
      router
        .push(`/api/login?redirect-url=${redirectUrl}`)
        .then(() => window.scrollTo(0, 0));
    }
  });

  return ufu;
}
