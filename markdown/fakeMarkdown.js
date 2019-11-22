const someVariables = {
  conferenceDate: 'August 3 - 6, 2020',
  ticketUrl: 'http://www.thatconference.com',
};

const md = `
- [Tickets](${someVariables.ticketUrl})
- list
<ContentSection>
The conference is ${someVariables.conferenceDate}
</ContentSection>
`;

export default md;
