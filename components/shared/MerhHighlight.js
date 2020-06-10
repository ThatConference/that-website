import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import LinkButton from './LinkButton';
import ContentSection from './ContentSection';
import { SlimCenteredH2 } from './StandardStyles';

import { below } from '../../utilities';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  align-items: center;

  ${below.med`
    flex-direction: column;
  `};
`;

const sharedBearStyles = css`
  height: 40rem;

  ${below.med`
    height: 20rem;
  `};
`;

const LeftBear = styled.img`
  ${sharedBearStyles};
  margin-right: 7rem;

  ${below.med`
    margin-right: 0;
    margin-bottom: 4rem;
  `};
`;

const RightBear = styled.img`
  ${sharedBearStyles}
  transform: scaleX(-1);
  margin-left: 7rem;

  ${below.med`
    margin-left: 0;
    margin-top: 4rem;
  `};
`;

const MerchHighlight = ({
  className,
  description,
  linkText,
  linkUrl,
  subtitle,
  title,
}) => {
  return (
    <ContentSection className={className}>
      <Main>
        <LeftBear src="/images/bear_pink_hoodie.png" />
        <div>
          <SlimCenteredH2>{title}</SlimCenteredH2>
          <h4>{subtitle}</h4>
          <p className="blurb">{description}</p>
          <LinkButton
            label={linkText}
            href={linkUrl}
            backgroundColor="primary"
            borderColor="white"
            color="white"
            hoverBorderColor="primary"
            hoverColor="primary"
            hoverBackgroundColor="white"
          />
        </div>
        <RightBear src="/images/bear_green_purple_tree_shirt.png" />
      </Main>
    </ContentSection>
  );
};

MerchHighlight.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

MerchHighlight.defaultProps = {
  className: '',
};

export default styled(MerchHighlight)`
  text-align: center;

  h2 {
    margin-bottom: 4rem;
  }

  h4 {
    text-transform: uppercase;

    font-size: 2.5rem;
    margin-top: 0;
  }

  p.blurb {
    max-width: 40rem;
    margin: auto;
    color: ${({ theme }) => theme.colors.darkGray};
  }

  a {
    margin-left: auto;
    margin-right: auto;
    width: 30rem;
  }
`;
