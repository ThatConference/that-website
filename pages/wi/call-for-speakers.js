import React from 'react';
import Head from 'next/head';

import Header from '../../components/CallForSpeakers/Header';
import SummerCamp from '../../components/CallForSpeakers/SummerCamp';
import TalkIdeas from '../../components/CallForSpeakers/TalkIdeas';
import Process from '../../components/CallForSpeakers/Process';
import Perks from '../../components/CallForSpeakers/Perks';

const CallForSpeakers = props => (
  <div>
    <Head>
      <title key="title">Call for Speakers - THAT Conference</title>
    </Head>
    <Header />
    <SummerCamp />
    <TalkIdeas />
    <Process />
    <Perks />
  </div>
);

export default CallForSpeakers;
