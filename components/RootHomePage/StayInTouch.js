import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { gridRepeat, below } from '../../utilities';
import ContentSection from '../shared/ContentSection';

import SocialLinks from '../shared/SocialLinks';

const StyledGrid = styled(Grid)`
  grid-gap: 8rem;

  ${below.small`
      grid-gap: 0;
      text-align: center;
  `};
`;

const StyledCell = styled(Cell)`
  text-align: center;
`;

const StayInTouch = ({ className }) => {
  return (
    <ContentSection className={className}>
      <StyledGrid
        columns={gridRepeat.xsmall}
        alignContent="center"
        justifyContent="space-around"
      >
        <Cell width={1}>
          <h2>Stay in Touch</h2>
          <h5>We want to talk with YOU!</h5>
          <p>
            Show us your awesome, stay in touch, ask questions, be supported...
            you name it THAT is here for you! Checkout all the platforms we are
            on and what you can find there from THAT. Reach out anytime, we love
            hearing from THAT Community!
          </p>
        </Cell>
        <StyledCell width={2}>
          <SocialLinks
            flexDirection="row"
            includeDescription
            className="social-links"
            size="14rem"
          />
        </StyledCell>
      </StyledGrid>
    </ContentSection>
  );
};

export default styled(StayInTouch)`
  h2 {
    margin: 3rem 0;
  }

  h5 {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }

  div.social-links {
    flex-wrap: wrap;

    div.social-block {
      margin: 0 4rem 2rem;
    }

    p.social-description {
      line-height: 1.6;
    }

    a {
      margin-bottom: 0;
      background-color: ${({ theme }) => theme.colors.primary};

      &:hover {
        background-color: ${({ theme }) => theme.colors.highlight};
      }

      ${below.small`
        width: 8rem;
        height: 8rem;
      `};
    }
  }
`;
