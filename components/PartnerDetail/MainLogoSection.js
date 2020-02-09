import React from 'react';
import styled from 'styled-components';
import Imgix from 'react-imgix';
import _ from 'lodash';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import PartnerLogoWithInfo from '../shared/PartnerLogoWithInfo';
import PartnerDetailSubHeading from './PartnerDetailSubHeading';
import { below, gridRepeat } from '../../utilities';

const LogoMemberSection = styled.div`
  display: flex;
  flex-direction: row;

  ${below.med`
    flex-direction: column;
  `};
`;

const Name = styled.p`
  font-family: franklin-gothic-urw, sans-serif;
  line-height: 1;
  color: ${({ theme }) => theme.colors.fonts.dark};
  margin-bottom: 0.25rem;
  font-weight: 500;
  margin-top: 0;
`;

const Title = styled.p`
  font-size: 1.2rem;
  line-height: 1.2;
  padding-right: 3rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
  font-weight: 400;
  margin: 0;
`;

const SayHiDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  ${below.med`
    padding-top: 4rem;
    max-width: 70%;
    margin: auto;
  `};
`;

const Member = styled(Cell)`
  display: flex;
  flex-direction: row;
`;

const MemberDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  justify-content: center;
`;

const renderMember = member => {
  return (
    <Member key={member.id}>
      <Imgix
        src={member.profileImage}
        width={60}
        height={60}
        imgixParams={{ mask: 'ellipse', fit: 'facearea', facepad: 4 }}
      />
      <MemberDetail>
        <Name>{`${member.firstName} ${member.lastName}`}</Name>
        <Title>{member.jobTitle}</Title>
      </MemberDetail>
    </Member>
  );
};

const MainLogoSection = ({ partner }) => {
  let { members } = partner;
  if (members && members.length && members.length > 0) {
    members = _.chain(members)
      .filter(m => m.isSponsoredFeatured)
      .orderBy(members, ['partnerFeaturedOrder', 'asc'])
      .value();
  }

  return (
    <ContentSection backgroundColor="lightGray">
      <LogoMemberSection>
        <PartnerLogoWithInfo partner={partner} />
        {!_.isEmpty(partner.members) && (
          <SayHiDetail>
            <PartnerDetailSubHeading>
              Who to Say Hi to During THAT Conference
            </PartnerDetailSubHeading>
            <Grid columns={gridRepeat.xsmall}>
              {members.map(member => {
                return renderMember(member);
              })}
            </Grid>
          </SayHiDetail>
        )}
      </LogoMemberSection>
    </ContentSection>
  );
};

export default MainLogoSection;
