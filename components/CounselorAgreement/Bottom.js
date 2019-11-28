import React from 'react';
import styled from 'styled-components';

import { below, DEFAULT_WIP_PAGE } from '../../utilities';
import LinkButton from '../shared/LinkButton';

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

const Bottom = props => {
  return (
    <>
      <BottomText>
        Now that you know our selection process. It’s time for you to become a
        counselor and submit your session submission!
      </BottomText>
      <BottomButton
        href={`/${DEFAULT_WIP_PAGE}`}
        borderColor="thatBlue"
        color="thatBlue"
        backgroundColor="white"
        label="Become a counselor"
      />
    </>
  );
};

export default Bottom;
