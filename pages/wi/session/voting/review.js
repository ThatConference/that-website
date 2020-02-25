import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import debug from 'debug';
import ContentSection from '../../../../components/shared/ContentSection';
import Header from '../../../../components/Session/Voting/Review/Header';
import Content from '../../../../components/Session/Voting/Review/Content';

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
        title="Session Voting Review - THAT Conference"
        description="Review the sessions you have already voted on."
      />
      <ContentSection>
        <Header title="Session Voting Review" />
        <Content />
      </ContentSection>
    </>
  );
};

export default SessionVoting;
