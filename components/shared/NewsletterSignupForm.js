import React, { Component } from 'react';
import styled from 'styled-components';
import SquareButton from './SquareButton';
import { below } from '../../utilities';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  justify-content: center;

  ${below.larger`
    max-width: 33rem;
  `};

  ${below.large`
    max-width: unset;
  `};
`;

const Title = styled.h5`
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 0.7rem;
  color: ${({ theme }) => theme.colors.fonts.dark};
`;

const Subtitle = styled.p`
  margin: 0;
  line-height: 1.2;
  margin: 0.7rem 0 1.4rem 0;
`;

const InputsRow = styled.div`
  width: 100%;
  display: flex;

  input {
    flex-grow: 2;
    margin-right: 0.7rem;
  }
`;

const ThankYouBlock = styled.p`
  margin: 0;
  line-height: 1.4;
  text-align: center;
`;

class NewsletterSignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formSubmitted: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('https://thatconference.activehosted.com/proc.php', {
      method: 'POST',
      body: data,
      mode: 'no-cors',
    })
      .then(() => {
        this.setState({ formSubmitted: true });
        setTimeout(() => {
          this.setState({ formSubmitted: false });
        }, 5000);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log('Request failed', error));
  }

  render() {
    const { formSubmitted } = this.state;
    const { className, headerType, style, subtitle, title } = this.props;

    return (
      <FormContainer className={className} style={style}>
        <Title as={headerType} dangerouslySetInnerHTML={{ __html: title }} />

        {subtitle && <Subtitle>{subtitle}</Subtitle>}

        {formSubmitted && (
          <ThankYouBlock>
            <strong>THANK YOU</strong> for joining our mailing list!
            <br />
            Check your inbox for a confirmation.
          </ThankYouBlock>
        )}

        {!formSubmitted && (
          <form onSubmit={this.onSubmit}>
            <input type="hidden" name="u" value="16" />
            <input type="hidden" name="f" value="16" />
            <input type="hidden" name="s" />
            <input type="hidden" name="c" value="0" />
            <input type="hidden" name="m" value="0" />
            <input type="hidden" name="act" value="sub" />
            <input type="hidden" name="v" value="2" />

            <InputsRow>
              <input
                type="text"
                name="email"
                placeholder="ex: hello@youareawesome.com"
                required
              />
              <SquareButton isSubmit icon="arrow" iconClass="right" />
            </InputsRow>
          </form>
        )}
      </FormContainer>
    );
  }
}

export default styled(NewsletterSignUpForm)``;
