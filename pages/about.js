import React from 'react';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import ContentSection from '../components/shared/ContentSection';
import { below, above } from '../utilities';

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

  ${above[twoColBp]`
    margin-right: 4rem;
  `};

  ${below[twoColBp]`
    align-items: center;
  `};
`;

const HighlightImage = styled.img`
  max-width: 100%;
  object-fit: contain;
  min-width: 47rem;

  ${above.small`
    max-width: 58rem;
  `};

  ${below[twoColBp]`
    margin-left: auto;
    margin-right: auto;
    min-width: 30rem;
  `};

  ${above[twoColBp]`
    width: 90%;
  `};
`;

const SectionHeading = styled.h3`
  margin-bottom: 0;
  margin-top: 7rem;
`;

const about = () => (
  <>
    <NextSeo
      title="About - THAT Conference"
      description="Our goal with THAT is to bridge the gap between professionals and businesses, beginner and experienced technologists, all while shining a light on the importance of family and caring for your whole self."
    />

    <ContentSection>
      <Main>
        <SideDetail>
          <h1>About THAT</h1>
          <p>
            At THAT, technology is the theme that brings us all together. It's
            the common connection that links our community of professionals,
            families and businesses. Our goal with THAT is to bridge the gap
            between professionals and businesses, beginner and experienced
            technologists, all while shining a light on the importance of family
            and caring for your whole self.
            <br />
            <br />
            When we set out on this journey our vision was to build not just a
            conference but a platform that would keep the conversations,
            relationships and learning happening 365 days a year. For us the
            conference is the reunion.
          </p>
        </SideDetail>
        <HighlightImage
          src="images/THAT-2019-crew.jpg"
          alt="THAT Crew - 2019"
        />
      </Main>

      <SectionHeading>Our Story</SectionHeading>
      <p>
        THAT Conference was conceived from a vision different than most others
        at the time. Our goal was focused on disrupting the tech community in
        all ways. To create a space where all felt welcome and supported
        regardless of color, gender, age or experience. To build a
        family-friendly environment that worked to lift everyone up. Because of
        that, our story is a bit different than most.
      </p>

      <p>
        Created and built by a small team of volunteers, we had our first event
        in August 2012, with a total of 400 people. We now welcome nearly 2000
        attendees. What started as a $90,000 event has turned into an almost
        million dollar event with multi-year contracts.
      </p>

      <SectionHeading>THAT Conference</SectionHeading>
      <p>
        THAT Conference ("Summer Camp for Geeks") is a multi-day,
        community-driven, family friendly, polyglot tech conference with session
        offerings for all ages and experience levels. Our flagship event in
        Wisconsin Dells takes over the Kalahari for 4 straight days. Kicking off
        with a full day of hands on workshops, followed with 3 days of 1 hour
        sessions, open spaces, social events, hands-on activities for our
        campers, campmates and of course our geeklings of all ages and levels.
      </p>

      <SectionHeading>Where We Are Headed</SectionHeading>
      <p>
        We think of our role as a vanguard in the community. Working to promote
        a behavior, and build a platform that adds value every day. We set out
        to build not just a conference but a platform that would keep the
        conversations, relationships and learning happening 365 days a year. For
        us the conference is the reunion. It's the one time each year we all get
        together to reconnect, build a deeper supportive network, share ideas
        and be filled with inspiration.
      </p>

      <p>
        When we started, everyone told us doing a conference was silly. Doing it
        in the Midwest was pointless, as you have to be on the coasts; that’s
        where all the tech really happens. People said that we were emphatically
        crazy. It didn't phase us. We know the power is in people themselves and
        bringing people together face-to-face. As it gives a much more in-depth,
        quality, high-fidelity conversation that we all need. We focus the
        sessions on the things you can’t get from searching Google. You want to
        hear somebody’s story, their experience, their perspective. You want the
        session to be the catalyst for a conversation, not a very small slice of
        ‘I learned a new thing’. That is where growth happens and people are
        lifted up, and we are making that happen year round.
      </p>
    </ContentSection>
  </>
);

export default styled(about)``;
