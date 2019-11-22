import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { below } from '../utilities/breakpoint';

const GlobalStyle = createGlobalStyle`
  ${normalize()};
  html {
    font-family: 'Open Sans', sans-serif;
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }

  h1, h2, h3 {
    font-family: franklin-gothic-urw-comp, sans-serif;   
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.primary};
    line-height: 0.9;
    
  }

  h4, h5 {
    font-family: franklin-gothic-urw, sans-serif;
    color: ${({ theme }) => theme.colors.fonts.dark};
    line-height: 1.4;
  }

  h1 {
    font-size: 11rem;

    ${below.med`
      font-size: 9rem;
    `};
  }

  h2 {
    font-size: 10rem;

    ${below.med`
      font-size: 8.5rem;
    `};
  }

  h3 {
    font-size: 4.5rem;

    ${below.med`
      font-size: 4rem;
    `};
  }

  h4 {
   font-size: 2.4rem;

   ${below.med`
      font-size: 2rem;
    `};
  }

  h5 {
   font-size: 1.8rem;

   ${below.med`
      font-size: 1.4rem;
    `};
  }

  a {
    text-decoration: none;
  }
  
  p { 
    color: ${({ theme }) => theme.colors.fonts.dark};
  }

  .large-body-copy {
    font-size: 2.4rem;
    line-height: 1.5;
  }

  .medium-body-copy {
    font-size: 1.8rem;
  }

  .small-body-copy {
    font-size: 1.6rem;
  }

  .font-dark {
    color: ${({ theme }) => theme.colors.fonts.dark};
  }

  .font-light {
    color: ${({ theme }) => theme.colors.fonts.light};
  }

  .centered-text {
    text-align: center;
  }

  ::-moz-selection { background: ${({ theme }) => theme.colors.primary}; }
  ::selection { background: ${({ theme }) => theme.colors.primary}; }

  form {
    input {
      padding: 1rem;
    }
  }
`;

export default GlobalStyle;
