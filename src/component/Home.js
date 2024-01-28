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


const Home = () => {
  
    useEffect(() => {
		// 👇️ scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);
  
  return (
    <>

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