import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StyledPre, ViewLink } from './StandardStyles';
import Icon from './Icon';
import { below } from '../../utilities';

const TRUNCATED_HEIGHT_SIZE = 140;

const JobRow = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: row;

  ${below.med`
    flex-direction: column;
  `};

  &:first-child {
    margin-top: 0;
  }
`;

const JobDetail = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;

  input {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
`;

const Attributes = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50rem;
  align-items: center;
  margin-top: 3.4rem;

  ${below.larger`
    min-width: 40rem;
  `};

  ${below.larger`
    min-width: 30rem;
  `};

  ${below.med`
    min-width: 100%;
    margin-top: 0;
    margin-bottom: 2rem;
    flex-direction: row;
    flex-wrap: wrap;
  `};
`;

const JobTitle = styled.a`
  margin: 0;
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

const JobDescription = styled(StyledPre)`
  display: -webkit-box;
  -webkit-line-clamp: ${({ expandedDescription }) =>
    expandedDescription ? 'unset' : 6};
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0;
`;

const AttributeTag = styled.div`
  margin: 0 0 0.75rem 0;
  font-size: 1.3rem;
  background-color: ${({ color, theme }) => theme.colors[color]};
  width: fit-content;
  height: fit-content;
  min-width: 15rem;
  text-align: center;
  border: ${({ border, theme }) =>
    border ? `1px solid ${theme.colors.primary}` : 'none'};

  span {
    padding: 0.1rem 1rem;
    color: ${({ fontColor, theme }) =>
      fontColor ? theme.colors[fontColor] : theme.colors.white};
    font-weight: 700;
    vertical-align: middle;
  }

  ${below.med`
    margin: 0.75rem;
  `};
`;

const ShowMore = styled.p`
  flex-grow: 2;
  font-size: 1.4rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.thatBlue};
  margin-top: 0;
  text-align: right;

  &:hover {
    fill: ${({ theme }) => theme.colors.highlight};
  }
`;

const StyledViewLink = styled(ViewLink)`
  text-align: center;
  margin-top: 1rem;
  width: auto;

  ${below.med`
    margin-top: 0;
    margin-left: 1rem;
  `};
`;

const JobListing = ({ job, partner }) => {
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const jobPath = `/partner/${partner.slug}/job/${job.slug}`;

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  }, []);

  return (
    <JobRow>
      <JobDetail>
        <JobTitle href={jobPath}>{job.title}</JobTitle>

        <input type="checkbox" id="expanded" />
        <JobDescription expandedDescription={expandedDescription} ref={ref}>
          {job.description}
        </JobDescription>
        {height > TRUNCATED_HEIGHT_SIZE && (
          <ShowMore
            onClick={() => setExpandedDescription(!expandedDescription)}
            className="show-more"
          >
            {`Show ${expandedDescription ? 'Less' : 'More'}`}
          </ShowMore>
        )}
      </JobDetail>

      <Attributes>
        {job.experienceLevel && (
          <AttributeTag
            className={job.experienceLevel.toLowerCase().replace('_', ' ')}
            color="primary"
          >
            <span>{job.experienceLevel.replace('_', ' ')}</span>
          </AttributeTag>
        )}
        {job.jobType && (
          <AttributeTag
            className={job.jobType.toLowerCase().replace('_', ' ')}
            color="highlight"
          >
            <span>{job.jobType.replace('_', ' ')}</span>
          </AttributeTag>
        )}
        {job.remote && (
          <AttributeTag
            className="remote"
            color="transparent"
            border
            fontColor="primary"
          >
            <span>REMOTE</span>
          </AttributeTag>
        )}
        <StyledViewLink href={jobPath}>
          <span>View Job</span>
          <Icon
            icon="fullArrow"
            height="20"
            width="12"
            viewBoxHeight="100"
            viewBoxWidth="100"
          />
        </StyledViewLink>
      </Attributes>
    </JobRow>
  );
};

export default JobListing;
