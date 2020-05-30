import React from 'react';
import styled, { css } from 'styled-components';

import LinkButton from '../shared/LinkButton';
import ContentSection from '../shared/ContentSection';

import { below } from '../../utilities';

const Container = styled(ContentSection)`
  text-align: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  align-items: center;

  ${below.small`
    flex-direction: column;
  `};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const sharedBearStyles = css`
  height: 40rem;

  ${below.small`
    height: 30rem;
  `};
`;

const LeftBear = styled.img`
  ${sharedBearStyles};
`;

const RightBear = styled.img`
  ${sharedBearStyles}
  transform: scaleX(-1);
`;

const CenterSection = styled(Section)`
  h4 {
    text-transform: uppercase;
    text-align: center;
    font-size: 2.5rem;
  }

  p.blurb {
    max-width: 40rem;
    margin: auto;
    color: ${({ theme }) => theme.colors.darkGray};
  }

  a {
    margin-left: auto;
    margin-right: auto;
    width: 30rem;
  }
`;

const Shop = ({ className }) => {
  return (
    <Container className={className}>
      <Main>
        <Section>
          <LeftBear src="./images/bear_pink_hoodie.png" />
        </Section>
        <CenterSection>
          <h1>Get That Gear</h1>
          <h4>That Store Has Your Favorite Merch</h4>
          <p className="blurb">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac
            hendrerit sem, at ullamcorper nunc. Donec vehicula id sapien vel
            dapibus. Nulla a odio diam.
          </p>
          <LinkButton
            label="Go to THAT Store"
            href="http://wwww.thatconference.store"
            backgroundColor="primary"
            color="white"
          />
        </CenterSection>
        <Section>
          <RightBear src="./images/bear_green_purple_tree_shirt.png" />
        </Section>
      </Main>
    </Container>
  );
};

export default styled(Shop)``;
