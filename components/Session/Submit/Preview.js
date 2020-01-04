import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import parse from 'html-react-parser';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';
import Router from 'next/router';

import { sessionConstants, below } from '../../../utilities';

import { FormRule, FormCancel, FormSubmit } from '../../shared/FormLayout';

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
    font-size: 1.3rem;
    margin-top: 1rem;
  }

  div.value {
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

const UPDATE_SESSION = gql`
  mutation updateSession($sessionId: ID!, $session: SessionUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update(session: $session) {
          id
        }
      }
    }
  }
`;

const Preview = ({ session: reduxSession }) => {
  const [updateSession] = useMutation(UPDATE_SESSION);
  let isSubmitting = false;
  const { loading, error, data } = useQuery(GET_SESSION, {
    variables: { sessionId: reduxSession.id },
  });

  if (loading) return null;
  if (error) return null;

  const { session } = data.sessions.me;
  const values = {
    title: session.title,
    longDescription: session.longDescription,
    category: sessionConstants.SessionFors.find(
      sf => sf.value === session.category,
    ).label,
    type: sessionConstants.SessionTypes.find(st => st.value === session.type)
      .label,
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

  const onSubmit = e => {
    e.preventDefault();
    isSubmitting = true;
    const updates = {
      status: 'SUBMITTED',
    };
    updateSession({
      variables: { session: updates, sessionId: session.id },
    }).then(
      () => {
        // ToDo: this needs to redirect...somewhere...My Sessions most likely
        Router.push('/wi/counselor-start');
      },
      err => {
        // ToDo: Appropriately log and handle error
        // eslint-disable-next-line no-console
        console.log(`Error: ${err}`);
      },
    );
  };

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
      <form onSubmit={onSubmit}>
        <FormRule />
        <FormCancel label="Back" />
        <FormSubmit label="Submit Session" disabled={isSubmitting} />
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    session: state.session,
  };
};

export default connect(mapStateToProps)(Preview);
