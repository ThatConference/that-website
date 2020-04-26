import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
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
  slug,
  nameFontSize,
  showAccentLine,
}) => {
  const baseFontSize = nameFontSize || '2';
  const titleFontSize = baseFontSize - 0.2;
  const companyFontSize = baseFontSize - 0.3;

  return (
    <div className={className}>
      <Link href="/memeber/[slug]" as={`/member/${slug}`} prefetch={false}>
        <RoundImage
          imageUrl={imageUrl}
          size={size}
          showAccentLine={showAccentLine}
        />
      </Link>
      <Link href="/memeber/[slug]" as={`/member/${slug}`} prefetch={false}>
        <Name fontSize={`${baseFontSize}em`}>{name}</Name>
      </Link>
      <Title fontSize={`${titleFontSize}em`}>{title}</Title>
      <Company fontSize={`${companyFontSize}em`}>{company}</Company>
    </div>
  );
};

export default styled(ProfileItem)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  position: relative;
  text-align: center;
  margin-bottom: 2em;

  p {
    margin: 0;
    line-height: 1.3;
  }

  img {
    margin-bottom: 2.3rem;
    object-fit: cover;
  }
`;
