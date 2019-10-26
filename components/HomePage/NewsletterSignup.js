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
        <Grid columns={12}>
          <Cell width={6}>
            <div className="_form_16" />
          </Cell>
          <Cell width={6}>
            <HighlightImage src="/images/bear_with_megaphone.png" />
          </Cell>
        </Grid>
      </ContentSection>
    );
  }
}

export default styled(NewsletterSignUp)``;
