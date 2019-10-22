import React, { useState } from 'react';
import styled from 'styled-components';

import ContentSection from '../shared/ContentSection';
import Icon from '../shared/Icon';

const REVIEWS = [
  {
    name: 'Thomas D.',
    quote:
      "Best little bar and grill on the Twin Lakes! If you're around the area between Antioch and Lake Geneva, make a stop here for lunch and a cold beverage or two. Very cool stop right on the lake. Has a boat launch and parking for your trailer. Has ample parking across the road. On the site of the original Mad Dan's. Just north of the border (Rt. 173) on Lakeview Rd which turns into East Lakeshore Dr in Wisconsin. On the southeast shore of Lake Elizabeth.<br/><br/>Appetizers are great as are the sandwiches.My favorite is the BLT Wrap. They also have seafood including freshly shucked oysters. Beer is cold and the girls behind the bar are fantastic. Nice place to meet friends for drinks. You will enjoy it.",
    source: 'Travel Advisor',
  },
  {
    name: 'Nancy D.',
    quote:
      'Island time! Wow, I felt like I was on a surfer beach. Really cool place. The food was fantastic! Lobster roll incredible!! Fried green beans delicious! Drinks-- - amazing!!! I want to go back on a hot summer day!!',
    source: 'Travel Advisor',
  },
  {
    name: 'Maryjane A.',
    quote:
      "It's like being in vacation! Charming whimsical tiki bar restaurant in wisconsin--you've gotta love it! The grouper tacos are amazing! The grilled salmon was delicious. We love escaping to this small hideaway restaurant and bar. Don't forget to take a pic with the pirate at the entrance!! There is also an out door patio that I think is only open in the evening.They have a small snack menu.Call restaurant if that is what you are looking for to determine the hours that area is open.",
    source: 'Yelp',
  },
];

const LeftQuotation = styled.img`
  height: 8rem;
  position: absolute;
  left: -5rem;
  opacity: 0.1;
  top: -5rem;
`;

const RightQuotation = styled.img`
  height: 8rem;
  position: absolute;
  bottom: -1rem;
  right: -5rem;
  opacity: 0.1;
  transform: rotate(180deg);
`;

const Review = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 3rem;
    height: 3rem;
    position: relative;
    fill: ${({ theme }) => theme.colors.primary};

    &:hover {
      cursor: pointer;
    }

    &.medium:hover {
      cursor: auto;
    }

    path {
      max-height: 8rem;
    }

    &.right {
      right: -1rem;
    }

    &.left {
      left: -1rem;
    }
  }
`;

const ReviewDetail = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
`;

const Quote = styled.p`
  line-height: 1.8;
`;

const Name = styled.p`
  margin: 0;
  line-height: 1.8;
  text-transform: uppercase;
`;

const Source = styled.p`
  margin: 0;
  line-height: 1;
  font-size: 1.3rem;
`;

const NavDots = styled.div`
  text-align: center;
  position: relative;
  top: -3.5rem;
`;

const Dot = styled.span`
  height: 1rem;
  width: 1rem;
  background-color: ${({ theme }) => theme.colors.medium};
  border-radius: 50%;
  display: inline-block;
  margin: 0.5rem;

  &.primary {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    cursor: pointer;
  }
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
`;

const Testimonials = ({ className }) => {
  const [reviewIndex, setReviewIndex] = useState(0);
  const review = REVIEWS[reviewIndex];

  return (
    <div className="testimonials">
      <ContentSection title="Customers and Friends" subtitle="Testimonials">
        <Review>
          <div>
            <Icon
              icon="arrow"
              className={`left ${reviewIndex === 0 ? 'medium' : ''}`}
              onClick={
                reviewIndex > 0
                  ? () => {
                      setReviewIndex(reviewIndex - 1);
                    }
                  : false
              }
            />
          </div>
          <ReviewDetail>
            <LeftQuotation src="../static/images/quotation-mark.png" />
            <RightQuotation src="../static/images/quotation-mark.png" />
            <Quote dangerouslySetInnerHTML={{ __html: review.quote }} />
            <Name>{review.name}</Name>
            <Source>
              review from
              <Highlight>{review.source}</Highlight>
            </Source>
          </ReviewDetail>
          <div>
            <Icon
              icon="arrow"
              className={`right ${
                reviewIndex === REVIEWS.length - 1 ? 'medium' : ''
              }`}
              onClick={
                reviewIndex < REVIEWS.length - 1
                  ? () => {
                      setReviewIndex(reviewIndex + 1);
                    }
                  : false
              }
            />
          </div>
        </Review>
      </ContentSection>
      <NavDots>
        {REVIEWS.map((item, index) => {
          return (
            <Dot
              onClick={() => setReviewIndex(index)}
              className={index === reviewIndex ? 'primary' : ''}
            />
          );
        })}
      </NavDots>
    </div>
  );
};

export default styled(Testimonials)``;
