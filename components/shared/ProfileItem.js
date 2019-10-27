import React from 'react';
import styled from 'styled-components';
import RoundImage from './RoundImage';

import { below } from '../../utilities';

const Name = styled.p``;

const Title = styled.p``;

const Company = styled.p``;

const ProfileItem = ({ className, imageUrl, size }) => {
  return (
    <div className={className}>
      <RoundImage imageUrl={imageUrl} size={size} />
      <Name>Jaimee Newberry</Name>
      <Title>Co-founder</Title>
      <Company>Picture This Clothing</Company>
    </div>
  );
};

export default styled(ProfileItem)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  position: relative;

  p {
    margin: 0;
    line-height: 1.3;
  }

  img {
    margin-bottom: 2.3rem;
  }
`;
