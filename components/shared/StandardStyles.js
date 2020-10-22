import styled from 'styled-components';
import { below } from '../../utilities';

/** * BEGIN: Page elements shared in layouts ** */
export const StyledPage = styled.div`
  background: ${({ theme }) => theme.colors.backgroundColor};
  color: ${({ theme }) => theme.colors.black};
`;

export const CorePage = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-gap: 0;
`;

export const PageDiv = styled.div`
  position: ${({ mobileMenuOpen }) => (mobileMenuOpen ? 'fixed' : 'relative')};
  display: flex;
  flex-direction: column;
`;

export const InnerPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;
/** * END: Page elements shared in layouts ** */

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
  height: auto;

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
  display: flex;
  justify-content: center;

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

export const ShowMore = styled.p`
  flex-grow: 2;
  font-size: 1.4rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.thatBlue};
  margin-top: 0;
  text-align: right;

  &:hover {
    cursor: pointer;
    filter: brightness(10%);
    fill: ${({ theme }) => theme.colors.highlight};
  }
`;

export const SmallerH1 = styled.h1`
  font-size: 9rem;
`;

export const SlimCenteredH2 = styled.h2`
  margin-top: 1.5rem;
  text-align: center;
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

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
