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
    
    scroll-behavior: smooth;
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
    margin-top: 0;
    margin-bottom: 0.5rem;

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

    &.basic-link {
      color: ${props => props.theme.colors.secondary};
      &:hover {
        color: ${({ theme }) => theme.colors.highlight};
      }
    }
  }
  
  p { 
    color: ${({ theme }) => theme.colors.fonts.dark};
  }

  .large-body-copy {
    font-size: 2.2rem;
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

  ::-moz-selection { 
    color: ${({ theme }) => theme.colors.fonts.light}; 
    background: ${({ theme }) => theme.colors.primary}; 
  }
  ::selection { 
    color: ${({ theme }) => theme.colors.fonts.light}; 
    background: ${({ theme }) => theme.colors.primary};
  }

  .float-right {
    float: right;
  }

  .float-left {
    float: left;
  }

  form {
    input {
      padding: 1rem;
    }

    &.input-form {

      input, textarea {
        margin-top: 0.75rem;
        border: 1px solid ${({ theme }) => theme.colors.mediumGray};
        background-color: ${({ theme }) => theme.colors.mediumLightGray};

        &::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          color: ${({ theme }) => theme.colors.mediumGray};
        }
        &::-moz-placeholder {
          /* Firefox 19+ */
          color: ${({ theme }) => theme.colors.mediumGray};
        }
        &:-ms-input-placeholder {
          /* IE 10+ */
          color: ${({ theme }) => theme.colors.mediumGray};
        }
        &:-moz-placeholder {
          /* Firefox 18- */
          color: ${({ theme }) => theme.colors.mediumGray};
        }

        &:disabled {
          background-color: ${({ theme }) => theme.colors.mediumLightGray};
        }

        &:focus {
          outline: ${({ theme }) => theme.colors.thatBlue} auto 1px;
        }

        &.invalid {
          border-color: ${({ theme }) => theme.colors.danger};

          &:focus {
            outline-offset: 0;
            outline: unset;
            border-color: ${({ theme }) => theme.colors.danger};
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.55);
          }
        } //invalid

      } //input, textarea

      .react-select-container.invalid {
        border: 1px solid red;

        &:focus {
            outline-offset: 0;
            outline: unset;
            border-color: ${({ theme }) => theme.colors.danger};
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.55);
          }
      }

    } //input-form

  } //form
`;

export default GlobalStyle;
