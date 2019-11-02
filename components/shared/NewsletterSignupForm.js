import React, { Component } from 'react';
import styled from 'styled-components';
import { textInputs } from 'polished';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-with: 20rem;
  justify-content: center;
`;

const ActiveCampaignForm = styled.form`
  ._form-content {
    display: flex;
    width: 100%;

    ._form_element {
      flex-grow: 2;
    }
  }

  input {
    min-width: 100%;
  }

  button {
    visibility: hidden;

    &:after {
      content: '';
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewbox='0 0 30 30' transform='rotate(-90)' fill='white'><path d='M12,16c-0.3,0-0.5-0.1-0.7-0.3L5.2,9.6C4.8,9.2,4.9,8.6,5.3,8.2c0.4-0.3,0.9-0.3,1.3,0l5.4,5.4l5.4-5.4 c0.4-0.4,1.1-0.3,1.4,0.1c0.3,0.4,0.3,0.9,0,1.3l-6.1,6.1C12.5,15.9,12.3,16,12,16z' /></svg>");
      background-repeat: no-repeat;
      visibility: visible;
      background-color: ${({ theme }) => theme.colors.thatBlue};
      color: ${({ theme }) => theme.colors.white};
      padding: 1rem;
      border: none;
      margin-left: 1rem;
      display: block;
      height: 3.75rem;
      width: 3.75rem;
      position: relative;
      top: -2.3rem;
      background-position: center;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const Title = styled.h5`
  text-transform: uppercase;
  margin: 0;
`;

const InputsRow = styled.div``;

class NewsletterSignUpForm extends Component {
  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://thatconference.activehosted.com/f/embed.php?id=16';
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <FormContainer className={this.props.className}>
        <Title>{this.props.title}</Title>
        <InputsRow>
          <ActiveCampaignForm className="_form_16" />
        </InputsRow>
      </FormContainer>
    );
  }
}

export default styled(NewsletterSignUpForm)``;
