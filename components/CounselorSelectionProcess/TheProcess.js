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

const TheProcess = () => {
  return (
    <>
      <h3>The Process</h3>
      <p>
        After the submission deadline, THAT Staff, together with a few other
        people we trust, will review all submissions and select the ones that
        think will make the most interesting mix at THAT Conference. We aim to
        to have all Counselors notified of the acceptance of their talks by
        April 17, 2020.
      </p>
      <NumberedItem className="first-item">01. Initial Review</NumberedItem>
      <p>
        As proposals are submitted, they are reviewed by THAT Staff for
        completeness. THAT Staff will then vote Yes, No, or Maybe for each
        application. They will review applications on the following criteria:
      </p>
      <ul>
        <li>
          Is this a subject that is relevant to the THAT Conference audience?
        </li>
        <li>Has the applicant provided all the requested information?</li>
        <li>
          Does the applicant display good knowledge of the subject matter?
        </li>
        <li>
          Will the applicant be able to cover all of their proposed content in
          the time slot alloted?
        </li>
      </ul>
      <NumberedItem>02. Community Voting</NumberedItem>
      <p>
        Previous conference attendees and those in THAT Community take part in
        an anonymized voting process to rate their interest in every talk.
      </p>
      <NumberedItem>03. Committee Review</NumberedItem>
      <p>
        THAT Staff spends an entire weekend together going through submissions.
      </p>
      <NumberedItem>04. Contact Successful Candidates</NumberedItem>
      <p>
        The Counselors team will contact the applicants chosen to speak. We do
        this before contacting people who haven’t been selected. This is because
        some applicants may no longer be able to make the event, so we have the
        chance to go back to the pool of applicants and choose a suitable
        replacement.
      </p>
    </>
  );
};

export default TheProcess;
