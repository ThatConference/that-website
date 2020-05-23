import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  text-align: center;
  height: 80vh;
`;

const HeroImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  -webkit-filter: brightness(0.4);
  filter: brightness(0.4);
`;

const Text = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);

  h1 {
    font-size: 15rem;
    color: ${({ theme }) => theme.colors.fonts.light};
  }
  p {
    text-align: justify;
    font-size: 1.6rem;
    padding-left: 20rem;
    padding-right: 20rem;
    color: ${({ theme }) => theme.colors.fonts.light};
  }
`;

const Hero = ({ className }) => {
  return (
    <Container className={className}>
      <HeroImage src="./images/landing_hero.jpg" loading="lazy" alt="THAT" />
      <Text>
        <h1>We. Love.</h1>
        <h1>Geeks.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac
          hendrerit sem, at ullamcorper nunc. Donec vehicula id sapien vel
          dapibus. Nulla a odio diam. Nunc vel odio ex. Etiam dictum mollis
          placerat. Pellentesque vel posuere velit. Aliquam accumsan felis orci,
          a hendrerit est placerat nec. Nulla non magna sit amet dui vulputate
          rutrum sed imperdiet odio. Nullam id rhoncus nibh. Cras ut egestas
          libero. Phasellus ac varius diam, quis interdum odio.{' '}
        </p>
      </Text>
    </Container>
  );
};

export default styled(Hero)``;
