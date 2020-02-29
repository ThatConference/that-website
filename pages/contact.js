import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { NextSeo } from 'next-seo';
import { below } from '../utilities/breakpoint';

import ContentSection from '../components/shared/ContentSection';
import ImageContainer from '../components/shared/ImageContainer';
import LinkButton from '../components/shared/LinkButton';

import { gridRepeat } from '../utilities';

const StyledImageContainer = styled(ImageContainer)`
  padding: 2.5rem;
  margin: 2rem;
`;

const ImageCell = styled(Cell)`
  ${below.med`
    text-align: center;
  `};
`;

const Title = styled.h4`
  margin-top: 0;
  margin-bottom: 0.4rem;
`;

const HighlightImage = styled.img`
  max-height: 30rem;
  transform: scaleX(-1);
  position: absolute;
  top: 0;
  margin-left: 6rem;

  ${below.small`
    margin-left: 0;
    height: 28rem;
  `};

  ${below.med`
    position: relative;
    margin-top: 2rem;
  `};
`;

const contact = () => (
  <>
    <NextSeo
      title="Contact Us - THAT Conference"
      description="Need to get in touch with us? Have a question you need to ask? Have an idea you want to share? Well, we are all over this Internet thing, so pick your favorite medium and give us a shout!"
    />

    <ContentSection>
      <Grid columns={gridRepeat.xsmall}>
        <Cell width={2}>
          <h1>Contact Us</h1>
          <p className="medium-body-copy">
            Need to get in touch with us? Have a question you need to ask? Have
            an idea you want to share? Well, we are all over this Internet
            thing, so pick your favorite medium and give us a shout!
          </p>
        </Cell>
        <ImageCell>
          <HighlightImage src="/images/octopus_with_flag.png" />
        </ImageCell>
      </Grid>
    </ContentSection>

    <ContentSection>
      <Grid columns={gridRepeat.xsmall} alignContent="center">
        <StyledImageContainer>
          <Title>General Inquiries</Title>
          <p style={{ flexGrow: '2' }}>
            Anything goes! Questions, feedback, you name it we&apos;d love to
            hear it!
          </p>
          <LinkButton
            href="mailto:hello@thatconference.com"
            label="hello@thatconference.com"
            borderColor="thatBlue"
            color="thatBlue"
            hoverBorderColor="thatBlue"
            hoverColor="white"
            hoverBackgroundColor="thatBlue"
          />
        </StyledImageContainer>
        <StyledImageContainer>
          <Title>Partnerships</Title>
          <p>
            Reach out with all your questions, ideas, feedback or interested to
            learn more in partnering with THAT!
          </p>
          <LinkButton
            href="mailto:partners@thatconference.com"
            label="partners@thatconference.com"
            borderColor="thatBlue"
            color="thatBlue"
            hoverBorderColor="thatBlue"
            hoverColor="white"
            hoverBackgroundColor="thatBlue"
          />
        </StyledImageContainer>
        <StyledImageContainer>
          <Title>Slack</Title>
          <p style={{ flexGrow: '2' }}>
            Connect with THAT Crew and THAT Community anytime through Slack!
          </p>
          <LinkButton
            href="https://thatslack.thatconference.com/"
            label="Join THAT Slack"
            borderColor="thatBlue"
            color="thatBlue"
            hoverBorderColor="thatBlue"
            hoverColor="white"
            hoverBackgroundColor="thatBlue"
          />
        </StyledImageContainer>
      </Grid>
    </ContentSection>
  </>
);

export default styled(contact)``;
