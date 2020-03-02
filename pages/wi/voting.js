import React from 'react';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import _ from 'lodash';
import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import Title from '../../components/shared/Title';
import ThatLink from '../../components/shared/ThatLink';
import LinkButton from '../../components/shared/LinkButton';

const MainGrid = styled(Grid)`
  grid-gap: 2.5rem;

  ${below.med`
    display: block;
    grid-gap: 0;
    margin-top: -5rem;
  `};

  h3 {
    font-weight: 100;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding-inline-start: 2rem;
  }

  ul li::before {
    content: '\\2022';
    color: red;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

const MainContent = styled(ContentSection)`
  padding-top: 0;

  ${below.med`
    padding-top: 3rem;
  `};
`;

const GetStartedDetail = styled.div`
  display: flex;
  flex-direction: row;

  ${below.med`
    flex-direction: column;
  `};
`;

const HighlightImage = styled.img`
  max-height: 34rem;
  transform: scaleX(-1);
  left: 6rem;
  margin-top: 4rem;
  position: relative;
  margin-left: -4rem;

  ${below.small`
    margin-left: 0;
    width: 90%;
  `};

  ${below.med`
    position: relative;
    object-fit: contain;
    left: 0;
  `};
`;

const Notes = styled.div`
  h4 {
    margin-bottom: 0;
  }
`;

const VotingStart = ({ user, loading }) => {
  const getStartedHref = () => {
    if (!loading) {
      if (_.isEmpty(user)) return '/api/login?redirect-url=/member/create';
      if (!user.profileComplete) return '/member/create';
    }
    return '/wi/voting/vote';
  };

  const getHelpText = () => {
    if (!loading) {
      if (_.isEmpty(user)) {
        return (
          <>
            To get started you will need to{' '}
            <strong>
              <ThatLink
                title="sign in and create your THAT Profile"
                href="/api/login?redirect-url=/member/create"
              />
            </strong>
            .
            <br />
          </>
        );
      }

      if (!user.profileComplete) {
        return (
          <>
            To get started,{' '}
            <strong>
              <ThatLink
                title="complete your THAT Profile"
                href="/member/create"
              />
            </strong>
            .
            <br />
          </>
        );
      }
    }
    return '';
  };

  const getButtonText = () => {
    if (!loading) {
      if (_.isEmpty(user)) return 'Sign In To Get Started';
      if (!user.profileComplete) return 'Create Profile To Get Started';
    }
    return 'Get Started';
  };

  return (
    <div>
      <NextSeo
        title="Session Voting Process - THAT Conference"
        description="Make THAT Conference your conference by letting us know what session you want to see. This page is the introduction to voting."
      />

      <MainContent>
        <MainGrid columns={6}>
          <Cell width={1} />
          <Cell width={4}>
            <Title>Let's Get Started</Title>
            <GetStartedDetail>
              <div>
                <p className="medium-body-copy">
                  **** NEED VOTING BLURB **** We’re stoked to hear you’re
                  interested in speaking at THAT Conference! Being a counselor
                  is more than just showing up, giving a talk, and heading back
                  home. We’re looking for people not only to speak, but attend,
                  collaborate, and contribute to the event while they are there.
                  We’d also love for you to be a part of THAT Community
                  year-round! You should be passionate about the topic(s) you’re
                  submitting and excited to have conversations about your talk
                  beyond the scheduled timeslot.
                </p>
                <p>{getHelpText()}</p>
                <Notes>
                  <h4>Things to Keep in Mind</h4>
                  <ul>
                    <li>Vote "Thumbs Up" for sessions you would attend.</li>
                    <li>
                      Vote "Thumbs Down" for sessions you would not attend.
                    </li>
                    <li>
                      You will be given a random order of sessions each time the
                      page is loaded.
                    </li>
                    {/* <li>
                Speaker names have been obfuscated in an effort to keep the
                voting process as unbiased as possible. There may be situations
                our algorithms do not catch, this is in no way an endorsement or
                an attempt to manipulate the voting process.
              </li> */}
                    <li>
                      You can use the 'N' key for a thumbs down or no vote and
                      the 'Y' key for a thumbs up or yes vote.
                    </li>
                    <li>
                      You can{' '}
                      <strong>
                        <ThatLink
                          title="review your votes"
                          href="/wi/voting/review"
                        />
                      </strong>{' '}
                      for more info on sharing your awesome.
                    </li>
                  </ul>
                </Notes>
                <LinkButton
                  label={getButtonText()}
                  href={getStartedHref()}
                  color="thatBlue"
                  borderColor="thatBlue"
                  hoverBorderColor="thatBlue"
                  hoverColor="white"
                  hoverBackgroundColor="thatBlue"
                />
              </div>
              <HighlightImage src="/images/bear-eyelashes.png" />
            </GetStartedDetail>
          </Cell>
          <Cell width={1} />
        </MainGrid>
      </MainContent>
    </div>
  );
};

export default VotingStart;
