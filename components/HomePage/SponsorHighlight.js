import React, { Component } from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import { below } from '../../utilities';

const HighlightImage = styled.img`
  width: 100%;
  padding: 0 5rem;
  max-width: 40rem;
  object-fit: cover;
  height: 100%;

  ${below.large`
    display: none;
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

const FeaturedPartners = styled.div`
  display: flex;
  align-items: center;

  ${below.med`
    flex-direction: column;
  `};
`;

const PartnerTitle = styled.h3`
  width: 30rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
  margin: 0;

  ${below.med`
    width: 100%;
  `};
`;

const PartnerLogo = styled.img`
  height: 13rem;
  margin: 1rem;
  align-self: flex-end;

  ${below.med`
    align-self: auto;
  `};
`;

const TextBlock = styled.div`
  display: flex;
  align-items: center;

  ${below.med`
    flex-direction: column;
  `};
`;

const ActionButton = styled(LinkButton)`
  margin: 0 0 0 2rem;
`;

const SponsorHighlight = ({ className }) => {
  return (
    <ContentSection className={className} id="sponsors">
      <Main>
        <HighlightImage src="/images/octopus_with_flag.png" />
        <SideDetail>
          <FeaturedPartners>
            <PartnerTitle>Our Featured Camp Partners</PartnerTitle>
            <PartnerLogo
              src="https://res.cloudinary.com/that-conference/image/upload/v1572186444/partnerlogo/Northwestern_Mutual_-_Web.png"
              alt="Northwestern mutual"
            />
            <PartnerLogo
              src="https://res.cloudinary.com/that-conference/image/upload/v1572186444/partnerlogo/Cuna_-_web.png"
              alt="CUNA Mutual Group"
            />
          </FeaturedPartners>
          <p className="large-body-copy" style={{ margin: '0.5rem 0' }}>
            Interested In Partner Opportunities?
          </p>
          <TextBlock>
            <p style={{ margin: '0.5rem 0' }}>
              We partner with industry leading organizations and companies that
              are looking to connect with software developers and practitioners.
            </p>
            <ActionButton href="become-a-partner" label="Let's Partner Up" />
          </TextBlock>
        </SideDetail>
      </Main>
    </ContentSection>
  );
};

export default styled(SponsorHighlight)``;
