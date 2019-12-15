import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import Head from 'next/head';
import { below } from '../../utilities/breakpoint';

import ContentSection from '../../components/shared/ContentSection';
import ImageContainer from '../../components/shared/ImageContainer';
import LinkButton from '../../components/shared/LinkButton';

import { gridRepeat } from '../../utilities';

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
    <Head>
      <title key="title">Contact Us - THAT Conference</title>
    </Head>

    <ContentSection>
      <Grid columns={gridRepeat.xsmall}>
        <Cell width={2}>
          <h1 style={{ marginBottom: '0.5rem' }}>Contact Us</h1>
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
          <p>
            Anything goes! Questions, feedback, you name it we&apos;d love to
            hear it!
          </p>
          <LinkButton
            href="mailto:hello@thatconference.com"
            label="hello@thatconference.com"
          />
        </StyledImageContainer>
        <StyledImageContainer>
          <Title>Partnerships</Title>
          <p>
            Reach out with all your questions, ideas, feedback or if interested
            to become a partner.
          </p>
          <LinkButton
            href="mailto:partners@thatconference.com"
            label="partners@thatconference.com"
          />
        </StyledImageContainer>
        <StyledImageContainer>
          <Title>Slack</Title>
          <p>
            Connect with THAT Crew and THAT Community anytime through Slack!
          </p>
          <LinkButton
            href="https://thatslack.thatconference.com/"
            label="Join THAT Slack"
          />
        </StyledImageContainer>
      </Grid>
    </ContentSection>
  </>
);

export default styled(contact)``;
