import React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';

const InnerPage = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const DefaultLayout = ({ children, user, loading }) => (
  <>
    <Header user={user} loading={loading} />
    <InnerPage>{children}</InnerPage>
    <Footer modifiers="site" />
  </>
);

export default DefaultLayout;
