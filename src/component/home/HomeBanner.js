import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomeBanner() {

    const [allCountry, setAllCountry] = useState([]);
    const [siteInfo, setSiteInfo] = useState([]);

    useEffect(() => {

		async function getCountry() {

			try {
				const countryApi = await axios.get(`http://localhost:8081/country/basic`)
				setAllCountry(countryApi.data);
			} catch (error) {
				console.log("Something is Wrong");
			}
		}

        async function getSiteInfo() {

			try {
				const siteInfoApi = await axios.get(`http://localhost:8081/site-info/2`)
				setSiteInfo(siteInfoApi.data);
			} catch (error) {
				console.log("Something is Wrong");
			}
		}

		getCountry();
        getSiteInfo();
	}, []);


  return (
    <section className="banner">
        <img src="img/david-rodrigo-Fr6zexbmjmc-unsplash.png" alt="banner" />

        <div className="ban_content">
            <div className="container">
                <div className="tit_form">

                    <div className="ban_title">
                        
                        <h3> <div dangerouslySetInnerHTML={{ __html: (siteInfo.headerText) }} /> </h3>
                    </div>

                    <div className="banner_form">
                        <div className="searchPanelTitle">
                            <h3>Apply for Visa Now</h3>
                        </div>
                        <form method="post" action="apply-detail">

                            <div className="form-group">
                                <label>Citizenship </label>
                                <select id="countryt" name="countryt" className="form-control js-example-basic-single" >
                                    {
										allCountry && allCountry.length > 0 ?
                                            allCountry.map((item, index) => (
                                                <option key={index+1} value={item.id}>{item.name}</option>
                                            )) :
											    ''
									}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Travelling from </label>
                                <select id="country" name="country" className="form-control js-example-basic-single">
                                    {
										allCountry && allCountry.length > 0 ?
                                            allCountry.map((item, index) => (
                                                <option key={index+1} value={item.id}>{item.name}</option>
                                            )) :
											    ''
									}
                                </select>
                            </div>


                            <button className="btn" type="submit" disabled> Continue </button>

                        </form>
                    </div>

                </div>
            </div>
        </div>

    </section>
  );
}

export default HomeBanner;