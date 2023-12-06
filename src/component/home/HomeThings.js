import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomeThings() {

  const [homeThings, setHomeThings] = useState([]);

  useEffect(() => {
    async function getThings() {

    try {
        const thingApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/country/48`)
            setHomeThings(thingApi.data);
        } catch (error) {
            console.log("Something is Wrong");
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
                            <img src={`data:image/png;base64,${homeThings.countryImage}`} />
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