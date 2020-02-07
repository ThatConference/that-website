import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import GlobalStyle from '../styles/globalStyle';
import baseTheme from '../styles/baseTheme';
import Meta from './Meta';

// Need to include all layouts so that each can be rendered if/when set on page
import DefaultLayout from './layouts/default';
// eslint-disable-next-line no-unused-vars
import LayeredHeaderLayout from './layouts/layeredHeader';
import { defaultSeo } from '../utilities';
import User from './User';
import { useFetchUser } from '../hooks/user';

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

const Page = ({ children, layout }) => {
  const { user, loading } = useFetchUser();
  const Layout = layout || DefaultLayout;
  const router = useRouter();

  return (
    <ThemeProvider theme={baseTheme}>
      <>
        <GlobalStyle />
        <StyledPage>
          <Meta />
          <DefaultSeo
            {...defaultSeo}
            canonical={`https://www.thatconference.com/${router.pathname}`}
          />
          <CorePage>
            <User user={user} loading={loading}>
              <Layout user={user} loading={loading}>
                {React.cloneElement(children, { user, loading })}
              </Layout>
            </User>
          </CorePage>
        </StyledPage>
      </>
    </ThemeProvider>
  );
};

export default Page;
