import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import StandardBodyCopy from '../shared/StandardBodyCopy';
import LinkButton from '../shared/LinkButton';

import { below, DEFAULT_WIP_PAGE } from '../../utilities';

const HighlightImage = styled.img`
  width: 100%;
  padding: 0 5rem;
  max-width: 60rem;
  object-fit: cover;
  height: 100%;
`;

const ButtonRow = styled.div`
  display: flex;

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

  ${below.large`
    flex-direction: column;
    align-items: center;
  `};
`;

const SideDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
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
            />
            <LinkButton
              href={DEFAULT_WIP_PAGE}
              label="Kids Track"
              borderColor="thatBlue"
            />
            <LinkButton
              href={DEFAULT_WIP_PAGE}
              label="FAQ"
              borderColor="thatBlue"
            />
          </ButtonRow>
        </SideDetail>
      </Main>
    </ContentSection>
  );
};

export default styled(LearnMore)``;
