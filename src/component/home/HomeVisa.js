import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomeVisa() {

  const [homeVisa, setHomeVisa] = useState([]);
  const [homeVisaType, setHomeVisaType] = useState([]);

  useEffect(() => {
    getVisaType();
  }, []);

    async function getVisaType() {
        try {
            const visaTypeApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/visaVariant/0/48?fetchImages=false`)
            setHomeVisa(visaTypeApi.data);
            //var visaData = visaTypeApi.data;
            //const uniqueVisaTypes = [...new Set(visaData.map(visa => visa.visaType.name))];
            const uniqueVisaTypesS = ["Tourist Visa", "Business Visa", "Transit Visa"];
            setHomeVisaType(uniqueVisaTypesS);
        } catch (error) {
            console.log("Something is Wrong Visa Type");
        }
    }
                                     

  return (


    <section className="visa_detail_home">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="title">
                        <h3>Visa Details</h3>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="tab_visa">

                        <div role="tabpanel">
                            <div className="col-md-12" key={12}>
                                <ul className="nav nav-pills brand-pills nav-stacked" role="tablist">
                                    {
                                        homeVisaType && homeVisaType.length > 0 ?
                                        homeVisaType.map((item, index) => (
                                           
                                            <li key={index+1} role="presentation" className={index == 0 ? 'active' : '' +"brand-nav" + index == 1 ? 'busine_s' : '' + " " + index == 2 ? 'black' : 'busine_s'}>
                                                <a href={"#tab"+(index+1)} aria-controls={"#tab"+(index+1)} role="tab" data-toggle="tab">{item}</a>
                                            </li>

                                        )) :
                                        ''
                                    }

                                </ul>
                            </div>
                            <div className="col-md-12" key={13}>
                                <div className="tab-content">
                                    {
                                        homeVisaType && homeVisaType.length > 0 ?
                                        homeVisaType.map((item, index) => (

                                            <>
                    
                                                <div key={index+1} role="tabpanel" className={index == 0 ? 'tab-pane active' : ' tab-pane'} id={"tab"+(index+1)}>
                                                    <div className="row">
                                                        {
                                                            homeVisa && homeVisa.length > 0 ?
                                                            homeVisa.map((itemV, indexs) => (

                                                                itemV.visaType.name == item ?
                                                                    <div key={indexs+1} className="col-md-3">
                                                                        <div className="big_box">
                                                                            <div className="title">
                                                                                <h3> {itemV.name} </h3>
                                                                            </div>

                                                                            <div className="pricingTable-header">
                                                                                <span className="price-value">
                                                                                    {itemV.visaFee} 
                                                                                </span>
                                                                            </div>

                                                                            <div className="content">

                                                                                <div className="over_h">
                                                                                    <div className="small_name"> Entry Type</div>
                                                                                    <div className="large_name">{itemV.entryType.name} </div>
                                                                                </div>

                                                                                <div className="over_h">
                                                                                    <div className="small_name"> Approval Time</div>
                                                                                    <div className="large_name">{itemV.processingTime} </div>
                                                                                </div>

                                                                                <div className="over_h">
                                                                                    <div className="small_name"> Visa Validity</div>
                                                                                    <div className="large_name">{itemV.visaValidity}</div>
                                                                                </div>

                                                                                <div className="over_h">
                                                                                    <div className="small_name"> Visa Category</div>
                                                                                    <div className="large_name">{itemV.visaCategory} </div>
                                                                                </div>

                                                                                <div className="over_h">
                                                                                    <div className="small_name"> Stay Validity In UAE</div>
                                                                                    <div className="large_name">{itemV.stayValidity} </div>
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                :
                                                                ''

                                                            )) :
                                                            ''
                                                        }

                                                    </div>
                                                </div>
                                            </>
                                           

                                        )) :
                                        ''
                                    }


                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </section>

    
  );
}

export default HomeVisa;