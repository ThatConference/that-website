import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import SquareButton from '../shared/SquareButton';

import { below, gridRepeat } from '../../utilities';

const TESTIMONIALS = [
  {
    title: 'Bring the whole crew',
    name: '',
    quote:
      'The family workshops were incredible. I loved that kids taught so many of them, and it inspired my son to develop an idea of his own to present someday. We loved that we came home with some projects.',
    role: 'Camper',
    imageUrl: '/images/battle_bots.jpg',
  },
  {
    title: 'Learn from everyone!',
    name: '',
    quote:
      'All of the knowledge/expertise under one room! The talent was just amazing and the sessions were in line with what is going on in the industry.',
    role: 'Camper',
    imageUrl: '/images/keynote.jpg',
  },
  {
    title: 'Something special',
    name: '',
    quote:
      'There is something special about THAT Conference. It is hard to put into words, but I’ve felt it every year I’ve gone, and I’ve felt it more each year. I love the way my kids can see a bit of what it is that I do every day, and I’m hoping to inspire them to join this community too.',
    role: 'Counselor',
    imageUrl: '/images/maker_space.jpg',
  },
];

const ContentGrid = styled(Grid)`
  margin: 0 8rem;

  ${below.large`
    margin: 0;
  `};

  direction: rtl;

  ${below.small`
    display: block;
    margin-right: 2rem;
  `};

  ${below.xsmall`
    margin-right: 0;
  `};
`;

const HighlightImage = styled.img`
  max-width: 55rem;

  ${below.larger`
    max-width: 100%;
  `};

  ${below.xsmall`
    max-width: 30rem;
  `};
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 40rem;
`;

const Quote = styled.p`
  margin-top: 8rem;
`;

const Quotation = styled.p`
  font-family: franklin-gothic-urw, sans-serif;
  font-size: 17rem;
  width: 100%;
  position: absolute;
  top: -27rem;
`;

const Name = styled.p``;
const Role = styled.p``;

const Testimonials = ({ className }) => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonial = TESTIMONIALS[testimonialIndex];

  return (
    <ContentSection className={className}>
      <ContentGrid columns={gridRepeat.small}>
        <Cell>
          <HighlightImage src={testimonial.imageUrl} loading="lazy" />
        </Cell>
        <Cell style={{ direction: 'ltr' }}>
          <Detail>
            <Quotation>&quot;</Quotation>
            <Quote dangerouslySetInnerHTML={{ __html: testimonial.quote }} />
            {testimonial.name && <Name>{testimonial.name}</Name>}
            {testimonial.role && <Role>{testimonial.role}</Role>}
          </Detail>

          <SquareButton
            icon="arrow"
            iconClass="left"
            className={testimonialIndex === 0 ? 'inactive' : ''}
            onClick={
              testimonialIndex > 0
                ? () => {
                    setTestimonialIndex(testimonialIndex - 1);
                  }
                : () => {}
            }
          />
          <SquareButton
            icon="arrow"
            iconClass="right"
            className={
              testimonialIndex === TESTIMONIALS.length - 1 ? 'inactive' : ''
            }
            onClick={
              testimonialIndex < TESTIMONIALS.length - 1
                ? () => {
                    setTestimonialIndex(testimonialIndex + 1);
                  }
                : () => {}
            }
          />
        </Cell>
      </ContentGrid>
    </ContentSection>
  );
};

export default styled(Testimonials)``;
