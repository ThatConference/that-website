import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import { below } from '../../utilities';

const HighlightImage = styled.img`
  width: 100%;
  padding: 0 5rem;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
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

class NewsletterSignUp extends Component {
  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://thatconference.activehosted.com/f/embed.php?id=16';
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <ContentSection className={this.props.className}>
        <Main>
          <SideDetail>
            <div className="_form_16" />
          </SideDetail>
          <HighlightImage src="/images/bear_with_megaphone.png" />
        </Main>
      </ContentSection>
    );
  }
}

export default styled(NewsletterSignUp)``;
