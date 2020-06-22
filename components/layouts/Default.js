import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { DefaultSeo, LogoJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import LogRocket from 'logrocket';
import * as Sentry from '@sentry/browser';
import _ from 'lodash';

import GlobalStyle from '../../styles/globalStyle';
import baseTheme from '../../styles/baseTheme';
import Meta from '../Meta';
import Header from '../Header/default';
import Footer from '../Footer';
import { defaultSeo } from '../../utilities';
import User from '../User';
import { useFetchUser } from '../../hooks/user';
import {
  StyledPage,
  CorePage,
  PageDiv,
  InnerPage,
} from '../shared/StandardStyles';

const Default = ({ children, headerType }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [layeredHeader, setLayeredHeader] = useState(false);

  const { user, loading } = useFetchUser();
  const router = useRouter();

  useEffect(() => {
    setLayeredHeader(headerType === 'layered');
  });

  if (!_.isNil(user)) {
    document.tidioIdentify = {
      distinct_id: user.id,
      email: user.email,
    };

    LogRocket.identify(user.id, {
      email: user.email,
    });

    Sentry.configureScope(scope => {
      scope.setUser({
        email: user.email,
        id: user.id,
      });
      scope.setExtra('sessionURL', LogRocket.sessionURL);
    });
  }

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
            logo="https://www.thatconference.com/svgs/THATConference-WI.svg"
            url={`https://www.thatconference.com/${router.pathname}`}
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

export default Default;
