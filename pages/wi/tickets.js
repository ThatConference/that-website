import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import ContentSection from '../../components/shared/ContentSection';
import YouTubeVideo from '../../components/shared/YouTubeVideo';
import LinkButton from '../../components/shared/LinkButton';
import { above, below } from '../../utilities';

// Currently points to 2018 promo video
const THAT_PROMO_VIDEO_ID = 'R67gLABGvVE';

const twoColBp = 'large';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;

  ${below[twoColBp]`
    flex-direction: column;
  `};
`;

const SideDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  ${above[twoColBp]`
    margin-right: 4rem;
  `};

  ${below[twoColBp]`
    align-items: center;
  `};
`;

const HighlightText = styled.h2`
  color: ${({ theme }) => theme.colors.tertiary};
  font-size: 2.4rem;
  font-family: franklin-gothic-urw, sans-serif;
  font-weight: 400;
  text-transform: none;
  margin: 0;
`;

const Description = styled.p`
  width: 90%;
  margin: auto;
  text-align: center;
  padding: 7rem 0 0 0;
  max-width: 110rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: left;

  a {
    margin-left: 0;
    float: left;
  }

  a:not(:last-child) {
    margin-right: 2rem;
  }

  ${below[twoColBp]`
    padding-bottom: 3rem;
  `};

  ${below.small`
    flex-direction: column;
    align-items: stretch;
  `};
`;

const StyledH3 = styled.h3`
  text-align: 'center';
  padding-bottom: '2rem';
  margin-top: 0;
`;

const TicketHighlight = styled.h5`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.thatBlue};
  margin: 0;
`;

const Heavy = styled.span`
  font-weight: 600;
`;

const TicketTable = styled.table`
  min-width: 100%;
  // border-spacing: 0;
  border-collapse: collapse;

  th {
    text-transform: uppercase;
    padding: 0.5em 1em;
    text-align: left;
    background-color: ${({ theme }) => theme.colors.lightGray};
  }

  tr.odd {
    background-color: ${({ theme }) => theme.colors.mediumLightGray};
  }

  tr.highlight {
    border: 2px solid ${({ theme }) => theme.colors.tertiary};
    font-size: 1.7rem;

    .price {
      color: ${({ theme }) => theme.colors.thatBlue};
      font-weight: 700;
    }
  }

  td {
    padding: 0.5em 1em;
  }

  span.upper {
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.thatBlue};
    font-weight: 700;
  }
`;

