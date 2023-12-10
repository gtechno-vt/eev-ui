import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TermsAndConditions = () => {

    const [siteInfo, setSiteInfo] = useState([]);

    useEffect(() => {
        getSiteInfo();
    }, []);

    async function getSiteInfo() {
        try {
        const siteInfoApi = await axios.get(`http://localhost:8081/site-info/2`)
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