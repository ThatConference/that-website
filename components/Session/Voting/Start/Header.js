import React from 'react';
import styled from 'styled-components';
import LinkButton from '../../../shared/LinkButton';
import Title from '../../../shared/Title';
import LoadingIndicator from '../../../shared/LoadingIndicator';
import { below } from '../../../../utilities/breakpoint';
import ThatLink from '../../../shared/ThatLink';

const _ = require('lodash');

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

const Header = ({ user, loading }) => {
  if (loading) {
    return <LoadingIndicator />;
  }

  const getStartedHref = () => {
    if (!loading) {
      if (_.isEmpty(user)) {
        return '/api/login?redirect-url=/member/create';
      }

      if (!user.profileComplete) {
        return '/member/create';
      }
    }
    return '/wi/session/voting/vote';
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
      if (_.isEmpty(user)) {
        return 'Sign In To Get Started';
      }

      if (!user.profileComplete) {
        return 'Create Profile To Get Started';
      }
    }
    return 'Get Started';
  };

  return (
    <>
      <Title>Let's Get Started</Title>
      <GetStartedDetail>
        <div>
          <p className="medium-body-copy">
            **** NEED VOTING BLURB **** We’re stoked to hear you’re interested
            in speaking at THAT Conference! Being a counselor is more than just
            showing up, giving a talk, and heading back home. We’re looking for
            people not only to speak, but attend, collaborate, and contribute to
            the event while they are there. We’d also love for you to be a part
            of THAT Community year-round! You should be passionate about the
            topic(s) you’re submitting and excited to have conversations about
            your talk beyond the scheduled timeslot.
          </p>
          <p>{getHelpText()}</p>
          <Notes>
            <h4>Things to Keep in Mind</h4>
            <ul>
              <li>Vote "Thumbs Up" for sessions you would attend.</li>
              <li>Vote "Thumbs Down" for sessions you would not attend.</li>
              <li>
                You will be given a random order of sessions each time the page
                is loaded.
              </li>
              {/* <li>
                Speaker names have been obfuscated in an effort to keep the
                voting process as unbiased as possible. There may be situations
                our algorithms do not catch, this is in no way an endorsement or
                an attempt to manipulate the voting process.
              </li> */}
              <li>
                You can use the 'N' key for a thumbs down or no vote and the 'Y'
                key for a thumbs up or yes vote.
              </li>
              <li>
                You can{' '}
                <strong>
                  <ThatLink
                    title="review your votes"
                    href="/wi/session/voting/vote"
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
    </>
  );
};

export default Header;
