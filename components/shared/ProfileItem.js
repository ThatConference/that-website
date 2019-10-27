import React from 'react';
import styled from 'styled-components';
import RoundImage from './RoundImage';

import { below } from '../../utilities';

const Name = styled.p`
  font-weight: 600;
  font-size: 2rem;
  padding-bottom: 0.5rem;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1.6rem;
`;

const Company = styled.p``;

const ProfileItem = ({ className, imageUrl, size, name, title, company }) => {
  return (
    <div className={className}>
      <RoundImage imageUrl={imageUrl} size={size} />
      <Name>{name}</Name>
      <Title>{title}</Title>
      <Company>{company}</Company>
    </div>
  );
};

export default styled(ProfileItem)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  position: relative;

  p {
    margin: 0;
    line-height: 1.3;
  }

  img {
    margin-bottom: 2.3rem;
  }
`;
