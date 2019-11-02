import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import NewsletterSignUpForm from '../shared/NewsletterSignupForm';
import { below } from '../../utilities';

const HighlightImage = styled.img`
  width: 100%;
  padding: 0 5rem;
  max-width: 60rem;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  object-fit: cover;
  height: 100%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${below.large`
    flex-direction: column;
    align-items: center;
  `};
`;

const SideDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  width: 30vw;
`;

const NewsletterSignUp = ({ className }) => {
  return (
    <ContentSection className={className} id="newsletter-signup">
      <Main>
        <SideDetail>
          <NewsletterSignUpForm title="Join our community, sign up for our newsletter" />
        </SideDetail>
        <HighlightImage src="/images/bear_with_megaphone.png" />
      </Main>
    </ContentSection>
  );
};

export default styled(NewsletterSignUp)``;
