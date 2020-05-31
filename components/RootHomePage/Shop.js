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

  ${below.med`
    flex-direction: column;
  `};
`;

const sharedBearStyles = css`
  height: 40rem;

  ${below.med`
    height: 25rem;
  `};
`;

const LeftBear = styled.img`
  ${sharedBearStyles};
  margin-right: 5rem;

  ${below.med`
    margin-right: 0;
    margin-bottom: 4rem;
  `};
`;

const RightBear = styled.img`
  ${sharedBearStyles}
  transform: scaleX(-1);
  margin-left: 5rem;

  ${below.med`
    margin-left: 0;
    margin-top: 4rem;
  `};
`;

const Shop = ({ className }) => {
  return (
    <ContentSection className={className}>
      <Main>
        <LeftBear src="./images/bear_pink_hoodie.png" />
        <div>
          <SlimCenteredH2>Get That Gear</SlimCenteredH2>
          <h4>That Store Has Your Favorite Merch</h4>
          <p className="blurb">
            Looking for a new favorite THAT T-Shirt? What about a THAT Hoodie?
            THAT Store is now open and has the latest THAT merch waiting for
            you.
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
        <RightBear src="./images/bear_green_purple_tree_shirt.png" />
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
