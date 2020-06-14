import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import { below } from '../../utilities';

const TicketGrid = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${below.large`
    flex-direction: column;
  `}
`;

const StyledCell = styled.div`
  margin: auto;
  margin-bottom: 9rem;
  flex: 1 1 0px;
`;

const TicketBlock = styled.div`
  display: flex;
  max-width: 80%;
  margin: auto;
`;

const TicketImage = styled.img`
  object-fit: contain;
  margin-right: 2rem;
  height: 40rem;

  ${below.small`
    display: none;
  `}
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
`;

const BasePrice = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
  font-style: italic;
  line-height: 1;
  font-size: 2.4rem;
`;

const StyledH4 = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-size: 3.2rem;
`;

const Description = styled.p`
  margin-top: 0rem;
`;

const BenefitTitle = styled.h5`
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const SmallLinkButton = styled(LinkButton)`
  width: 30rem;
  margin: auto;
`;

const Tickets = ({ className, tickets }) => {
  return (
    <ContentSection className={className} id="tickets">
      <h2 className="centered-text">Tickets Are Available Now!</h2>
      <TicketGrid>
        {tickets.map(ticket => (
          <StyledCell>
            <TicketBlock>
              <TicketImage src={ticket.imagePath} alt={ticket.name} />
              <Detail>
                <StyledH4>{ticket.name}</StyledH4>
                <BasePrice>{`Min Price: $${ticket.basePrice}`}</BasePrice>
                <Description>{ticket.description}</Description>
                <BenefitTitle>Benefits:</BenefitTitle>
                <ul>
                  {ticket.benefits.map(benefit => (
                    <li>{benefit}</li>
                  ))}
                </ul>
                <SmallLinkButton
                  href={ticket.ticketUrl}
                  borderColor="white"
                  color="white"
                  backgroundColor={ticket.buttonColor}
                  hoverBorderColor={ticket.buttonColor}
                  hoverBackgroundColor="white"
                  hoverColor="darkGray"
                  label={`Reserve a ${ticket.name} Ticket`}
                  target="_blank"
                />
              </Detail>
            </TicketBlock>
          </StyledCell>
        ))}
      </TicketGrid>
    </ContentSection>
  );
};

Tickets.propTypes = {
  className: PropTypes.string,
  tickets: PropTypes.shape([]).isRequired,
};

Tickets.defaultProps = {
  className: '',
};

export default styled(Tickets)`
  ul {
    margin-top: 0;
  }
`;
