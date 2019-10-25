import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { ParallaxProvider } from 'react-scroll-parallax';

import Lightbox from 'fslightbox-react';
import { above } from '../utilities';

import ContentSection from '../components/shared/ContentSection';
import Hero from '../components/shared/Hero';

// import 'react-image-lightbox/style.css';

const GalleryImage = styled.img`
  max-height: 25rem;
  max-width: 25rem;
  object-fit: cover;

  ${above.med`
    max-height: 25rem;
    padding: 0.6rem;
  `};
`;

const ContentDetail = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const IMAGES = [
  '/static/images/conversation.jpg',
  '/static/images/outside-night.jpg',
  '/static/images/bartender.jpg',
  '/static/images/fish.jpg',
  '/static/images/Gallery-Oysters2-1.jpg',
  '/static/images/home-entrance.jpg',
  '/static/images/Gallery-Toast-Sandwich.jpg',
  '/static/images/sandbar-inside.jpg',
  '/static/images/tacos-and-rings.jpg',
  '/static/images/aerial.jpg',
  '/static/images/grill.jpg',
  '/static/images/inside-wide.jpg',
];

const about = props => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const updateIndex = selectedIndex => {
    setPhotoIndex(selectedIndex);
    setLightboxOpen(!lightboxOpen);
  };

  return (
    <>
      <Head>
        <title key="title">Gallery - Sand Bar and Island Grill</title>
      </Head>
      <ParallaxProvider>
        <>
          <Hero
            imagePath="/static/images/aerial.jpg"
            heading="Sand Bar and Island Grill"
            href={`tel:${siteInfo.linkPhone}`}
            label="Call for Reservations"
          />

          <ContentSection title="Gallery">
            <ContentDetail>
              {IMAGES.map((item, index) => {
                return (
                  <GalleryImage
                    src={item}
                    onClick={() => {
                      updateIndex(index);
                    }}
                  />
                );
              })}
              <Lightbox
                toggler={lightboxOpen}
                sources={IMAGES}
                slide={photoIndex + 1}
              />
            </ContentDetail>
          </ContentSection>
        </>
      </ParallaxProvider>
    </>
  );
};

export default about;
