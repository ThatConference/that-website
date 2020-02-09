import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';

const PageDiv = styled.div`
  position: ${({ mobileMenuOpen }) => (mobileMenuOpen ? 'fixed' : 'relative')};
`;

const InnerPage = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const DefaultLayout = ({ children, user, loading }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <PageDiv mobileMenuOpen={mobileMenuOpen}>
      <Header
        user={user}
        loading={loading}
        layered={false}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <InnerPage>{children}</InnerPage>
      <Footer modifiers="site" />
    </PageDiv>
  );
};

export default DefaultLayout;
