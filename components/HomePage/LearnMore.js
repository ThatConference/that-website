import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContentSection from '../shared/ContentSection';
import StandardBodyCopy from '../shared/StandardBodyCopy';
import LinkButton from '../shared/LinkButton';

import { below, DEFAULT_WIP_PAGE } from '../../utilities';

const HighlightImage = styled.img`
  padding: 0 5rem;
  max-height: 40rem;
  height: 100%;

  ${below.xlarge`
    padding: 0;
  `};

  ${below.small`
    max-height: 30rem;
  `};

  ${below.xsmall`
    max-height: 20rem;
  `};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-evenly;

  ${below.small`
    flex-direction: column;

    div {
      &:not(:last-child) {
        margin-bottom: 1.5rem;
      }
    }
  `};
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;

  ${below.xlarge`
    flex-direction: column;
    align-items: center;
  `};
`;

const SideDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;

  ${below.large`
    margin-right: 0;
  `};
`;

const LearnMore = ({ className }) => {
  return (
    <ContentSection className={className} id="learn-more">
      <Main>
        <HighlightImage src="/images/bear_with_drone.png" />
        <SideDetail>
          <StandardBodyCopy>
            An inclusive, multi-day event for anyone passionate about learning
            and sharing all things mobile, web, cloud, IoT, and technology.
            Engage in a wide range of software development topics with 150+
            sessions, massive open spaces, and culture of creating and giving
            back. And there’s bacon, water slides, and, you know what? Bring the
            whole family.
          </StandardBodyCopy>
          <ButtonRow>
            <LinkButton
              href={DEFAULT_WIP_PAGE}
              label="Professional Track"
              borderColor="thatBlue"
              className="stretch-sm"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
            <LinkButton
              href={DEFAULT_WIP_PAGE}
              label="Kids Track"
              borderColor="thatBlue"
              className="stretch-sm"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
            <LinkButton
              href="/wi/faq"
              label="FAQ"
              borderColor="thatBlue"
              className="stretch-sm"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
          </ButtonRow>
        </SideDetail>
      </Main>
    </ContentSection>
  );
};

LearnMore.propTypes = {
  className: PropTypes.string,
};
LearnMore.defaultProps = {
  className: '',
};

export default styled(LearnMore)``;