const tickets = () => (
  <>
    <Head>
      <title key="title">Tickets - THAT Conference</title>
    </Head>
    <ContentSection>
      <Main>
        <SideDetail>
          <HighlightText>On Sale Starting April 13, 2020</HighlightText>
          <h1 style={{ marginBottom: '0.5rem' }}>Tickets</h1>
          <p className="medium-body-copy">
            THAT Conference is unlike any other technical conference. This
            unique four days of summer camp is full of workshops, sessions, open
            spaces, family events and networking all nestled in the gorgeous
            Wisconsin Dells at The Kalahari Waterpark and Resort. This family
            friendly event is comprised of professional and family tracks so
            there is something to learn and experience at all ages.
          </p>
          <ActionButtons>
            <LinkButton
              href="#camper"
              label="Camper"
              color="thatBlue"
              borderColor="thatBlue"
              className="stretch-sm"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
            <LinkButton
              href="#precon"
              label="Pre-Conference"
              color="thatBlue"
              borderColor="thatBlue"
              className="stretch-sm"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
            <LinkButton
              href="#family"
              label="Family"
              color="thatBlue"
              borderColor="thatBlue"
              className="stretch-sm"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
          </ActionButtons>
        </SideDetail>
        <YouTubeVideo
          videoId={THAT_PROMO_VIDEO_ID}
          autoplay="0"
          rel="0"
          modest="1"
          containerHeight="40rem"
          containerWidth="60rem"
        />
      </Main>
      <Description className="medium-body-copy">
        Whether you choose to interact face-to-face and learn from industry
        leaders, go hands-on in our dedicated Maker space, expand your mind
        through yoga or network in the hallways with THAT incredible community,
        you choose the avenues that best fulfill your needs. Not only is there a
        variety of learning opportunities, we take our camping seriously with
        lots of bacon, a pig roast family dinner and bonding over the campfire
        to share stories.
      </Description>
    </ContentSection>

    <ContentSection id="camper" backgroundColor="offWhite" hasTrees="true">
      <StyledH3 className="font-dark">Camper</StyledH3>
      <p className="medium-body-copy">
        As a Camper you receive 3 full days of over 200 sessions across a wide
        range of technologies, platforms and disciplines of all levels. You can
        also access over 10,000 sq. ft. of open spaces to participate in more
        intimate discussions across all topics generated by you and your fellow
        attendees. All sessions including open spaces are designed to allow you
        to build your own track to level up your skills, career and take charge
        of YOU.
        <br />
        <br />
        Each day starts with an inspiring keynote, breakfast and beverages. Then
        you’re off on your camping adventure to join in the many professional
        sessions, share your ideas and experiences in a welcoming open space,
        and/or learn how to solder in our Maker space. Lunch is served midday
        and a special social event wraps up each afternoon to encourage
        networking and continued learning.
        <br />
        <br />
        <TicketHighlight>
          The Camper ticket includes breakfast, lunch, happy hour, game night,
          waterpark party and pig roast.
        </TicketHighlight>
      </p>
      <TicketTable>
        <thead>
          <th>Price</th>
          <th>Ticket</th>
          <th>Includes</th>
          <th>Dates</th>
        </thead>
        <tbody>
          <tr className="odd highlight">
            <td className="price">$799</td>
            <td>
              <span className="upper">Everything</span> 4-day
            </td>
            <td>Most Popular! Main Event and Pre-Conference ticket combined</td>
            <td>August 3 - 6</td>
          </tr>
          <tr>
            <td className="price">$725</td>
            <td>
              <span className="upper">Camper</span> 3-day
            </td>
            <td>Main Event; NO PRECON</td>
            <td>August 4 - 6</td>
          </tr>
          <tr className="odd">
            <td className="price">$425</td>
            <td>
              <span className="upper">No-Food</span> 3-day
            </td>
            <td>
              Main Event, NO FOOD (no meals, no drinks, no pig roast), NO PRECON
            </td>
            <td>August 4 - 6</td>
          </tr>
        </tbody>
      </TicketTable>
    </ContentSection>

    <ContentSection id="precon">
      <StyledH3 className="font-dark">Pre-Conference</StyledH3>
      <p className="medium-body-copy">
        The Pre-Conference ticket is 1 full day of multi-hour hands on workshops
        the day before THAT Conference kicks off. This allows you to get deeper
        into specifics across a range of technologies and learn from industry
        leaders just as passionate about code as you are. This incredible
        opportunity enables you to work directly with professionals ready to
        share their knowledge and enthusiasm while helping you grow your career.
        This ticket includes access to all Precon sessions, power outlets and
        WIFI but you will need to bring your own laptop. Lunch will be provided.
        <br />
        <br />
        <TicketHighlight>
          For a discounted rate, purchase the Everything ticket that includes
          the Pre-Conference.
        </TicketHighlight>
      </p>
      <TicketTable>
        <thead>
          <th>Price</th>
          <th>Ticket</th>
          <th>Includes</th>
          <th>Dates</th>
        </thead>
        <tbody>
          <tr className="odd">
            <td>$99</td>
            <td>
              <span className="upper">Pre-Conference</span> 1-day
            </td>
            <td>
              This ticket includes the first day precon with lunch and drinks.
            </td>
            <td>August 3rd</td>
          </tr>
        </tbody>
      </TicketTable>
    </ContentSection>

    <ContentSection id="family">
      <StyledH3 className="font-dark">Family</StyledH3>
      <p className="medium-body-copy">
        At our core, THAT Conference is about family, community and the next
        generation of technologists. We strive to provide opportunities for
        children to speak, learn and experience many areas of the STEM field
        while interacting with industry professionals. At THAT Conference,
        families are not only welcomed, but encouraged to join us for family
        sessions.
        <br />
        <br />
        A family ticket covers attendance to all family sessions, the waterpark
        party, pig roast, game night and of course a THAT Conference t-shirt.
        <br />
        <br />
        The family ticket does not include conference meals beyond the Pig
        Roast, however many Kalahari restaurants onsite offer discounts to our
        families.{' '}
        <Heavy>
          THAT Conference families receive a 10% discount at many of the
          Kalahari Restaurants.
        </Heavy>
        <br />
        <br />
        <TicketHighlight>
          One ticket necessary per person for ages above 2 years.
        </TicketHighlight>
      </p>
      <TicketTable>
        <thead>
          <th>Price</th>
          <th>Ticket</th>
          <th>Includes</th>
          <th>Dates</th>
        </thead>
        <tbody>
          <tr className="odd">
            <td>$99</td>
            <td>
              <span className="upper">Campmate</span> (adult) 4-day
            </td>
            <td>
              Family Pre-Conference Session, Family Sessions, Waterpark Party,
              Pig Roast, Game Night and a t-shirt.
            </td>
            <td>August 3 - 6</td>
          </tr>
          <tr>
            <td>$79</td>
            <td>
              <span className="upper">Geekling</span> (child) 4-day
            </td>
            <td>
              Family Pre-Conference Session, Family Sessions, Waterpark Party,
              Pig Roast, Game Night and a t-shirt.
            </td>
            <td>August 3 - 6</td>
          </tr>
          <tr className="odd">
            <td>$49</td>
            <td>
              <span className="upper">Pig Roast Only</span>
            </td>
            <td />
            <td>Evening of August 5th</td>
          </tr>
        </tbody>
      </TicketTable>
    </ContentSection>
  </>
);

export default styled(tickets)``;
