import React from 'react';
import styled from 'styled-components';
import MerchHighlight from '../shared/MerchHighlight';

const Shop = ({ className }) => {
  return (
    <MerchHighlight
      title="Get THAT Gear"
      subtitle="THAT Store Has Your Favorite Merch"
      linkText="Shop today!"
      linkUrl="https://store.thatconference.com"
      description="Looking for a new favorite THAT T-Shirt? What about a Hoodie to keep ya warm? THAT Store is now open and has the latest gear for our geeks and geeklings.."
      className={className}
    />
  );
};

export default styled(Shop)``;
