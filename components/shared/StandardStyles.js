import styled from 'styled-components';
import { below } from '../../utilities';

export const StyledP = styled.p`
  padding-right: 1rem;
  margin-top: 0;
  font-weight: 200;
  line-height: 1.6;

  ${below.med`
    margin-top: 0;
  `};
`;

export const StyledPre = styled.pre`
  padding-right: 1rem;
  margin-top: 0;
  font-weight: 200;
  line-height: 1.6;
  font-size: 1.5rem;

  ${below.med`
    margin-top: 0;
  `};
`;

export const ActionButtonRow = styled.div`
  display: flex;
  justify-content: left;

  a {
    margin-left: 0;
    float: left;
  }

  a:not(:last-child) {
    margin-right: 2rem;
  }

  ${below.larger`
    padding-bottom: 3rem;
  `};

  ${below.small`
    flex-direction: column;
    align-items: stretch;
  `};
`;

export const HeroGraphicDiv = styled.div`
  min-width: 45rem;
  margin: 0;

  ${below.larger`
    display: flex;
    justify-content: center;
  `};

  ${below.med`
    min-width: unset;
    text-align: center;
  `};
`;

export const HeroGraphicImg = styled.img`
  max-height: 30rem;
  object-fit: contain;

  ${below.med`
    margin-left: 0;
  `};

  ${below.small`
    max-width: 80%;
  `};
`;

export const Placeholder = styled.div`
  background: linear-gradient(
    270deg,
    ${({ theme }) => theme.colors.lightGray},
    ${({ theme }) => theme.colors.placeholderGray}
  );
  height: ${({ height }) => height || '1.5rem'};
  width: ${({ width }) => width || '100%'};
  margin: ${({ margin }) => margin || '1rem'};
  background-size: 200% 200%;

  -webkit-animation: BackgroundAnimation 2s ease infinite;
  -moz-animation: BackgroundAnimation 2s ease infinite;
  animation: BackgroundAnimation 2s ease infinite;
`;

export const SmallerH1 = styled.h1`
  font-size: 9rem;
`;

export const ViewLink = styled.a`
  font-size: 1.4rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.thatBlue};
  fill: ${({ theme }) => theme.colors.thatBlue};

  svg {
    vertical-align: middle;
    height: 2rem;
    margin-left: 1rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
    fill: ${({ theme }) => theme.colors.highlight};
  }
`;
