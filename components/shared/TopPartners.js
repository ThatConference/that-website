import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import Link from 'next/link';
import ThatLink from './ThatLink';
import { gridRepeat, below } from '../../utilities';

const BecomeAPartner = styled.div`
  margin-top: 5rem;
`;

const PartnerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 70%;
`;

const PartnerLink = styled.a`
  height: 18rem;
  padding: 2rem;

  &:hover {
    cursor: pointer;
  }

  ${below.small`
    height: 15rem;
    padding: 1rem;
  `};
`;

const BuildPartner = p => {
  return (
    <Cell center middle key={p.companyName}>
      <Link href="/partner/[slug]" as={`/partner/${p.slug}`} prefetch={false}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <PartnerLink>
          <PartnerImage
            src={p.companyLogo}
            alt={p.companyName}
            loading="lazy"
          />
        </PartnerLink>
      </Link>
    </Cell>
  );
};

const TopPartners = ({ becomePartnerLink, className, partners, title }) => {
  return (
    <div className={className}>
      <h2 className="centered-text">{title}</h2>
      <Grid
        columns={gridRepeat.small}
        alignContent="center"
        justifyContent="space-between"
      >
        {partners.map(p => {
          return BuildPartner(p);
        })}
      </Grid>
      <BecomeAPartner className="centered-text">
        <ThatLink
          title="Become a Partner"
          href={becomePartnerLink}
          isLocal
          style={{ marginTop: '4rem' }}
        />
      </BecomeAPartner>
    </div>
  );
};

TopPartners.propTypes = {
  becomePartnerLink: PropTypes.string.isRequired,
  className: PropTypes.string,
  // event: PropTypes.shape({}).isRequired,
  partners: PropTypes.oneOfType([PropTypes.array]).isRequired,
  title: PropTypes.string.isRequired,
};

TopPartners.defaultProps = {
  className: '',
};

export default styled(TopPartners)``;
