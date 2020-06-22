import React from 'react';
import styled from 'styled-components';
import RoundImage from './RoundImage';

const Name = styled.p`
  font-weight: 600;
  padding-bottom: 0.5rem;
  font-size: ${({ fontSize }) => fontSize};
  text-align: center;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize};
  text-align: center;
`;

const Company = styled.p`
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize};
  text-align: center;
`;

const ProfileLink = styled.a`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const ProfileItem = ({
  className,
  company,
  imageUrl,
  name,
  nameFontSize,
  profileSlug,
  showAccentLine,
  size,
  title,
}) => {
  const baseFontSize = nameFontSize || '2';

  return (
    <div className={className}>
      <ProfileLink href={`/member/${profileSlug}`} prefetch={false}>
        <RoundImage
          imageUrl={imageUrl}
          size={size}
          showAccentLine={showAccentLine}
        />
        <Name fontSize={baseFontSize}>{name}</Name>
        <Title fontSize={baseFontSize - 0.4}>{title}</Title>
        <Company fontSize={baseFontSize - 0.4}>{company}</Company>
      </ProfileLink>
    </div>
  );
};

export default styled(ProfileItem)`
  padding: 0 2rem;
  position: relative;

  p {
    margin: 0;
    line-height: 1.3;
  }

  img {
    margin-bottom: 1rem;
    object-fit: cover;
  }

  &:hover {
    p {
      color: ${({ theme }) => theme.colors.highlight};
    }
    cursor: pointer;
  }
`;
