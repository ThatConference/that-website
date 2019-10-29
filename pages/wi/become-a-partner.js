import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import Head from 'next/head';

import ContentSection from '../../components/shared/ContentSection';
import ActionButton from '../../components/shared/LinkButton';
import WhatToExpect from '../../components/shared/WhatToExpect';

const PartnerH3 = styled.h3`
  margin-bottom: 25px;
  margin-left: 0;
`;

const SasquatchCanoeImage = styled.img`
  width: 100%;
  margin-left: 50px;
`;

const GetTheProspectusButton = styled(ActionButton)`
  margin-left: 0;
`;

const SasquatchStandingImage = styled.img`
  height: 500px;
`;

const SasquatchCloseUpCanoeImage = styled.img`
  margin-top: 50px;
  height: 400px;
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

const becomeAPartner = props => (
  <div>
    <Head>
      <title key="title">Become a Partner - THAT Conference</title>
    </Head>

    <ContentSection>
      <Grid columns={12}>
        <Cell width={6}>
          <h1 style={{ marginTop: 0, marginRight: '100px' }}>
            Become a Camp Partner
          </h1>
        </Cell>
        <Cell width={6}>
          <p className="medium-body-copy">
            We believe that by partnering with our sponsors not only can we help
            enable your goals but it also creates a more engaging environment
            for our attendees. Engage with true practitioners, thought leaders
            and entrepreneurs while enjoying the perks of summer camp at a giant
            waterpark. Join us and become part of THAT family.
          </p>
        </Cell>
      </Grid>
    </ContentSection>

    <ContentSection backgroundColor="primary" fontColor="light" hasTrees="true">
      <Grid columns={12}>
        <Cell width={6}>
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
          <div>
            {/* This will jump to prospectus for below */}
            <GetTheProspectusButton
              href="/wi/become-a-partner#more-info"
              borderColor="white"
              color="white"
              backgroundColor="primary"
              label="Get the Prospectus"
              className="float-left"
            />
          </div>
        </Cell>
        {/* This seems smelly? */}
        <Cell style={{ textAlign: 'center' }} width={6}>
          <div>
            <SasquatchCanoeImage src="/images/sasquatch_kayaking.png" />
          </div>
        </Cell>
      </Grid>
    </ContentSection>

    <WhatToExpect />

    <ContentSection>
      <p
        className="centered-text large-body-copy"
        style={{ margin: 'auto', maxWidth: '850px', lineHeight: 1.4 }}
      >
        Whether Your Focus Is On The Professional Or Family Side, We Look For
        Interactive Partners Who Want To Create A Unique Experience While Having
        Fun With Our Summer Camp For Geeks Theme.
      </p>
    </ContentSection>

    <ContentSection>
      <div style={{ marginBottom: '70px' }}>
        <Grid columns={12}>
          <Cell width={6} className="centered-text">
            <SasquatchStandingImage src="/images/sasquatch_with_badge.png" />
          </Cell>
          <Cell width={6}>
            <div style={{ maxWidth: '650px' }}>
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
      <Grid columns={12}>
        <Cell width={6}>
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
            <SasquatchCloseUpCanoeImage src="/images/sasquatch_close_up.png" />
          </div>
        </Cell>
        <Cell width={6}>
          <div style={{ paddingLeft: '40px' }}>
            <h4
              className="font-light"
              style={{ marginBottom: 0, marginTop: '60px', marginLeft: '20px' }}
            >
              WE NEED A LITTLE INFO FIRST
            </h4>
            <ScriptInjector />
          </div>
        </Cell>
      </Grid>
    </ContentSection>
  </div>
);

export default becomeAPartner;
