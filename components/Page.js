import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { DefaultSeo, LogoJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import GlobalStyle from '../styles/globalStyle';
import baseTheme from '../styles/baseTheme';
import Meta from './Meta';
import Header from './Header';
import Footer from './Footer';
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
  grid-template-rows: auto;
  grid-gap: 0;
`;

const PageDiv = styled.div`
  position: ${({ mobileMenuOpen }) => (mobileMenuOpen ? 'fixed' : 'relative')};
  display: flex;
  flex-direction: column;
`;

const InnerPage = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;

const Page = ({ children, headerType }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [layeredHeader, setLayeredHeader] = useState(false);

  const { user, loading } = useFetchUser();
  const router = useRouter();

  useEffect(() => {
    setLayeredHeader(headerType === 'layered');
  });

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
          <LogoJsonLd
            logo="https://www.thatconference.com/images/svgs/THATConference-WI.svg"
            url="https://www.thatconference.com"
          />
          <CorePage>
            <User user={user} loading={loading}>
              <PageDiv mobileMenuOpen={mobileMenuOpen}>
                <Header
                  user={user}
                  loading={loading}
                  layered={layeredHeader}
                  mobileMenuOpen={mobileMenuOpen}
                  setMobileMenuOpen={setMobileMenuOpen}
                />
                <InnerPage>
                  {React.cloneElement(children, { user, loading })}
                </InnerPage>
                <Footer modifiers="site" />
              </PageDiv>
            </User>
          </CorePage>
        </StyledPage>
      </>
    </ThemeProvider>
  );
};

export default Page;
