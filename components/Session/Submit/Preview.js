import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import parse from 'html-react-parser';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import ButterToast, { Cinnamon, POS_TOP, POS_RIGHT } from 'butter-toast';
import debug from 'debug';

import { sessionConstants, below } from '../../../utilities';

import { FormRule, FormCancel, FormSubmit } from '../../shared/FormLayout';

const dlog = debug('that:session:preview');

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

const Preview = ({ session: stateSession, formCancel }) => {
  const router = useRouter();

  const [updateSession] = useMutation(UPDATE_SESSION, {
    onCompleted: ({ sessions }) => {
      dlog('session submitted %o', sessions.session.update);

      ButterToast.raise({
        sticky: true,
        content: (
          <Cinnamon.Crisp
            scheme={Cinnamon.Crisp.SCHEME_BLUE}
            content={() => (
              <div>{`Your session, "${sessions.session.title}" was successfully submitted.`}</div>
            )}
            title="Your THAT Session Was Submitted"
          />
        ),
      });

      router.push('/member/my-sessions');
    },
    onError: createError => {
      dlog('Error updating session %o', createError);
      throw new Error(createError);
    },
  });

  let isSubmitting = false;
  const { loading, error, data } = useQuery(GET_SESSION, {
    variables: { sessionId: stateSession.id },
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
    prerequisites: session.prerequisites,
    agenda: session.agenda,
    takeaways: session.takeaways,
    supportingArtifacts: session.supportingArtifacts,
  };

  const onSubmit = e => {
    e.preventDefault();
    isSubmitting = true;
    const updates = {
      status: 'SUBMITTED',
    };
    updateSession({
      variables: { session: updates, sessionId: session.id },
    });
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
          {session.prerequisites && (
            <Section>
              <DetailsHeader>Prerequisites</DetailsHeader>
              <MarkdownContainer>
                {parse(converter.render(values.prerequisites))}
              </MarkdownContainer>
            </Section>
          )}
          {session.description && (
            <Section>
              <DetailsHeader>Agenda</DetailsHeader>
              <MarkdownContainer>
                {parse(converter.render(values.agenda))}
              </MarkdownContainer>
            </Section>
          )}
          {session.supportingArtifacts && (
            <Section>
              <DetailsHeader>Supporting Links/Related Resources</DetailsHeader>
              <ItemsGrid columns={2}>
                {values.supportingArtifacts.map(s => {
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
          )}
          {session.takeaways && (
            <Section>
              <DetailsHeader>Key Takeaways</DetailsHeader>
              {values.takeaways.map(s => {
                return (
                  <React.Fragment key={s}>
                    <div>{s}</div>
                  </React.Fragment>
                );
              })}
            </Section>
          )}
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
        <FormCancel label="Back" onClick={formCancel} />
        <FormSubmit label="Submit Session" disabled={isSubmitting} />
        <ButterToast
          className="that-toast"
          position={{
            vertical: POS_TOP,
            horizontal: POS_RIGHT,
          }}
        />
      </form>
    </div>
  );
};

export default Preview;
