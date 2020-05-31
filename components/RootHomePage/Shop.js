import React from 'react';
import styled, { css } from 'styled-components';

import LinkButton from '../shared/LinkButton';
import ContentSection from '../shared/ContentSection';

import { SlimCenteredH2 } from '../shared/StandardStyles';
import { below } from '../../utilities';

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

const Shop = ({ className }) => {
  return (
    <ContentSection className={className}>
      <Main>
        <Section>
          <LeftBear src="./images/bear_pink_hoodie.png" />
        </Section>
        <div>
          <SlimCenteredH2>Get That Gear</SlimCenteredH2>
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
            borderColor="white"
            color="white"
            hoverBorderColor="primary"
            hoverColor="primary"
            hoverBackgroundColor="white"
          />
        </div>
        <Section>
          <RightBear src="./images/bear_green_purple_tree_shirt.png" />
        </Section>
      </Main>
    </ContentSection>
  );
};

export default styled(Shop)`
  text-align: center;

  h2 {
    margin-bottom: 4rem;
  }

  h4 {
    text-transform: uppercase;

    font-size: 2.5rem;
    margin-top: 0;
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
