import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import debug from 'debug';
import ContentSection from '../../../../components/shared/ContentSection';
import Header from '../../../../components/Session/Voting/Vote/Header';
import Content from '../../../../components/Session/Voting/Vote/Content';

const _ = require('lodash');

const dlog = debug('that:session:create');

const SessionVoting = ({ user, loading: loadingUser }) => {
  dlog('session voting');

  const router = useRouter();

  useEffect(() => {
    if (!loadingUser) {
      if (_.isEmpty(user)) {
        router.push('/api/login?redirect-url=/member/create');
      }

      if (!user.profileComplete) {
        router.push('/member/create').then(() => window.scrollTo(0, 0));
      }
    }
  });

  return (
    <>
      <NextSeo
        title="Session Voting - THAT Conference"
        description="Make THAT Conference your conference by letting us know what session you want to see."
      />
      <ContentSection>
        <Header title="Session Voting" />
        <Content />
      </ContentSection>
    </>
  );
};

export default SessionVoting;
