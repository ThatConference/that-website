import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import SquareButton from '../shared/SquareButton';

import { below } from '../../utilities';

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

const HighlightImage = styled.img`
  width: 85%;
  padding: 0 5rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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
      <Grid columns={12}>
        <Cell width={5}>
          <Detail>
            <Quotation>"</Quotation>
            <Quote dangerouslySetInnerHTML={{ __html: testimonial.quote }} />
            {testimonial.name && <Name>{testimonial.name}</Name>}
            {testimonial.role && <Role>{testimonial.role}</Role>}
          </Detail>

          <SquareButton
            icon="arrow"
            iconClass="left"
            className={testimonialIndex === 0 ? 'inactive' : ''}
            onClick={
              testimonialIndex < TESTIMONIALS.length - 1
                ? () => {
                    console.log('left', testimonialIndex);
                    setTestimonialIndex(testimonialIndex + 1);
                  }
                : false
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
                    console.log('right', testimonialIndex);
                    setTestimonialIndex(testimonialIndex + 1);
                  }
                : false
            }
          />
        </Cell>
        <Cell width={7}>
          <HighlightImage src={testimonial.imageUrl} />
        </Cell>
      </Grid>
    </ContentSection>
  );
};

export default styled(Testimonials)``;
