import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import HomeBanner from "./home/HomeBanner";
import HomeVisaStep from "./home/HomeVisaStep";
import HomeVisa from "./home/HomeVisa";
import HomeWhy from "./home/HomeWhy";
import HomeThings from "./home/HomeThings";
import HomeContinent from "./home/HomeContinent";
import HomeHCustomer from "./home/HomeHCustomer";
import HomeFaq from "./home/HomeFaq";
import { Helmet } from 'react-helmet';


const Home = () => {

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Get Emirates Visa Online | Fill Online Visa Application Form</title>
        <meta name="description" content="Complete Emirates E Visa Online Application Form, Get Emirates Visa From Emirates Official Website. Choose 14, 30 and 60 Days Tourist Visa or Visit Visa." />
        <meta name="keywords" content="emirates visa online, emirates e visa online, emirates visa, emirates visit visa, emirates transit visa, emirates business visa, required documents for emirates visa online, emirates airline visa, emirates urgent visa, emirates e visa online application, emirates visa online form, emirates tourist visa, 14 days emirates visa" />
        <meta itemprop="name" content="Emirates Visa Online Steps | Complete Visa Application Form" />
        <meta itemprop="description" content="Visit Emirates E Visa Online Application Form, Apply Emirates E Visa from Anywhere and Get It By Email. Apply Visit Visa, Tourist Visa,Transit Visa and Business Visa." />
        <meta name="og:title" content='Emirates Visa Online Steps | Complete Visa Application Form'/>
        <meta name="og:description" content='Visit Emirates E Visa Online Application Form, Apply Emirates E Visa from Anywhere and Get It By Email. Apply Visit Visa, Tourist Visa,Transit Visa and Business Visa.'/>
        <meta name="twitter:title" content='Emirates Visa Online In 3 Simple Steps | Get E Visa By Email'/>
        <meta name="twitter:description" content='Visit Emirates E Visa Online Application Form, Apply Emirates E Visa from Anywhere and Get It By Email. Apply Visit Visa, Tourist Visa,Transit Visa and Business Visa.'/>
        <link rel="canonical" href="https://www.emiratesevisaonline.com" />
      </Helmet>
      <HomeBanner />
      <HomeVisaStep />
      <HomeVisa />
      <HomeWhy />
      <HomeThings />
      <HomeContinent />
      <HomeHCustomer />
      <HomeFaq />

    </>
  )
};

export default Home;