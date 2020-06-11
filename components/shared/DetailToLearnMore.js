import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import ContentSection from './ContentSection';
import ThatLink from './ThatLink';
import { above, below } from '../../utilities';

const twoColBp = 'larger';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  align-items: center;

  ${below[twoColBp]`
    flex-direction: column;
  `};
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  min-width: 37rem;

  ${above[twoColBp]`
    margin-right: 4rem;
  `};

  ${below[twoColBp]`
    align-items: center;
  `};
`;

const TitleLink = styled(ThatLink)`
  ${below[twoColBp]`
    display: none;
  `};
`;

const StyledH3 = styled.h3`
  color: ${({ theme }) => theme.colors.fonts.light};
  margin: 3rem 0 0 0;
`;

const StyledH2 = styled.h2`
  color: ${({ theme }) => theme.colors.fonts.light};
  margin: 1rem 0 0 0;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
    cursor: pointer;
  }
`;

const DetailBlock = styled.div`
  padding-left: 4rem;

  &:hover {
    p,
    h4 {
      color: ${({ theme }) => theme.colors.highlight};
    }
    cursor: pointer;
  }
`;

const DetailBlockTitle = styled.h4`
  color: ${({ theme }) => theme.colors.fonts.light};
  text-transform: uppercase;
`;

const RoundImageBlock = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 20rem;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;

  ${below[twoColBp]`
    margin-top: 4rem;
  `};
`;
const HighlightImage = styled.img`
  width: 25rem;
  height: 25rem;
  position: relative;
  top: 3.5rem;
  left: -3rem;
`;

// Can hardcode for now, or hardcode query to pull next event deets we want to display
const DetailToLearnMore = ({
  blockDescription,
  blockLinkText,
  blockLinkUrl,
  blockTitle,
  className,
  largeTitle,
  showMiddleImage,
  smallTitle,
  titleLinkText,
  titleLinkUrl,
}) => {
  return (
    <ContentSection
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/group.jpg"
    >
      <Main>
        <TitleBlock>
          <StyledH3>{smallTitle}</StyledH3>
          <Link href="/" prefetch={false} passHref>
            <StyledH2>{largeTitle}</StyledH2>
          </Link>
          <TitleLink
            title={titleLinkText}
            href={titleLinkUrl}
            isLocal
            color="white"
            style={{ textAlign: 'left', paddingTop: '5rem' }}
          />
        </TitleBlock>
        {showMiddleImage && (
          <RoundImageBlock>
            <HighlightImage
              src="/images/bear-pig.png"
              loading="lazy"
              alt="Latest From THAT Blog"
            />
          </RoundImageBlock>
        )}
        <a href={blockLinkUrl} prefecth={false}>
          <DetailBlock>
            <DetailBlockTitle>{blockTitle}</DetailBlockTitle>
            <p className="font-light">{blockDescription}</p>
            <p className="float-right font-light">{blockLinkText}</p>
          </DetailBlock>
        </a>
      </Main>
    </ContentSection>
  );
};

DetailToLearnMore.propTypes = {
  blockDescription: PropTypes.string.isRequired,
  blockLinkText: PropTypes.string.isRequired,
  blockLinkUrl: PropTypes.string.isRequired,
  blockTitle: PropTypes.string.isRequired,
  className: PropTypes.string,
  largeTitle: PropTypes.string.isRequired,
  showMiddleImage: PropTypes.bool,
  smallTitle: PropTypes.string.isRequired,
  titleLinkText: PropTypes.string.isRequired,
  titleLinkUrl: PropTypes.string.isRequired,
};

DetailToLearnMore.defaultProps = {
  className: '',
  showMiddleImage: false,
};

export default styled(DetailToLearnMore)``;
