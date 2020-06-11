import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import { gridRepeat, below } from '../../utilities';

const StyledCell = styled(Cell)`
  margin: auto;
  margin-bottom: 9rem;
`;

const TicketBlock = styled.div`
  display: flex;
`;

const TicketImage = styled.img`
  object-fit: contain;
  margin-right: 2rem;
  height: 40rem;

  ${below.small`
    height: 30rem;
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
    <ContentSection className={className}>
      <h2 className="centered-text">Tickets Are Available Now!</h2>
      <Grid columns={gridRepeat.med}>
        {tickets.map(ticket => (
          <StyledCell>
            <TicketBlock>
              <TicketImage src={ticket.imagePath} alt={ticket.name} />
              <Detail>
                <StyledH4>{ticket.name}</StyledH4>
                <BasePrice>{`Base Price: $${ticket.basePrice}`}</BasePrice>
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
                  backgroundColor="primary"
                  hoverBorderColor="primary"
                  hoverBackgroundColor="white"
                  hoverColor="primary"
                  label={`Reserve a ${ticket.name} Ticket`}
                  target="_blank"
                />
              </Detail>
            </TicketBlock>
          </StyledCell>
        ))}
      </Grid>
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
