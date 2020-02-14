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
