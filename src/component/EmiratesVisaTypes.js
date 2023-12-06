import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const EmiratesVisaTypes = () => {

  const [visaType, setVisaType] = useState([]);

  useEffect(() => {
    getVisaType();
  }, []);

    async function getVisaType() {
        try {
            const visaTypeApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/visaVariant/0/48`)
            setVisaType(visaTypeApi.data);
        } catch (error) {
            console.log("Something is Wrong Visa Type");
        }
    }


    useEffect(() => {
		// 👇️ scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

  return (
    <>
        <section className="breadcrumb-spacing" style={{  backgroundImage: `url("../img/bg/applynow.jpg")` }} >
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="breadcrumb_title">
                            <h3 className="page-title">Emirates Visa Types</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><Link href="/"> Home</Link></li>
                                    <li className="active">Emirates Visa Types</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>




        <section className="pad_fix_50 ">
            <div className="container">
                <div className="row">

                    {
                        visaType && visaType.length > 0 ?
                        visaType.map((item, index) => (

                            <>

                                <div className="col-md-4" key={index+1}>
                                    <div className="visaBox">
                                        <div className="visaimg">
                                            <img className="lazy" src={`data:image/png;base64,${item.visaVariantImage}`} />
                                        </div>
                                        <div className="visatextBox">

                                            <div className="overflow">
                                                <div className="column-seven mob70">
                                                    <h2 className="visaTitleNew">{item.name}</h2>
                                                    <div className="visaContent">{item.entryType.name}</div>
                                                </div>


                                                <div className="alignFromCenter column-three mob30 paddingFromRight pos-Reltv yellow">
                                                    <div className="padding-All-sm">{item.visaFee}</div>
                                                    <Link className="primary-button" to='/apply-now'>Apply Now</Link>
                                                </div>
                                            </div>


                                            <div className="paddingAll">
                                                <div dangerouslySetInnerHTML={{ __html: (item.description) }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            
                                
                            </>
                            

                        )) :
                        ''
                    }



                </div>
            </div>
        </section>
      
    </>
  )
};

export default EmiratesVisaTypes;