import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import ContentSection from './ContentSection';
import { below } from '../utilities/breakpoint';

const FoodImage = styled.img`
  height: 160px;
  max-width: 250px;
  object-fit: cover;

  ${below.med`
    margin: 0;
  `};
`;

const FeaturedDish = styled.div`
  margin: 0 1.3rem;
  max-width: 25rem;
  ${below.med`
    flex-direction: column;
  `};
`;

const Name = styled.p`
  line-height: 1;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
`;

const Description = styled.p`
  margin-top: 1.2rem;
  line-height: 1.8;
`;

const GET_MENU_FEATURED = gql`
  query getMenuFeatured {
    menu(isFeatured: true) {
      name
      description
      imageUrl
    }
  }
`;

const FeaturedDishes = ({ className }) => {
  const context =
    process.env.NODE_ENV === 'development'
      ? { context: { uri: 'http://localhost:3000/api' } }
      : {};

  const { loading, error, data } = useQuery(GET_MENU_FEATURED, context);

  if (loading) return null;
  if (error) return null;

  return (
    <ContentSection title="Featured Dishes" color="light">
      <div className={className}>
        {data.menu.map(i => (
          <FeaturedDish>
            <FoodImage src={i.imageUrl} />
            <Name>{i.name}</Name>
            <Description>{i.description}</Description>
          </FeaturedDish>
        ))}
      </div>
    </ContentSection>
  );
};

export default styled(FeaturedDishes)`
  display: flex;
  justify-content: center;
  text-align: center;

  ${below.med`
    flex-direction: column;
  `};
`;
