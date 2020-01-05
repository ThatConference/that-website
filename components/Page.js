import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globalStyle';
import baseTheme from '../styles/baseTheme';

import Meta from './Meta';
import Header from './Header';
import Footer from './Footer';

const StyledPage = styled.div`
  background: ${props => props.theme.colors.backgroundColor};
  color: ${props => props.theme.colors.black};
`;

const CorePage = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-gap: 0;
`;

const InnerPage = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export default ({ children, currentUser }) => {
  return (
    <ThemeProvider theme={baseTheme}>
      <>
        <GlobalStyle />
        <StyledPage>
          <Meta />
          <CorePage>
            <Header currentUser={currentUser} />
            <InnerPage>
              {React.cloneElement(children, { currentUser })}
            </InnerPage>
            <Footer modifiers="site" />
          </CorePage>
        </StyledPage>
      </>
    </ThemeProvider>
  );
};
