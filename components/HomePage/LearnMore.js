import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import StandardBodyCopy from '../shared/StandardBodyCopy';
import ActionButton from '../shared/LinkButton';

import { below } from '../../utilities';

const HighlightImage = styled.img`
  width: 100%;
  padding: 0 5rem;
`;

const ButtonRow = styled.div`
  display: flex;
`;

const LearnMore = ({ className }) => {
  return (
    <div className={className}>
      <ContentSection>
        <Grid columns={12}>
          <Cell width={6}>
            <HighlightImage src="/images/bear_with_drone.png" />
          </Cell>

          <Cell width={6}>
            <StandardBodyCopy>
              An inclusive, multi-day event for anyone passionate about learning
              and sharing all things mobile, web, cloud, IoT, and technology.
              Engage in a wide range of software development topics with 150+
              sessions, massive open spaces, and culture of creating and giving
              back. And there’s bacon, water slides, and, you know what? Bring
              the whole family.
            </StandardBodyCopy>
            <ButtonRow>
              <ActionButton
                href="/"
                label="Join Our Mailing List"
                borderColor="thatBlue"
              />
              <ActionButton
                href="/"
                label="Join Our Mailing List"
                borderColor="thatBlue"
              />
              <ActionButton
                href="/"
                label="Join Our Mailing List"
                borderColor="thatBlue"
              />
            </ButtonRow>
          </Cell>
        </Grid>
      </ContentSection>
    </div>
  );
};

export default styled(LearnMore)``;
