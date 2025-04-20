import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomeVisa() {

  const [homeVisa, setHomeVisa] = useState([]);
  const [homeVisaType, setHomeVisaType] = useState([]);
  const [selectedTab,setSelectedTab] = useState("Tourist Visa");

  useEffect(() => {
    getVisaType();
  }, []);

    async function getVisaType() {
        try {
            const visaTypeApi = await axios.get(`https://y2hhbibraxroyw4.emiratesevisaonline.com/visaVariant/0/48?fetchImages=false&types=all`)
            setHomeVisa(visaTypeApi.data);
            const uniqueVisaTypesS = ["Tourist Visa", "Business Visa", "Transit Visa"];
            setHomeVisaType(uniqueVisaTypesS);
        } catch (error) {
        }
    }
                                     

  return (


<section className="visa_detail_home">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="title">
                        <h2>Visa Details</h2>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="tab_visa">

                        <div role="tabpanel">
                            <div className="col-md-12" key={Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000)}>
                                <ul className="nav nav-pills brand-pills nav-stacked">
                                    {
                                        homeVisaType && homeVisaType.length > 0 ?
                                        homeVisaType.map((item, index) => (
                                            <li key={Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000)} className={selectedTab === item ? 'active' : ''} onClick={() => setSelectedTab(item)}>
                                                <span>{item}</span>
                                            </li>
                                        )) :
                                        ''
                                    }

                                </ul>
                            </div>
                            <div className="col-md-12" key={Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000)}>
                                <div className="tab-content">
                                    {
                                        homeVisaType && homeVisaType.length > 0 ?
                                        homeVisaType.map((item, index) => (

                                            <>
                    
                                                <div key={Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000)}  className={index == 0 ? 'tab-pane active' : ' tab-pane'} id={"tab"+(index+1)}>
                                                    <div className="row">
                                                        {
                                                            homeVisa && homeVisa.length > 0 ?
                                                            homeVisa.map((itemV, indexs) => (

                                                                itemV.visaType.name == selectedTab ?
                                                                    <div key={Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000)} className="col-md-3">
                                                                        <div className="big_box">
                                                                            <div className="title">
                                                                                <h3> {itemV.name} </h3>
                                                                            </div>

                                                                            <div className="pricingTable-header">
                                                                                <span className="price-value">
                                                                                    {itemV.visaFee} USD
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
                                                                                    <div className="large_name">{itemV.visaValidity} Days after Approval</div>
                                                                                </div>

                                                                                {/* <div className="over_h">
                                                                                    <div className="small_name"> Visa Category</div>
                                                                                    <div className="large_name">{itemV.visaCategory} </div>
                                                                                </div> */}

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