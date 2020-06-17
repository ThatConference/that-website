import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { NextSeo } from 'next-seo';
import { below } from '../../../utilities/breakpoint';

import ContentSection from '../../../components/shared/ContentSection';
import LinkButton from '../../../components/shared/LinkButton';
import WhatToExpect from '../../../components/shared/WhatToExpect';

const PartnerH3 = styled.h3`
  margin-bottom: 2.5rem;
  margin-left: 0;
`;

// TODO: Only enable left margin when two columns.
const SasquatchCanoeImage = styled.img`
  width: 100%;
  margin-left: 5rem;
  transform: scaleX(-1);

  ${below.small`
    margin-left: 0;
    width: 90%;
  `};

  ${below.med`
    margin-top: 2rem;
  `};
`;

const SasquatchStandingImage = styled.img`
  height: 40rem;
`;

const SasquatchCloseUpCanoeImage = styled.img`
  margin-top: 5rem;
  height: 30rem;
  transform: scaleX(-1);

  ${below.large`
    height: 20rem;
  `};
`;

class ScriptInjector extends Component {
  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://thatconference.activehosted.com/f/embed.php?id=9';
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return <div className="_form_9" />;
  }
}

const becomeAPartner = () => (
  <div>
    <NextSeo
      title="Become a Partner - THAT Conference"
      description="Are you ready to speak at the biggest tech conference in the US Midwest? THAT Call for Counselors (Speakers) is open through March 1st!"
    />

    <ContentSection>
      <Grid columns="repeat(auto-fit,minmax(32rem,1fr))">
        <Cell>
          <h1 style={{ marginRight: '10rem' }}>Become a Camp Partner</h1>
        </Cell>
        <Cell>
          <p className="medium-body-copy">
            We believe that by partnering with our sponsors not only can we help
            enable your goals but it also creates a more engaging environment
            for our attendees. Engage with true practitioners, thought leaders
            and entrepreneurs while enjoying the perks of summer camp at a giant
            waterpark. Join us and become part of THAT family.
          </p>
          <LinkButton
            href="/partners"
            label="View Past Partners"
            color="thatBlue"
            borderColor="thatBlue"
            hoverBorderColor="thatBlue"
            hoverColor="white"
            hoverBackgroundColor="thatBlue"
            className="float-right"
          />
        </Cell>
      </Grid>
    </ContentSection>

    <ContentSection backgroundColor="primary" fontColor="light" hasTrees="true">
      <Grid columns="repeat(auto-fit,minmax(32rem,1fr))">
        <Cell>
          <div>
            <PartnerH3 style={{ color: 'white' }}>
              SUMMER CAMP FOR GEEKS
            </PartnerH3>
            <span className="large-body-copy">
              THAT Conference is the “Summer Camp for Geeks” that combines
              technology, networking, social events and exposure in an
              inspirational, family friendly environment at the The Kalahari
              Resort in Wisconsin Dells. Over four days, 1700 folks of diverse
              technology backgrounds and expertise levels gather to take
              advantage of multiple learning mediums to maximize one’s community
              and career advancements.
            </span>
          </div>
          <LinkButton
            href="/wi/2021/become-a-partner#more-info"
            borderColor="white"
            color="white"
            backgroundColor="primary"
            label="Get the Prospectus"
            className="float-left"
            hoverBorderColor="white"
            hoverColor="primary"
            hoverBackgroundColor="white"
          />
        </Cell>
        <Cell style={{ textAlign: 'center' }}>
          <div>
            <SasquatchCanoeImage
              src="/images/sasquatch_kayaking.png"
              alt="Becoming A THAT Partner"
            />
          </div>
        </Cell>
      </Grid>
    </ContentSection>

    <WhatToExpect />

    <ContentSection>
      <p
        className="centered-text large-body-copy"
        style={{ margin: 'auto', maxWidth: '85rem', lineHeight: 1.4 }}
      >
        Whether Your Focus Is On The Professional Or Family Side, We Look For
        Interactive Partners Who Want To Create A Unique Experience While Having
        Fun With Our Summer Camp For Geeks Theme.
      </p>
    </ContentSection>

    <ContentSection>
      <div>
        <Grid columns="repeat(auto-fit,minmax(32rem,1fr))">
          <Cell center>
            <SasquatchStandingImage
              src="/images/sassy_with_badge.svg"
              alt="Community Interaction"
            />
          </Cell>
          <Cell>
            <div style={{ maxWidth: '65rem' }}>
              <PartnerH3 className="font-dark">
                Enabling Meaningful Interaction
              </PartnerH3>
              <span className="medium-body-copy">
                We incorporate multiple networking opportunities and social
                events to enable meaningful interactions with you and attendees.
                We also streamlined the collection of contact information with
                the swipe of a badge so that you spend more time developing
                conversation and less time acquiring contact information. When
                ready we will have all scanned contact information ready for you
                at your convenience.
              </span>
            </div>
          </Cell>
        </Grid>
      </div>
    </ContentSection>

    <ContentSection backgroundColor="primary" fontColor="light" id="more-info">
      <Grid columns="repeat(auto-fit,minmax(32rem,1fr))">
        <Cell>
          <div>
            <PartnerH3 style={{ color: 'white' }}>Get The Prospectus</PartnerH3>
            <span className="small-body-copy">
              The opportunities are endless when it comes to your partnership
              goals. Let’s partner and make those goals a reality. Provide your
              contact information so we can send you our prospectus and start to
              review our wide range of sponsorship opportunities and a la carte
              options. We look forward to partnering with you at THAT
              Conference!
            </span>
          </div>
          <div className="centered-text">
            <SasquatchCloseUpCanoeImage
              src="/images/sasquatch_close_up.png"
              alt="Get THAT Prospectus"
            />
          </div>
        </Cell>
        <Cell>
          <div>
            <ScriptInjector />
          </div>
        </Cell>
      </Grid>
    </ContentSection>
  </div>
);

export default becomeAPartner;
