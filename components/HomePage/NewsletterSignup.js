import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

import { below } from '../../utilities';

const Text = styled.p`
  line-height: 1.8;
  margin: 0;
`;

const Form = styled.form`
  margin-top: 2rem;
  text-align: center;

  div.mc-field-group {
    display: flex;
    flex-direction: row;

    ${below.med`
      text-align: center;
      flex-direction: column;
    `};
  }

  input.email {
    margin-left: 1.2rem;
    min-width: 27rem;
  }
`;

const SubmitButton = styled.input`
  color: ${({ theme }) => theme.colors.highlight};
  background-color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  margin-top: 2rem;
  text-align: center;
  padding: 1.4rem;

  width: 20rem;
`;

const NewsletterSignUp = ({ className }) => {
  return (
    <ContentSection
      title="Newsletter Signup"
      color="light"
      className={className}
    >
      <Text>
        Sign up for our newsletter list to be the first to hear about spring
        opening, specials, events and all we are up here at Sand Bar.
      </Text>
      {/* Begin Mailchimp signup form */}
      <div id="mc_embed_signup">
        <Form
          action="https://sandbarandislandgrill.us20.list-manage.com/subscribe/post?u=9b30f5d6de6cbfe580fddd3c7&amp;id=465a291c6d"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
          noValidate
        >
          <div id="mc_embed_signup_scroll">
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">Email Address </label>
              <input
                type="email"
                name="EMAIL"
                className="required email"
                id="mce-EMAIL"
              />
            </div>
            <div id="mce-responses">
              <div
                className="response"
                id="mce-error-response"
                style={{ display: 'none' }}
              />
              <div
                className="response"
                id="mce-success-response"
                style={{ display: 'none' }}
              />
            </div>
            <div
              style={{ position: 'absolute', left: '-5000px' }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_9b30f5d6de6cbfe580fddd3c7_465a291c6d"
                tabIndex="-1"
                value=""
              />
            </div>
            <div>
              <SubmitButton
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="button"
              />
            </div>
          </div>
        </Form>
      </div>
      {/* End Mailchimp signup form */}
    </ContentSection>
  );
};

export default styled(NewsletterSignUp)``;
