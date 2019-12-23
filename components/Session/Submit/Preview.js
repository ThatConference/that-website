import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import parse from 'html-react-parser';

import { below } from '../../../utilities/breakpoint';

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

const Lastly = () => {
  const session = {
    title: 'How to kickstart your software development',
    longDescription: `Description of the session goes here. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
- hello world
- how are you`,
    sessionFor: 'Professionals',
    type: 'Regular Session',
    primaryCategory: 'Web',
    secondaryCategories: ['Mobile', 'AR/VR'],
    targetAudiences: ['Developers', 'Designers', 'Testers'],
    supportingArtifacts: [
      {
        id: 'id1',
        name: 'Link to something',
        url: 'http://www.linktosomethingcool.com',
      },
      {
        id: 'id2',
        name: 'Link to something else',
        url: 'http://www.linktosomethingelsecool.com',
      },
    ],
    prerequisites:
      'Description of the session goes here. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita ',
    agenda:
      'Description of the session goes here. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita ',
    takeaways: [
      {
        id: 'id1',
        text: 'Takeaway 1',
      },
      {
        id: 'id2',
        text: 'Takeaway 2',
      },
    ],
  };
  return (
    <div>
      <Subheading>
        This is meant to give you an idea of what your session will look like,
        if accepted, when displayed to our users.
      </Subheading>
      <MainGrid columns="1fr 35rem" rows="minmax(45px,auto) 1fr">
        <Content>
          <h3>{session.title}</h3>
        </Content>
        <Ads />
        <Content>
          <Description>
            {parse(converter.render(session.longDescription))}
          </Description>
          <Section>
            <DetailsHeader>Supporting Links/Related Resources</DetailsHeader>
            <ItemsGrid columns={2}>
              {session.supportingArtifacts.map(s => {
                return (
                  <React.Fragment key={s.id}>
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
            <DetailsHeader>Key Takeaways</DetailsHeader>
            {session.takeaways.map(s => {
              return (
                <React.Fragment key={s.id}>
                  <div>{s.text}</div>
                </React.Fragment>
              );
            })}
          </Section>
        </Content>
        <Ads>
          <DetailsHeader>Details</DetailsHeader>
          <div className="header">Session For</div>
          <div className="value">{session.sessionFor}</div>
          <div className="header">Session Type</div>
          <div className="value">{session.type}</div>
          <div className="header">Primary Category</div>
          <div className="value">{session.primaryCategory}</div>
          <div className="header">Secondary Categories</div>
          <div className="value">{session.secondaryCategories.join(', ')}</div>
          <div className="header">Target Audiences</div>
          <div className="value">{session.targetAudiences.join(', ')}</div>
        </Ads>
      </MainGrid>
    </div>
  );
};

export default Lastly;
