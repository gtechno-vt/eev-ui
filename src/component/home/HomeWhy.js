import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomeWhy() {

  const [whyUs, setWhyUs] = useState([]);

  useEffect(() => {
    async function getWhyUs() {

    try {
        const whyUsApi = await axios.get(`https://y2hhbibraxroyw4.emiratesevisaonline.com/site-why-choose-us/site/2`)
            setWhyUs(whyUsApi.data);
        } catch (error) {
        }
    }
    getWhyUs();
  }, []);


  return (
    <section className="why_us">
        <div className="container">
            <div className="row">
                <div className="title">
                    <h3>Why Us </h3>
                </div>
            </div>


            <div className="list">
                <div className="row">
                    {
                        whyUs && whyUs.length > 0 ?
                        whyUs.map((item, index) => (

                            <div className="col-md-4" key={index+1}>
                                <div className="green_box">
                                    <div className="img">
                                        <img src={`data:image/png;base64,${item.pointImage}`} alt='pointimg' loading="lazy"/>
                                    </div>
                                    <div className="content">
                                        <p>{item.pointText}</p>
                                    </div>
                                </div>
                            </div>

                        )) :
                        ''
                    }

                </div>

            </div>
        </div>
    </section>
  );
}

export default HomeWhy;