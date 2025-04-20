import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {

    const [siteInfo, setSiteInfo] = useState([]);

    useEffect(() => {
        getSiteInfo();
    }, []);

    async function getSiteInfo() {
        try {
        const siteInfoApi = await axios.get(`https://y2hhbibraxroyw4.emiratesevisaonline.com/site-info/2`)
            setSiteInfo(siteInfoApi.data);
        } catch (error) {
        }
    }

    useEffect(() => {
		// 👇️ scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

  return (
    <>
       <Helmet>
        <title>Emirates E Visa Online - Privacy Policy | Online Visa Policy</title>
        <meta name="description" content="Check Emirates E Visa Online Privacy Policy.  While Apply United Arab Emirates E Visa Online Go Through www.emiratesevisaonline.com Privacy Policy."/>
        <meta name="keywords" content="emirates e visa online privacy policy, privacy policy, uae visa official website policy, visa application policy" />
        <meta itemprop="name" content="Emirates E Visa Online - Privacy Policy | Online Visa Policy" />
        <meta itemprop="description" content="Check Emirates E Visa Online Privacy Policy.  While Apply United Arab Emirates E Visa Online Go Through www.emiratesevisaonline.com Privacy Policy." />
        <meta name="og:title" content='Emirates E Visa Online - Privacy Policy | Online Visa Policy'/>
        <meta name="og:description" content='Check Emirates E Visa Online Privacy Policy.  While Apply United Arab Emirates E Visa Online Go Through www.emiratesevisaonline.com Privacy Policy. '/>
        <meta name="twitter:title" content='Emirates E Visa Online - Privacy Policy | Online Visa Policy'/>
        <meta name="twitter:description" content='Check Emirates E Visa Online Privacy Policy.  While Apply United Arab Emirates E Visa Online Go Through www.emiratesevisaonline.com Privacy Policy.'/>
        <link rel="canonical" href="https://www.emiratesevisaonline.com/privacy-policy" />
      </Helmet>
        <section className="breadcrumb-spacing" style={{  backgroundImage: `url("../img/bg/applynow.avif")` }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="breadcrumb_title">
                            <h3 className="page-title">Privacy Policy</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><a href="/"> Home</a></li>
                                    <li className="active">Privacy Policy</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="pad_fix_50 policy_css">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="content">
                            <div dangerouslySetInnerHTML={{ __html: (siteInfo.privacyPolicy) }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
};

export default PrivacyPolicy;