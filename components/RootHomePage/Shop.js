import React from 'react';
import styled from 'styled-components';
import MerchHighlight from '../shared/MerchHighlight';

const Shop = ({ className }) => {
  return (
    <MerchHighlight
      title="Get That Gear"
      subtitle="That Store Has Your Favorite Merch"
      linkText="Go to THAT Store"
      linkUrl="http://thatconference.store"
      description="Looking for a new favorite THAT T-Shirt? What about a THAT Hoodie? THAT Store is now open and has the latest THAT merch waiting for you."
      className={className}
    />
  );
};

export default styled(Shop)``;
