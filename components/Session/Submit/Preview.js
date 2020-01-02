import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import parse from 'html-react-parser';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';

import { sessionConstants, below } from '../../../utilities';

const Subheading = styled.p`
  margin-top: 0;
  line-height: 2rem;
`;

const MainGrid = styled(Grid)`
  grid-gap: 10rem;
  row-gap: 0;
  ${below.small`
    display: block;
  `};
`;

const Content = styled(Cell)`
  h3 {
    font-weight: 100;
    margin-bottom: 1rem;
  }
`;

const Ads = styled(Cell)`
  div {
    line-height: 1.3;
  }

  div.header {
    font-weight: bold;
  }

  div.value {
    margin-bottom: 1rem;
  }

  ${below.small`
    margin-top: 1rem;
  `};
`;

const Description = styled.div`
  margin-bottom: 4rem;
`;

const DetailsHeader = styled.div`
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 0;
`;

const ItemsGrid = styled(Grid)`
  row-gap: 0;
  margin-bottom: 3rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const MarkdownContainer = styled.div`
  p {
    margin-top: 0;
  }
`;

const MarkdownIt = require('markdown-it');

const converter = new MarkdownIt();

const GET_SESSION = gql`
  query getSessionById($sessionId: ID!) {
    sessions {
      me {
        session(id: $sessionId) {
          id
          type
          category
          status
          title
          shortDescription
          longDescription
          primaryCategory
          secondaryCategory
          targetAudience
          supportingArtifacts {
            name
            url
          }
          prerequisites
          agenda
          takeaways
          canRecord
          mentorship
          whyAreYou
          otherComments
        }
      }
    }
  }
`;

const Preview = ({ session: reduxSession }) => {
  // eslint-disable-next-line no-console
  console.log(`Redux Session: ${JSON.stringify(reduxSession)}`);
  const { loading, error, data } = useQuery(GET_SESSION, {
    variables: { sessionId: 'y2m8tbKHFQT7uRrRazYY' },
  });

  if (loading) return null;
  if (error) return null;

  const { session } = data.sessions.me;
  const values = {
    title: session.title,
    longDescription: session.longDescription,
    category: sessionConstants.SessionFor[session.category],
    type: sessionConstants.SessionType[session.type],
    primaryCategory: sessionConstants.SessionCategories.find(
      sc => sc.value === session.primaryCategory,
    ),
    secondaryCategories: sessionConstants.SessionCategories.filter(
      c => session.secondaryCategory.indexOf(c.value) !== -1,
    ),
    targetAudiences: sessionConstants.SessionAudiences.filter(
      c => session.targetAudience.indexOf(c.value) !== -1,
    ),
  };
  // eslint-disable-next-line no-console
  console.log(`Graph Session: ${JSON.stringify(session)}`);
  return (
    <div>
      <Subheading>
        This is meant to give you an idea of what your session will look like,
        if accepted, when displayed to our users.
      </Subheading>
      <MainGrid columns="1fr 35rem" rows="minmax(45px,auto) 1fr">
        <Content>
          <h3>{values.title}</h3>
        </Content>
        <Ads />
        <Content>
          <Description>
            {parse(converter.render(values.longDescription))}
          </Description>
          <Section>
            <DetailsHeader>Prerequisites</DetailsHeader>
            <MarkdownContainer>
              {parse(converter.render(session.prerequisites))}
            </MarkdownContainer>
          </Section>
          <Section>
            <DetailsHeader>Agenda</DetailsHeader>
            <MarkdownContainer>
              {parse(converter.render(session.agenda))}
            </MarkdownContainer>
          </Section>
          <Section>
            <DetailsHeader>Supporting Links/Related Resources</DetailsHeader>
            <ItemsGrid columns={2}>
              {session.supportingArtifacts.map(s => {
                return (
                  <React.Fragment key={s.name}>
                    <Cell width={1}>{s.name}</Cell>
                    <Cell width={1}>
                      <a href={s.url} target="blank">
                        {s.url}
                      </a>
                    </Cell>
                  </React.Fragment>
                );
              })}
            </ItemsGrid>
          </Section>
          <Section>
            <DetailsHeader>Key Takeaways</DetailsHeader>
            {session.takeaways.map(s => {
              return (
                <React.Fragment key={s}>
                  <div>{s}</div>
                </React.Fragment>
              );
            })}
          </Section>
        </Content>
        <Ads>
          <DetailsHeader>Details</DetailsHeader>
          <div className="header">Session For</div>
          <div className="value">{values.category}</div>
          <div className="header">Session Type</div>
          <div className="value">{values.type}</div>
          <div className="header">Primary Category</div>
          <div className="value">{values.primaryCategory.label}</div>
          <div className="header">Secondary Categories</div>
          <div className="value">
            {values.secondaryCategories.map(sc => sc.label).join(', ')}
          </div>
          <div className="header">Target Audiences</div>
          <div className="value">
            {values.targetAudiences.map(ta => ta.label).join(', ')}
          </div>
        </Ads>
      </MainGrid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    session: state.session,
  };
};

export default connect(mapStateToProps)(Preview);
