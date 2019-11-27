import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import { below, DEFAULT_WIP_PAGE } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import LinkButton from '../../components/shared/LinkButton';
import Icon from '../../components/shared/Icon';

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

const BackLink = styled.a`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.thatBlue};
  osition: absolute;
  float: left;
  top: 0;
  margin-top: 5rem;

  svg {
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
  span {
    margin-left: 0.5rem;
  }

  ${below.med`
    margin-top:0;
    margin-left: -25px;
  `};
`;

const BackArrow = styled(Icon)`
  fill: ${({ theme }) => theme.colors.thatBlue};
`;

const Title = styled.h1`
  font-weight: 100;
  font-size: 8.5rem;
  margin-bottom: 0;
`;

const TopParagraph = styled.p`
  font-size: 2rem;
  margin-bottom: 8rem;
`;

const NumberedItem = styled.h4`
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  margin-top: 5rem;

  &.first-item {
    margin-top: 1rem;
  }
`;

const BottomText = styled.div`
  max-width: 90rem;
  margin: auto;
  text-align: center;
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
  line-height: 1.6;
  margin-top: 15rem;
  margin-bottom: 1.5rem;

  ${below.med`
    font-size: 2rem;
  `};
`;

const BottomButton = styled(LinkButton)`
  text-align: center;
  display: inline-block;
  margin-bottom: 5rem;
`;

const CallForSpeakers = props => {
  return (
    <div>
      <Head>
        <title key="title">Counselor Selection Process - THAT Conference</title>
      </Head>
      <ContentSection>
        <MainGrid columns={6}>
          <Cell width={1}>
            <BackLink href="call-for-counselors">
              <BackArrow
                icon="backArrow"
                height="25px"
                width="25px"
                viewBoxHeight="100"
                viewBoxWidth="100"
              />
              <span>Back to Call for Counselors</span>
            </BackLink>
          </Cell>
          <Cell width={4}>
            <Title>Counselor Selection Process</Title>
            <TopParagraph>
              Selecting the best counselors for THAT Conference is a long and
              difficult process, as we receive so many inspiring abstracts from
              truly impassioned people. When reviewing potential counselors and
              session abstracts, we remove all information about the counselor
              (name, bio, email, etc.) while reviewing the proposals, to avoid
              any subconscious bias. We always strive for a good mix of
              counselors, and we want to encourage everyone to submit a
              proposal.
            </TopParagraph>
            <h3>The Process</h3>
            <p>
              After the submission deadline, the THAT Conference counselor
              submissions review board together with a few other people we trust
              will review all of the proposals, and select the ones that we
              think will make the most interesting mix at the conference. We aim
              to have all counselors confirmed by{' '}
              <strong>April 17th, 2019</strong>.
            </p>
            <NumberedItem className="first-item">
              01. Initial Review
            </NumberedItem>
            <p>
              As proposals are submitted, they are reviewed by the counselor
              coordinators for completeness. The content team will be asked to
              vote Yes, No, or Maybe for each application. They will be asked to
              review applications on the following criteria:
            </p>
            <ul>
              <li>Is this a subject that is relevant to the WCEU audience?</li>
              <li>Has the applicant created a compelling pitch?</li>
              <li>Has the applicant provided all the requested information?</li>
              <li>
                Does the applicant display good knowledge of the subject matter?
              </li>
              <li>
                Will the applicant be able to cover all of their proposed
                content in the time slot?
              </li>
            </ul>
            <NumberedItem>02. Community Voting</NumberedItem>
            <p>
              Previous attendees and people part of THAT Community take part in
              an anonymized voting process to rate their interest in every talk.{' '}
            </p>
            <NumberedItem>03. Committee Review</NumberedItem>
            <p>
              Review every submission as a group. We spend an entire weekend
              together going through submissions.{' '}
            </p>
            <NumberedItem>04. Contact Successful Candidates</NumberedItem>
            <p>
              The counselors team will contact the chosen applicants. We will do
              this before contacting people who haven’t been selected. This is
              because some applicants may no longer be able to make the event,
              so have the chance to go back to the pool of applicants and choose
              a suitable replacement.
            </p>
            <BottomText>
              Now that you know our selection process. It’s time for you to
              become a counselor and submit your session submission!
            </BottomText>
            <BottomButton
              href={`/${DEFAULT_WIP_PAGE}`}
              borderColor="thatBlue"
              color="thatBlue"
              backgroundColor="white"
              label="Become a counselor"
            />
          </Cell>
          <Cell width={1} />
        </MainGrid>
      </ContentSection>
    </div>
  );
};

export default CallForSpeakers;
