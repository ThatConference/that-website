import React from 'react';
import styled from 'styled-components';
import RoundImage from './RoundImage';

const Name = styled.p`
  font-weight: 600;
  padding-bottom: 0.5rem;
  font-size: ${({ fontSize }) => fontSize};
`;

const Title = styled.p`
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize};
`;

const Company = styled.p`
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize};
`;

const ProfileItem = ({
  className,
  imageUrl,
  size,
  name,
  title,
  company,
  nameFontSize,
  showAccentLine,
}) => {
  const baseFontSize = nameFontSize || '2';

  return (
    <div className={className}>
      <RoundImage imageUrl={imageUrl} size={size} showAccentLine={showAccentLine}/>
      <Name fontSize={baseFontSize}>{name}</Name>
      <Title fontSize={baseFontSize - 0.2}>{title}</Title>
      <Company fontSize={baseFontSize - 0.2}>{company}</Company>
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
    object-fit: cover;
  }
`;
