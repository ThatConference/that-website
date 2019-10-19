import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { ParallaxProvider } from 'react-scroll-parallax';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import ContentSection from '../components/ContentSection';
import Hero from '../components/Hero';
import MenuGroup from '../components/MenuGroup';
import { below } from '../utilities/breakpoint';

const GET_MENU = gql`
  query getMenu {
    menu {
      name
      description
      price
      category
      imageUrl
    }
  }
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  ${below.med`
    flex-direction: column;
    margin: auto;
  `};
`;

export default props => {
  const context =
    process.env.NODE_ENV === 'development'
      ? { context: { uri: process.env.API_URL } }
      : {};

  const { loading, error, data } = useQuery(GET_MENU, context);

  const groupedDinners = () => {
    return data.menu.reduce((r, a) => {
      r[a.category] = [...(r[a.category] || []), a];
      return r;
    }, {});
  };

  if (data) {
    return (
      <>
        <Head>
          <title key="title">Menu - Sand Bar and Island Grill</title>
        </Head>
        <ParallaxProvider>
          <>
            <Hero
              imagePath="/static/images/tacos-and-rings.jpg"
              heading="Sand Bar and Island Grill"
              href="tel:1-262-877-9500"
              label="Call for Reservations"
            />

            <ContentSection title="Menu">
              <Menu>
                <MenuGroup title="Drinks" items={groupedDinners().DRINK} />
                <MenuGroup
                  title="Appetizers"
                  items={groupedDinners().APPETIZER}
                />
                <MenuGroup
                  title="Wraps"
                  items={groupedDinners().WRAP}
                  subtext="All wraps served with your choice of<br>French Fries or Island Slaw.<p class='addon'>Try a side of our Sweet Potato Fries for an additional $0.50 or Onion Rings for $3.00.</p>"
                />
                <MenuGroup
                  title="Salads"
                  items={groupedDinners().SALAD}
                  subtext="Add Chicken - $2.00<br/>Add Shrimp, Salmon, Grouper, Tuna or Mahi - $5.00"
                />
                <MenuGroup
                  title="Dinner on Land"
                  items={groupedDinners().DINNER_LANDFOOD}
                />
                <MenuGroup
                  title="Dinner from the Sea"
                  items={groupedDinners().DINNER_SEAFOOD}
                />
                <MenuGroup title="Kids" items={groupedDinners().KIDS} />
              </Menu>
            </ContentSection>
          </>
        </ParallaxProvider>
      </>
    );
  }
  return <p>Loading...</p>;
};
