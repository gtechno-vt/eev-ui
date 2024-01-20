import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import ApiLoader from './ApiLoader';


const Checkout = () => {

    const { id } = useParams();
    const [applicatDetails, setApplicatDetails] = useState([]);
    const [serviceType, setServiceType] = useState([]);
    const [applicationDetails, setApplicationDetails] = useState([]);
    const [visaTypeFee, setVisaTypeFee] = useState([]);
    const [siteInfo, setSiteInfo] = useState([]);
    const [serviceTypeValue,setServiceTypeValue] = useState("Normal")
    const [paymentDetails,setPaymentDetails] = useState({});
    const [showApiLoader,setShowApiLoader] = useState(false);

    
    const navigate = useNavigate();

    const serviceTypeValueChange = (e) => {
        setServiceTypeValue(e.target.value);
        if(e.target.value === "Normal"){
            setPaymentDetails( prevState => {
                return {...prevState,
                    serviceFees:siteInfo?.regularServiceFee
                };
              })
        }else{
        const item = serviceType.find(ele => ele.id == e.target.value);
        console.log(item);
        setPaymentDetails( prevState => {
            return {...prevState,
                serviceFees:item.serviceFee
            };
          })
        }
    }

    useEffect(() => {

        // async function getApplicatDetails() {
            
        // }

        async function getApplicationDetails() {
            try {
                setShowApiLoader(true);
                const appApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant/${id}`)
                setApplicationDetails(appApi.data.application);

                if(appApi.data.application.destinationCountry.id){
                        const serviceApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/service-type/${appApi.data.application.destinationCountry.id}`)
                        setServiceType(serviceApi.data);
                }
                
               
                    const applicatntApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant?applicationId=${appApi.data.application.id}`)
                    setApplicatDetails(applicatntApi.data);
                    setPaymentDetails( prevState => {
                        return {...prevState,
                            noOfApplicant:applicatntApi.data.length
                        };
                      })

                
                    const visaTypeApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/visaVariant/${appApi.data.application.visaVariant.id}/48/fee`)
                    setVisaTypeFee(visaTypeApi.data);
                    setPaymentDetails( prevState => {
                        return {...prevState,
                            visaFees:visaTypeApi.data
                        };
                      })
                      setShowApiLoader(false);
            } catch (error) {
                setShowApiLoader(false);
                console.log("Something is Wrong Visa Type");
            }
        }

        // getApplicatDetails();
        getApplicationDetails();
         

    }, [id]);


    useEffect(() => {
        async function getSiteInfo() {

			try {
				const siteInfoApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/site-info/2`)
				setSiteInfo(siteInfoApi.data);
                setPaymentDetails( prevState => {
                    return {...prevState,
                        serviceType:"Normal",
                        serviceFees:siteInfoApi.data.regularServiceFee,
                        taxPercent:siteInfoApi.data.vatPc
                    };
                  })
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

    // useEffect(() => {
    //  const {visaFees,serviceFees,noOfApplicant,taxPercent} = paymentDetails;
    //  console.log("useEffect call");
    //     if(visaFees && serviceFees && noOfApplicant && taxPercent){
    //         const taxAmt = (((noOfApplicant*visaFees)+serviceFees)/100) * taxPercent;
    //         const totalPayable = taxAmt+(noOfApplicant*visaFees)+serviceFees;
            
    //         // setPaymentDetails( prevState => {
    //         //     return {...prevState,
    //         //         totalTax:taxAmt,
    //         //         netPay:totalPayable
    //         //     };
    //         //   })
    //     }

	// },[paymentDetails]);

    const totalTax = (((paymentDetails.noOfApplicant*paymentDetails.visaFees)+(paymentDetails.noOfApplicant*paymentDetails.serviceFees))*paymentDetails.taxPercent/100);
    const netPay = (paymentDetails.noOfApplicant*paymentDetails.visaFees) + (paymentDetails.noOfApplicant*paymentDetails.serviceFees) + ((paymentDetails.noOfApplicant*paymentDetails.visaFees+(paymentDetails.noOfApplicant*paymentDetails.serviceFees))/100)*paymentDetails.taxPercent

    const dateFormatString = 'd MMMM, yyyy';

    const redirectAddMoreAppl = () => {
        navigate(`/apply/${applicatDetails[0].id}`)
    }

    console.log(paymentDetails,"paymentDetails");
  return (
    <>
        <section className="breadcrumb-spacing" style={{  backgroundImage: `url("../img/bg/applynow.jpg")` }}>
        {showApiLoader && <ApiLoader/>}
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
                                                            item.application.createdAt ? 
                                                            format(item.application.createdAt, dateFormatString)
                                                            :
                                                            '-'
                                                        }
                                                    </td>
                                                    <td>{item.passportNumber}</td>
                                                    <td>{format(item.passportExpiryDate, dateFormatString)}</td>
                                                    <td>
                                                        {
                                                            item.isPrimary == true ? 
                                                                <Link to={`/applicant/${item.id}`}> Edit </Link>
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
                                <div className='d-flex justify-content-center'>
                                <button  className="btn button" id="checkout-button" name="proceedFinal" onClick={redirectAddMoreAppl}> Add More Applicants</button>
                                </div>
                            </div>

                        </div>

                        <div className="note_check">
                            <p className="">The amounts shown in USD on this page will be shown in your local currency on the gateway page.</p>
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
                                    <td>{paymentDetails.noOfApplicant ? paymentDetails.noOfApplicant : "-" }</td>
                                </tr>

                                <tr>
                                    <td>Total Visa Fees</td>
                                    <td>{paymentDetails.noOfApplicant*paymentDetails.visaFees ? paymentDetails.noOfApplicant*paymentDetails.visaFees : "-"} USD</td>
                                </tr>

                                <tr>
                                    <td>Service Type</td>
                                    <td>
                                        <select 
                                        className='form-control'
                                        value={serviceTypeValue}
                                        onChange={serviceTypeValueChange}
                                        >
                                            <option value="Normal">Regular Service (3-4 Days)</option>
                                            {
                                                serviceType && serviceType.length > 0 ?
                                                serviceType.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                    )) :
                                                    ''
                                            }
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Service Fees</td>
                                    <td>{paymentDetails.serviceFees ? paymentDetails.noOfApplicant*paymentDetails.serviceFees :"-"} USD</td>
                                </tr>

                                <tr>
                                    <td>Tax({paymentDetails.taxPercent}%)</td>
                                    <td>{ totalTax ?totalTax.toFixed(2):"-"} USD</td>
                                </tr>

                                <tr>
                                    <td className="ftr_l">Net Pay</td>
                                    <td className="ftr_r">{netPay ?netPay.toFixed(2) :"-"} USD</td>
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