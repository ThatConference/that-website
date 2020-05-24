import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { gridRepeat } from '../../utilities';

import SocialLinks from '../shared/SocialLinks';

const Container = styled.div`
  padding: 10rem;
`;

const StyledGrid = styled(Grid)`
  grid-gap: 8rem;

  h5 {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-top: 0;
  }

  div.social-links {
    flex-wrap: wrap;
        
    a {
      width: 16rem;
      height: 16rem;
      margin: 4rem;
      margin-bottom: 0;
      border-radius 8rem;
      background-color: ${({ theme }) => theme.colors.primary};
      
    }
  }
`;

const StyledCell = styled(Cell)`
  text-align: center;
`;

const StayInTouch = ({ className }) => {
  return (
    <Container className={className}>
      <StyledGrid
        columns={gridRepeat.xsmall}
        alignContent="center"
        justifyContent="space-around"
      >
        <Cell width={1}>
          <h1>Stay in Touch</h1>
          <h5>We want to talk with YOU!</h5>
          <p>
            Donec vehicula id sapien vel dapibus. Nulla a odio diam. Nunc vel
            odio ex. Etiam dictum mollis placerat. Pellentesque vel posuere
            velit. Aliquam accumsan felis orci, a hendrerit est placerat nec.
            Nulla non magna sit amet dui vulputate rutrum sed imperdiet odio.
            Nullam id rhoncus nibh. Cras ut egestas libero.
          </p>
        </Cell>
        <StyledCell width={2}>
          <SocialLinks flexDirection="row" className="social-links" />
        </StyledCell>
      </StyledGrid>
    </Container>
  );
};

export default styled(StayInTouch)``;
