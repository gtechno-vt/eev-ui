import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomeContinent() {

    const [country, setCountry] = useState([]);
    const [continent, setContinent] = useState([]);

    useEffect(() => {
        getCountryValues();
    }, []);

    async function getCountryValues() {
        try {
            const countryApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/country/basic`)
            setCountry(countryApi.data);
            var countryData = countryApi.data;
            const uniqueContinent = [...new Set(countryData.map(country => country.continentKey))];
            setContinent(uniqueContinent);
        } catch (error) {
            console.log("Something is Wrong Contenent");
        }
    }


    const [search, setSearch] = useState({
		keywords: ""
	});

    async function onTextFieldChange(e) {
		setSearch({
			...search,
			[e.target.name]: e.target.value
		})

		try {
            const countryApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/country/basic?name=`+e.target.value)
            setCountry(countryApi.data);
            var countryData = countryApi.data;
            const uniqueContinent = [...new Set(countryData.map(country => country.continentKey))];
            setContinent(uniqueContinent);
        } catch (error) {
            console.log("Something is Wrong Contenent");
        }
	}


  return (
    <section className="children_search">
        <div className="container">
            <div className="row">
                <div className="title">
                    <h3>Countries Eligible for Dubai Visa</h3>
                </div>
            </div>

            <div className="row" >
                <div className="col-md-12" >
                    <div className="search_bar">

                        <div className="form-group">
                            <form method="post" action="">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                        <path fill="currentColor"
                                            d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9Z" />
                                    </svg>
                                </div>

                                <div className="innput">
                                    <input type="text" 
                                        placeholder="Type your country name here.." 
                                        name="keywords"
										onChange={e => onTextFieldChange(e)} 
                                        value={search.keywords}
                                    />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>


            <div className="explanation" >


                {
                    continent && continent.length > 0 ?
                    continent.map((item, index) => (

                        <>

                            <div key={index+1} className="Bg_green_light pd_4">
                                <h3>{item}</h3>

                                <ul>

                                    {
                                        country && country.length > 0 ?
                                        country.map((itemV, indexs) => (

                                            itemV.continentKey == item ?
                                                <li key={indexs+1}>
                                                    <Link to={'/emirates-visa/' + itemV.countryNameSlug +'/'+ itemV.countryNameSlug}>{itemV.name}<img src="img/svg/arrow.svg" /></Link>
                                                </li>
                                            :
                                            ''

                                        )) :
                                        ''
                                    }
                                   
                                </ul>
                            </div>
                        </>
                        

                    )) :
                    ''
                }

                

            </div>


        </div>
    </section>
  );
}

export default HomeContinent;