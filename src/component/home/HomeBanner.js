import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomeBanner() {

    const navigate = useNavigate();
    const [allCountry, setAllCountry] = useState([]);
    const [siteInfo, setSiteInfo] = useState([]);
    const [leadData, setLeadData] = useState({
        'citizen' : '',
        'traveling' : ''
    });

    async function onTextFieldChange(e) {
        setLeadData({
            ...leadData,
            [e.target.name]: e.target.value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        
        if (leadData.citizen == '') {
            document.getElementById("citizen").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.traveling == '') {
            document.getElementById("traveling").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/emirates-visa/' + leadData.citizen +'/'+ leadData.traveling);
        }

    }

    useEffect(() => {

		async function getCountry() {

			try {
				const countryApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/country/basic`)
				setAllCountry(countryApi.data);
			} catch (error) {
				console.log("Something is Wrong");
			}
		}

        async function getSiteInfo() {

			try {
				const siteInfoApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/site-info/2`)
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
                        <form>
                            <div className="form-group">
                                <label>Citizenship </label>
                                <select 
                                    className="form-control" 
                                    name='citizen'
                                    id='citizen'
                                    onChange={e => onTextFieldChange(e)}
                                    value={leadData.citizen}
                                    
                                >
                                    <option value=''>--Select--</option>
                                    {
										allCountry && allCountry.length > 0 ?
                                            allCountry.map((item, index) => (
                                                <option key={index+1} value={item.countryNameSlug}>{item.name}</option>
                                            )) :
											    ''
									}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Traveling from </label>
                                <select 
                                     name='traveling'
                                     id='traveling'
                                     onChange={e => onTextFieldChange(e)}
                                     value={leadData.traveling}
                                    className="form-control"
                                >
                                    <option value=''>--Select--</option>
                                    {
										allCountry && allCountry.length > 0 ?
                                            allCountry.map((item, index) => (
                                                <option key={index+1} value={item.countryNameSlug}>{item.name}</option>
                                            )) :
											    ''
									}
                                </select>
                            </div>


                            <button className="btn" type="button" onClick={e => onFormSubmit(e)}> Continue </button>

                        </form>
                    </div>

                </div>
            </div>
        </div>

    </section>
  );
}

export default HomeBanner;