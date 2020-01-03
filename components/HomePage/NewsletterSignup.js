import React from 'react';
import styled from 'styled-components';
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

  ${below.large`
    max-height: 22rem;
    object-fit: contain;
    margin-top: 1.5rem;
  `};
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

  ${below.large`
    width: 70vw;
    align-self: flex-start;
  `};

  ${below.small`
    width: 90%;
    align-self: flex-start;
  `};
`;

const NewsletterSignUp = ({ className }) => {
  return (
    <ContentSection className={className} id="newsletter-signup">
      <Main>
        <SideDetail>
          <NewsletterSignUpForm
            headerType="h3"
            title="Join our community<br/>sign up for our newsletter"
            subtitle="Sign up for secrets, poetry, theories on black holes, and other important conference info, dates and inspiration."
          />
        </SideDetail>
        <HighlightImage src="/images/bear_with_megaphone.png" loading="lazy" />
      </Main>
    </ContentSection>
  );
};

export default styled(NewsletterSignUp)``;
