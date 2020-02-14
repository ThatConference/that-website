import React from 'react';
import styled from 'styled-components';
import { ViewLink } from './StandardStyles';
import Icon from './Icon';
import { below } from '../../utilities';

const JobRow = styled.div`
  margin-top: 4rem;

  &:first-child {
    margin-top: 0;
  }
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  ${below.med`
    flex-direction: column;
  `}
`;

const AttributesRow = styled.div`
  display: flex;
`;

const JobTitle = styled.a`
  margin: 0;
  flex-grow: 2;
  font-size: 2.4rem;
  font-weight: 700;
  font-family: franklin-gothic-urw, sans-serif;
  color: ${({ theme }) => theme.colors.fonts.dark};
  line-height: 1.4;

  ${below.med`
      font-size: 2rem;
    `};

  &:not(:first_child) {
    margin-top: 4rem;
  }
`;

const JobDescription = styled.p`
  margin-top: 0.25rem;
  line-height: 1.6;
  margin-bottom: 0.25rem;
`;

const AttributeTag = styled.div`
  margin: 0 0.25rem;
  font-size: 1.3rem;
  background-color: ${({ color, theme }) => theme.colors[color]};
  width: fit-content;

  span {
    padding: 0.1rem 1rem;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 700;
    vertical-align: middle;
  }
`;

const JobListing = ({ job, partner }) => {
  const jobPath = `/partner/${partner.slug}/job/${job.slug}`;

  return (
    <JobRow>
      <TitleRow>
        <JobTitle href={jobPath}>{job.title}</JobTitle>
        <AttributesRow>
          {job.jobType && (
            <AttributeTag
              className={job.jobType.toLowerCase().replace('_', ' ')}
              color="highlight"
            >
              <span>{job.jobType.replace('_', ' ')}</span>
            </AttributeTag>
          )}
          {job.experienceLevel && (
            <AttributeTag
              className={job.experienceLevel.toLowerCase().replace('_', ' ')}
              color="primary"
            >
              <span>{job.experienceLevel.replace('_', ' ')}</span>
            </AttributeTag>
          )}
        </AttributesRow>
      </TitleRow>

      <JobDescription>{job.description}</JobDescription>
      <ViewLink href={jobPath}>
        <span>View Job</span>
        <Icon
          icon="fullArrow"
          height="20"
          width="12"
          viewBoxHeight="100"
          viewBoxWidth="100"
        />
      </ViewLink>
    </JobRow>
  );
};

export default JobListing;
