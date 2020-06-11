import React from 'react';
import DetailToLearnMore from '../shared/DetailToLearnMore';

// Can hardcode for now, or hardcode query to pull next event deets we want to display
const Upcoming = () => {
  return (
    <DetailToLearnMore
      blockDescription="Over four days, folks of diverse technology backgrounds and expertise levels gather to take advantage of multiple learning mediums to maximize one’s community and career advancements."
      blockLinkText="Learn More"
      blockLinkUrl="/wi/2021"
      blockTitle="#THATConference WI 2021"
      largeTitle="Events"
      smallTitle="Upcoming"
      titleLinkText="See All Upcoming Events"
      titleLinkUrl="/"
    />
  );
};

export default Upcoming;
