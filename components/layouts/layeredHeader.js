import React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';

const InnerPage = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const LayeredHeaderLayout = ({ children, user, loading }) => (
  <>
    <Header user={user} loading={loading} layered />
    <InnerPage>{children}</InnerPage>
    <Footer modifiers="site" />
  </>
);

export default LayeredHeaderLayout;
