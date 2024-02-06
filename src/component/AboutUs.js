import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const AboutUs = () => {

    const [siteInfo, setSiteInfo] = useState([]);

    useEffect(() => {
        getSiteInfo();
    }, []);

    async function getSiteInfo() {
        try {
        const siteInfoApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/site-info/2`)
            setSiteInfo(siteInfoApi.data);
        } catch (error) {
        console.log("Something is Wrong");
        }
    }

    useEffect(() => {
		// 👇️ scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

    
  return (
    <>
        <Helmet>
        <title>About Emirates E Visa Online | UAE Visa Online Services</title>
        <meta name="description" content="Emirates E Visa Online Provides Emirates Tourist Visa, Transit Visa And Business Visa. Online UAE Visa Application Process. Documents Required For E Visa."/>
        <meta name="keywords" content="about emiratesevisaonline, emirates visa online info, uae visit visa info, online emirates visa agency, emirates e visa, emirates offical website, emirates immigration office, emirates tourist visa, emirates business visa, emirates transit visa, online emirates e visa info, emirates visa agent" />
        <meta itemprop="name" content="About Emirates E Visa Online | UAE Visa Online Services" />
        <meta itemprop="description" content="Emirates E Visa Online Provides Emirates Tourist Visa, Transit Visa And Business Visa. Online UAE Visa Application Process. Documents Required For E Visa." />
        <meta name="og:title" content='About Emirates E Visa Online | UAE Visa Online Services'/>
        <meta name="og:description" content='Emirates E Visa Online Provides Emirates Tourist Visa, Transit Visa And Business Visa. Online UAE Visa Application Process. Documents Required For E Visa.'/>
        <meta name="twitter:title" content='About Emirates E Visa Online | UAE Visa Online Services'/>
        <meta name="twitter:description" content='Emirates E Visa Online Provides Emirates Tourist Visa, Transit Visa And Business Visa. Online UAE Visa Application Process. Documents Required For E Visa.'/>
        <link rel="canonical" href="https://www.emiratesevisaonline.com/about-us" />
      </Helmet>
        <section className="breadcrumb-spacing" style={{  backgroundImage: `url("../img/bg/applynow.jpg")` }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="breadcrumb_title">
                            <h3 className="page-title">About Us</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><a href="/"> Home</a></li>
                                    <li className="active">About Us</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="pad_fix_50 aboutus">
        <div className="container">
            <div className="row">
                {/* 
                <div className="col-md-12">
                    <div className="prt_single_image-wrapper">
                        <img className="img-fluid" src="../img/about_01.png" />
                    </div>
                </div>
                */}

                <div className="col-md-12">
                    <div className="content_ab">

                        <div dangerouslySetInnerHTML={{ __html: (siteInfo.aboutUsText) }} />



                    </div>
                </div>



            </div>
        </div>
    </section>
      
    </>
  )
};

export default AboutUs;