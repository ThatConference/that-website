import React from 'react';
import styled from 'styled-components';

const Agreement = props => {
  return (
    <>
      <h3>What THAT Conference Provides</h3>
      <ul>
        <li>
          Two nights of hotel stay at the Kalahari, up to three nights if two of
          your talks are chosen.
        </li>
        <li>
          A full ticket, including pre-conference, to the conference including
          pre-conference lunch, breakfast & lunch during the conference, and the
          pig roast party.
        </li>
        <li>
          Geekling/Campmate tickets for one additional adult and up to two
          children for access to family track events and the pig roast party.
          Other meals are not included.
        </li>
        <li>
          Some sessions will be recorded by our partner, Pluralsight, which
          gives you excellent visibility into a network of training materials
          for people to discover.
        </li>
      </ul>
      <p style={{ marginTop: '6rem' }}>
        THAT Conference is a community-driven not for profit endeavor. We know
        that some conferences cover travel costs and hotel stays the entirety of
        the event. We hope that you understand that it’s not possible for us to
        do so while keeping ticket prices low and accessible for others.
      </p>
    </>
  );
};

export default Agreement;
