import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const TermsAndConditions = () => {

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
        <title>Emirates E Visa Online - Terms & Conditions | Emirates Visa Terms</title>
        <meta name="description" content="United Arab Emirates Visa Official Website Terms & Conditions. Check Terms While Applying Emirates E Visa Online With www.emiratesevisaonline.com"/>
        <meta name="keywords" content="emirates e visa online terms and condition, terms and condition, emirates visa policy, emirates visit visa services, emirates visa agency, emirates visa online website, online emirates visa refund, emirates visa refund policy" />
        <meta itemprop="name" content="Emirates E Visa Online - Terms & Conditions | Emirates Visa Terms" />
        <meta itemprop="description" content="United Arab Emirates Visa Official Website Terms & Conditions. Check Terms While Applying Emirates E Visa Online With www.emiratesevisaonline.com" />
        <meta name="og:title" content='Emirates E Visa Online - Terms & Conditions | Emirates Visa Terms'/>
        <meta name="og:description" content='United Arab Emirates Visa Official Website Terms & Conditions. Check Terms While Applying Emirates E Visa Online With www.emiratesevisaonline.com'/>
        <meta name="twitter:title" content='Emirates E Visa Online - Terms & Conditions | Emirates Visa Terms'/>
        <meta name="twitter:description" content='United Arab Emirates Visa Official Website Terms & Conditions. Check Terms While Applying Emirates E Visa Online With www.emiratesevisaonline.com'/>
        <link rel="canonical" href="https://www.emiratesevisaonline.com/terms-and-conditions" />
      </Helmet>
    <section className="breadcrumb-spacing" style={{  backgroundImage: `url("../img/bg/applynow.jpg")` }}>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="breadcrumb_title">
                        <h3 className="page-title">Terms & Conditions</h3>
                        <div className="breadcrumb_menu">
                            <ul className="trail_items">
                                <li><a href="/"> Home</a></li>
                                <li className="active">Terms & Conditions</li>
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
                        <div dangerouslySetInnerHTML={{ __html: (siteInfo.terms) }} />
                    </div>
                </div>
            </div>
        </div>
    </section>
      
    </>
  )
};

export default TermsAndConditions;