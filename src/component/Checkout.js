import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';


const Checkout = () => {

    const { id } = useParams();

    const [applicatDetails, setApplicatDetails] = useState([]);
    const [serviceType, setServiceType] = useState([]);
    const [applicationDetails, setApplicationDetails] = useState([]);
    const [visaTypeFee, setVisaTypeFee] = useState([]);
    const [siteInfo, setSiteInfo] = useState([]);

    useEffect(() => {

        async function getApplicatDetails() {
            
        }

        async function getApplicationDetails() {
            try {
                const appApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant/${id}`)
                setApplicationDetails(appApi.data.application);

                if(appApi.data.application.destinationCountry.id){
                    try {
                        const serviceApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/service-type/${appApi.data.application.destinationCountry.id}`)
                        setServiceType(serviceApi.data);
                    } catch (error) {
                        console.log("Something is Wrong Visa Type");
                    }
                }
                
                try {
                    const applicatntApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant?applicationId=${appApi.data.application.id}`)
                    setApplicatDetails(applicatntApi.data);
                } catch (error) {
                    console.log("Something is Wrong Visa Type");
                }

                try {
                    const visaTypeApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/visaVariant/${appApi.data.application.visaVariant.id}/48/fee`)
                    setVisaTypeFee(visaTypeApi.data);
                } catch (error) {
                    console.log("Something is Wrong Visa Type");
                }
            } catch (error) {
                console.log("Something is Wrong Visa Type");
            }
        }

        getApplicatDetails();
        getApplicationDetails();


    }, [id]);


    useEffect(() => {
        async function getSiteInfo() {

			try {
				const siteInfoApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/site-info/2`)
				setSiteInfo(siteInfoApi.data);
                console.log(siteInfoApi.data);
			} catch (error) {
				console.log("Something is Wrong");
			}
		}
        getSiteInfo();
	}, []);


    useEffect(() => {
		// 👇️ scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

    const dateFormatString = 'd MMMM, yyyy';

    
  return (
    <>
        <section className="breadcrumb-spacing" style={{  backgroundImage: `url("../img/bg/applynow.jpg")` }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="breadcrumb_title">
                            <h3 className="page-title">Checkout</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><a href="/"> Home</a></li>
                                    <li className="active">Checkout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="checkout_pg pad_fix_50">
            <div className="container">
                <div className="row">

                    <div className="col-md-8">

                        <div className="big_order_summy">
                            <h2>Order Summary</h2>

                            <div className="column-three-dflex">
                                <div className="column-three">
                                    <div className="data">Reference ID : <span>{applicationDetails.displayId}</span></div>
                                </div>

                                <div className="column-three">
                                    <div className="data">Visa Applied for : 
                                        <span> 
                                        {
                                            applicationDetails.id ? applicationDetails.visaVariant.name : ''
                                        }
                                        </span>
                                    </div>
                                </div>

                                <div className="column-three">
                                    <div className="data bg_set">
                                        {
                                            applicationDetails.id ? applicationDetails.visaVariant.description : ''
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="detail_table">
                            <div className="title">
                                <h3>Applicant Details</h3>
                            </div>

                            <div className="tab_set">
                                <div className="table-responsive">
                                    <table id="customers">
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Visa Applied Date</th>
                                            <th>Passport No.</th>
                                            <th>Expiry Date</th>
                                            <th>Action</th>
                                        </tr>

                                        {
                                            applicatDetails && applicatDetails.length > 0 ?
                                            applicatDetails.map((item, index) => (

                                                <tr key={index+1}>
                                                    <td>{item.firstName}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>
                                                        { 
                                                            item.arrivalDate ? 
                                                            format(item.arrivalDate, dateFormatString)
                                                            :
                                                            '-'
                                                        }
                                                    </td>
                                                    <td>{item.passportNumber}</td>
                                                    <td>{format(item.passportExpiryDate, dateFormatString)}</td>
                                                    <td>
                                                        {
                                                            item.isPrimary == true ? 
                                                                <Link to={`/applicant-main/${item.id}`}> Edit </Link>
                                                                :
                                                                <Link to={`/applicant/${item.id}`}> Edit  </Link>
                                                        }
                                                        
                                                    </td>
                                                </tr>

                                                )) :
                                                'Nothing Found !!!'
                                        }

                                    </table>
                                </div>
                            </div>

                        </div>

                        <div className="note_check">
                            <p className="">For a limited time only, we are offering a 100% refund guarantee*, in the slim case
                                your visa application is not approved by the UAE immigration department</p>
                        </div>

                    </div>

                    <div className="col-md-4">
                        <div className="side_table_s">

                            <table className="tableStyle1" id="payment_box">
                                <tr>
                                    <th colSpan="2">PAYMENT DETAILS</th>
                                </tr>

                                <tr>
                                    <td>No. Of Applicant</td>
                                    <td>{applicatDetails.length}</td>
                                </tr>

                                <tr>
                                    <td>Total Visa Fees</td>
                                    <td>${visaTypeFee*applicatDetails.length}</td>
                                </tr>

                                <tr>
                                    <td>Service Type</td>
                                    <td>
                                        <select className='form-control'>
                                            <option value="">Select</option>
                                            {
                                                serviceType && serviceType.length > 0 ?
                                                serviceType.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                    )) :
                                                    ''
                                            }
                                            <option value="Normal">Normal</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Service Fees</td>
                                    <td>${siteInfo.transactionFeePc}</td>
                                </tr>

                                <tr>
                                    <td>Tax(%)</td>
                                    <td>{siteInfo.vatPc}</td>
                                </tr>

                                <tr>
                                    <td className="ftr_l">Net Pay</td>
                                    <td className="ftr_r">${((visaTypeFee*applicatDetails.length) + (siteInfo.transactionFeePc))+((visaTypeFee*applicatDetails.length) + (siteInfo.transactionFeePc))*(siteInfo.vatPc/100)}</td>
                                </tr>

                            </table>

                            <button type="submit" className="btn button" id="checkout-button" name="proceedFinal"> Proceed
                                Now</button>

                        </div>
                    </div>

                </div>
            </div>
        </section>
      
    </>
  )
};

export default Checkout;