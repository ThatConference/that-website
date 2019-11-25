/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import ContentSection from '../../components/shared/ContentSection';

// using this as a pretend query for getting variables from the api
const GET_PARTNERS = gql`
  query getPartners {
    partners {
      id
      slug
      year
      partnershipLevel
      companyName
      companyLogo
      heroImage
      website
    }
  }
`;

// take the array of partner data and return a key-value pair object (just formatting here for whatever we return from the api)
function formatPartnerDataIntoVariables(data) {
  return data.reduce(function(result, item) {
    const reassignmentResult = result;
    // making the key be of format variables_* so that it's less likely to match incorrectly
    reassignmentResult[`variables_${item.slug}`] = item.companyName;
    return reassignmentResult;
  }, {});
}

// mapObj should be of the format { eventDate:"10/10/2020", eventLocation:"wi", variable3:"value3" }
function replaceAll(str, mapObj) {
  // create regEx with all variables as keys that are pipe delimited, for example "eventDate|eventLocation|variable3"
  const regularExpression = new RegExp(Object.keys(mapObj).join('|'), 'gi');

  // do the actual replace searching for regEx matches on keys and replace using the values
  return str.replace(regularExpression, function(matched) {
    return mapObj[matched];
  });
}

const pocMarkdown = ({ markdownContent }) => {
  // print out original markdownContent
  console.log(`original md`, markdownContent);

  // make a call to an API for debugging; pretending this gets variable values
  const { loading, error, data } = useQuery(GET_PARTNERS);
  if (loading) return null;
  if (error) return null;
  console.log(`variables from api (actually partners)`, data);

  // data from API may not be in format we want
  const variables = formatPartnerDataIntoVariables(data.partners);
  console.log(`formatted data (key:value)`, variables);

  // replace variables in the md file with what we got back from the api
  const markdownTransformed = replaceAll(markdownContent, variables);
  console.log(`transformed md`, markdownTransformed);

  return (
    <div>
      <Head>
        <title key="title">POC: Markdown - THAT Conference</title>
      </Head>

      <ContentSection>
        <h3>
          POC: Markdown with Variables (really partners) and Dynamic Routing
        </h3>
        <Markdown>{markdownTransformed}</Markdown>
      </ContentSection>
    </div>
  );
};

pocMarkdown.getInitialProps = async function(context) {
  const slug = context.query.markdown;
  const markdownContent = require(`../../markdown/${slug}.md`).default;
  return { markdownContent };
};

export default pocMarkdown;
