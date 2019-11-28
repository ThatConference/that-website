import React from 'react';
import styled from 'styled-components';

const NumberedItem = styled.h4`
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  margin-top: 5rem;

  &.first-item {
    margin-top: 1rem;
  }
`;

const TheProcess = props => {
  return (
    <>
      <h3>The Process</h3>
      <p>
        After the submission deadline, the THAT Conference counselor submissions
        review board together with a few other people we trust will review all
        of the proposals, and select the ones that we think will make the most
        interesting mix at the conference. We aim to have all counselors
        confirmed by <strong>April 17th, 2019</strong>.
      </p>
      <NumberedItem className="first-item">01. Initial Review</NumberedItem>
      <p>
        As proposals are submitted, they are reviewed by the counselor
        coordinators for completeness. The content team will be asked to vote
        Yes, No, or Maybe for each application. They will be asked to review
        applications on the following criteria:
      </p>
      <ul>
        <li>Is this a subject that is relevant to the WCEU audience?</li>
        <li>Has the applicant created a compelling pitch?</li>
        <li>Has the applicant provided all the requested information?</li>
        <li>
          Does the applicant display good knowledge of the subject matter?
        </li>
        <li>
          Will the applicant be able to cover all of their proposed content in
          the time slot?
        </li>
      </ul>
      <NumberedItem>02. Community Voting</NumberedItem>
      <p>
        Previous attendees and people part of THAT Community take part in an
        anonymized voting process to rate their interest in every talk.{' '}
      </p>
      <NumberedItem>03. Committee Review</NumberedItem>
      <p>
        Review every submission as a group. We spend an entire weekend together
        going through submissions.{' '}
      </p>
      <NumberedItem>04. Contact Successful Candidates</NumberedItem>
      <p>
        The counselors team will contact the chosen applicants. We will do this
        before contacting people who haven’t been selected. This is because some
        applicants may no longer be able to make the event, so have the chance
        to go back to the pool of applicants and choose a suitable replacement.
      </p>
    </>
  );
};

export default TheProcess;
