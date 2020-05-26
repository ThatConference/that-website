import React from 'react';
import styled, { css } from 'styled-components';

import LinkButton from '../shared/LinkButton';

const Container = styled.div`
  padding: 5rem;
  text-align: center;
  height: 50rem;
`;

const sharedBearStyles = css`
  height: 40rem;
`;

const LeftBear = styled.img`
  ${sharedBearStyles}
  float: left;
`;

const RightBear = styled.img`
  ${sharedBearStyles}
  transform: scaleX(-1);
  float: right;
`;

const CenterSection = styled.div`
  display: inline-block;
  padding-top: 2rem;

  h4 {
    text-transform: uppercase;
    font-size: 2.5rem;
  }

  p.blurb {
    max-width: 40rem;
    margin: auto;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const Shop = ({ className }) => {
  return (
    <Container className={className}>
      <LeftBear src="./images/bear_pink_hoodie.png" />
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
      <RightBear src="./images/bear_green_purple_tree_shirt.png" />
    </Container>
  );
};

export default styled(Shop)``;
