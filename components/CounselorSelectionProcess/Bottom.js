import React from 'react';
import styled from 'styled-components';

import { below } from '../../utilities';
import LinkButton from '../shared/LinkButton';

const Container = styled.div`
  text-align: center;
`;

const BottomText = styled.div`
  max-width: 90rem;
  margin: auto;
  text-align: center;
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
  line-height: 1.6;
  margin-top: 15rem;
  margin-bottom: 1.5rem;

  ${below.med`
    font-size: 2rem;
  `};
`;

const BottomButton = styled(LinkButton)`
  text-align: center;
  display: inline-block;
  margin-bottom: 5rem;
`;

const Bottom = ({ featureKeyword }) => {
  return (
    <Container>
      <BottomText>
        Now that you know our selection process, it’s time for you to become a
        Counselor and submit your session!
      </BottomText>
      <BottomButton
        href={`counselor-agreement?feature=${featureKeyword}`}
        borderColor="thatBlue"
        color="thatBlue"
        backgroundColor="white"
        hoverBorderColor="thatBlue"
        hoverColor="white"
        hoverBackgroundColor="thatBlue"
        label="Become a Counselor"
      />
    </Container>
  );
};

export default Bottom;
