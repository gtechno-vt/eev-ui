import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomeThings() {

  const [homeThings, setHomeThings] = useState([]);

  useEffect(() => {
    async function getThings() {

    try {
        const thingApi = await axios.get(`https://y2hhbibraxroyw4.emiratesevisaonline.com/country/48`)
            setHomeThings(thingApi.data);
        } catch (error) {
        }
    }
    getThings();
  }, []);


  return (
    <section className="think_you">
        <div className="">
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex">
                        <div className="big_s">
                            <img src="/img/CountryImage.avif" loading="lazy" alt='countryimg'/>
                        </div>
                        <div className="content">
                            <h3>Things to be done on arrival in {homeThings.name}</h3>
                            <div dangerouslySetInnerHTML={{ __html: (homeThings.thingsToDoText) }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default HomeThings;