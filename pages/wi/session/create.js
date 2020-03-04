import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import debug from 'debug';
import { useRouter } from 'next/router';
import ContentSection from '../../../components/shared/ContentSection';
import Header from '../../../components/Session/Submit/Header';
import Intro from '../../../components/Session/Submit/Intro';
import Details from '../../../components/Session/Submit/Details';
import AdditionalInfo from '../../../components/Session/Submit/AdditionalInfo';
import Lastly from '../../../components/Session/Submit/Lastly';
import Preview from '../../../components/Session/Submit/Preview';
import User from '../../../components/User';
import { useFetchUser } from '../../../hooks/user';

const dlog = debug('that:session:create');

const SessionCreate = () => {
  dlog('create session');
  const router = useRouter();
  const { user, loading: loadingUser } = useFetchUser();

  const [stepNumber, setStepNumber] = useState(0);
  const [session, setSession] = useState({
    status: 'DRAFT',
  });

  if (!user.acceptedCommitments) {
    router.push('/wi/counselor-agreement').then(() => window.scrollTo(0, 0));
  }

  return (
    <User user={user} loading={loadingUser}>
      <NextSeo
        title="Create Submission - THAT Conference"
        description="Create for your submission for THAT Conference."
        noindex
      />
      <ContentSection forForm>
        {stepNumber === 0 && (
          <>
            <Header title="Session Introduction" currentStep="0" />
            <Intro
              session={session}
              setSession={setSession}
              setStepNumber={() => setStepNumber(stepNumber + 1)}
            />
          </>
        )}

        {stepNumber === 1 && (
          <>
            <Header title="Session Details" currentStep="1" />
            <Details
              session={session}
              setSession={setSession}
              setStepNumber={() => setStepNumber(stepNumber + 1)}
              formCancel={() => setStepNumber(stepNumber - 1)}
            />
          </>
        )}

        {stepNumber === 2 && (
          <>
            <Header title="Additional Info" currentStep="2" />
            <AdditionalInfo
              session={session}
              setSession={setSession}
              setStepNumber={() => setStepNumber(stepNumber + 1)}
              formCancel={() => setStepNumber(stepNumber - 1)}
            />
          </>
        )}

        {stepNumber === 3 && (
          <>
            <Header title="Lastly" currentStep="3" />
            <Lastly
              session={session}
              setSession={setSession}
              setStepNumber={() => setStepNumber(stepNumber + 1)}
              formCancel={() => setStepNumber(stepNumber - 1)}
            />
          </>
        )}

        {stepNumber === 4 && (
          <>
            <Header title="Preview" currentStep="4" />
            <Preview
              session={session}
              setSession={setSession}
              setStepNumber={() => setStepNumber(stepNumber + 1)}
              formCancel={() => setStepNumber(stepNumber - 1)}
            />
          </>
        )}
      </ContentSection>
    </User>
  );
};

SessionCreate.secure = true;

export default SessionCreate;
