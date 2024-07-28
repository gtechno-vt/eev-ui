import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import ApiLoader from './ApiLoader';
import PayPalGateway from './PayPal';


const Checkout = () => {

    const { id } = useParams();
    const [applicatDetails, setApplicatDetails] = useState([]);
    const [serviceType, setServiceType] = useState([]);
    const [applicationDetails, setApplicationDetails] = useState([]);
    const [visaTypeFee, setVisaTypeFee] = useState([]);
    const [siteInfo, setSiteInfo] = useState([]);
    const [serviceTypeValue, setServiceTypeValue] = useState("Normal")
    const [paymentDetails, setPaymentDetails] = useState({});
    const [showApiLoader, setShowApiLoader] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Stripe");
    const [loading,setLoading] = useState(true);
    const [primaryApplicant,setPrimaryApplicant] = useState(null);

    const navigate = useNavigate();

    const serviceTypeValueChange = (e) => {
        setServiceTypeValue(e.target.value);
        if (e.target.value === "Normal") {
            setPaymentDetails(prevState => {
                return {
                    ...prevState,
                    serviceFees: siteInfo?.regularServiceFee
                };
            })
        } else {
            const item = serviceType.find(ele => ele.id == e.target.value);
            setPaymentDetails(prevState => {
                return {
                    ...prevState,
                    serviceFees: item.serviceFee
                };
            })
        }
    }

    useEffect(() => {
        async function getApplicationDetails() {
            try {
                setShowApiLoader(true);
                const applicatntApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/applicant?applicationDisplayId=${id}`)
                setLoading(false);
                if(!(applicatntApi?.data[0]?.application?.status === "PAYMENT PENDING" || applicatntApi?.data[0]?.application?.status === "PAYMENT PROCESSING" || applicatntApi?.data[0]?.application?.status === "DRAFT")){
                    navigate(`/track-visa-application/${id}`)
                    return;
                }
                const application = applicatntApi.data[0].application;
                setPrimaryApplicant(applicatntApi.data[0]);
                setApplicatDetails(applicatntApi.data);
                setApplicationDetails(application);
                setPaymentDetails(prevState => {
                    return {
                        ...prevState,
                        noOfApplicant: applicatntApi.data.length
                    };
                })

                if (application?.destinationCountry?.id) {
                    const serviceApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/service-type/${application.destinationCountry.id}`)
                    setServiceType(serviceApi.data);
                }


                const visaTypeApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/visaVariant/${application.visaVariant.id}/${application.citizenshipCountry.id}/48/fee`)
                setVisaTypeFee(visaTypeApi.data);
                setPaymentDetails(prevState => {
                    return {
                        ...prevState,
                        visaFees: visaTypeApi.data
                    };
                })
                setShowApiLoader(false);
            } catch (error) {
                setShowApiLoader(false);
                setLoading(false)
            }
        }

        getApplicationDetails();


    }, [id]);


    useEffect(() => {
        async function getSiteInfo() {

            try {
                const siteInfoApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/site-info/2`)
                setSiteInfo(siteInfoApi.data);
                setPaymentDetails(prevState => {
                    return {
                        ...prevState,
                        serviceType: "Normal",
                        serviceFees: siteInfoApi.data.regularServiceFee,
                        taxPercent: siteInfoApi.data.vatPc
                    };
                })
            } catch (error) {
            }
        }
        getSiteInfo();
    }, []);


    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=ASckhbRN0og6FnUdRNsx3qRelX2rp8o8jYd_KBldZm90oNq2uSalujrw4ZcSYuiKCWBlAsImvfZqMhWm&components=buttons,marks";
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    const razarpay = document.createElement('script');
    razarpay.src = "https://checkout.razorpay.com/v1/checkout.js";
    razarpay.async = true;

    // Append the script to the body
    document.body.appendChild(razarpay);
    document.body.removeChild(razarpay);

    // Clean up function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

    const totalTax = (((paymentDetails.noOfApplicant * paymentDetails.visaFees) + (paymentDetails.noOfApplicant * paymentDetails.serviceFees)) * paymentDetails.taxPercent / 100);
    const netPay = (paymentDetails.noOfApplicant * paymentDetails.visaFees) + (paymentDetails.noOfApplicant * paymentDetails.serviceFees) + ((paymentDetails.noOfApplicant * paymentDetails.visaFees + (paymentDetails.noOfApplicant * paymentDetails.serviceFees)) / 100) * paymentDetails.taxPercent

    const dateFormatString = 'd MMMM, yyyy';

    const redirectAddMoreAppl = () => {
        navigate(`/apply/${applicationDetails.displayId}`)
    }

    const handleRedirectToPayment = async () => {
        const data = {
            applicationId: applicationDetails.displayId,
            serviceType: serviceTypeValue,
        }
        try {
        const res = await axios.post(`https://ymfzdgfyzhm.emiratesevisaonline.com/payment/${paymentMethod}/order`,data,{
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.data) {
                if(paymentMethod === "Razorpay"){
                    OpenRazarpayModal(res.data);
               }else{
                   window.location.href = res.data;
               }
            }
        } catch (error) {
        }

    }

    const OpenRazarpayModal = (orderData) => {
        try {
            let name = "";
           if(primaryApplicant.firstName && primaryApplicant.lastName){
              name = `${primaryApplicant.firstName} ${primaryApplicant.lastName}`;
           }else{
            name = primaryApplicant.firstName;
           }
           
        var options = {
            "key": "rzp_test_m4z9IzcCmDwAeH", 
            "name": "Emirates E-Visa Online",
            // "image": "https://example.com/your_logo",
            "order_id": orderData,
            "handler": function (response){
                handleSaveRazorpayData(response,orderData);
            },
            "prefill": {
                "name":name,
                "email": primaryApplicant.emailId,
                "contact":`+${primaryApplicant.mobileNumber}`
            },
            "theme": {
                "color": localStorage.getItem("backgroundColor")
            }
        };
         console.log(localStorage.getItem("backgroundColor"));
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response){
                navigate(`/payment-failure/${id}?session_id=${orderData}`)
        });
       
        } catch (error) {
            // console.log(error);
        }
    }

   const handleSaveRazorpayData = async(response,orderId) => {
            //  after api redirecting to success screen
            navigate(`/payment-success/${id}?session_id=${orderId}&payment_id=${response.razorpay_payment_id}&signature=${response.razorpay_signature}`);
    }

    const handleRadioChange = (e) => {
        setPaymentMethod(e.target.value)
    }

    return (
        loading ? <div>Loading ....</div> :
        <>
            <section className="breadcrumb-spacing" style={{ backgroundImage: `url("../img/bg/applynow.avif")` }}>
                {showApiLoader && <ApiLoader />}
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

                                                        <tr key={index + 1}>
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
                                                                        <Link to={`/applicant/edit/${btoa(item.id)}`}> Edit </Link>
                                                                        :
                                                                        <Link to={`/applicant/edit/${btoa(item.id)}`}> Edit  </Link>
                                                                }

                                                            </td>
                                                        </tr>

                                                    )) :
                                                    'Nothing Found !!!'
                                            }

                                        </table>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button className="btn button" id="checkout-button" name="proceedFinal" onClick={redirectAddMoreAppl}> Add More Applicants</button>
                                    </div>
                                </div>

                            </div>

                            {/*<div className="note_check">
                                <p className="">Users residing in India are recommended to use the PhonePe gateway for seamless payments.</p>
                            </div>*/}

                        </div>

                        <div className="col-md-4">
                            <div className="side_table_s">

                                <table className="tableStyle1" id="payment_box">
                                    <tr>
                                        <th colSpan="2">PAYMENT DETAILS</th>
                                    </tr>

                                    <tr>
                                        <td>No. Of Applicant</td>
                                        <td>{paymentDetails.noOfApplicant ? paymentDetails.noOfApplicant : "-"}</td>
                                    </tr>

                                    <tr>
                                        <td>Total Visa Fees</td>
                                        <td>{paymentDetails.noOfApplicant * paymentDetails.visaFees ? paymentDetails.noOfApplicant * paymentDetails.visaFees : "-"} USD</td>
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
                                        <td>{paymentDetails.serviceFees ? paymentDetails.noOfApplicant * paymentDetails.serviceFees : "-"} USD</td>
                                    </tr>

                                    <tr>
                                        <td>Tax({paymentDetails.taxPercent}%)</td>
                                        <td>{totalTax ? totalTax.toFixed(2) : "-"} USD</td>
                                    </tr>

                                    <tr>
                                        <td className="ftr_l">Net Pay</td>
                                        <td className="ftr_r">{netPay ? netPay.toFixed(2) : "-"} USD</td>
                                    </tr>

                                </table>

                            
                                <div className='col-12 payment-gateway-cont'>
                                    <div>Choose Gateway</div>
                                    <div>
                                        <input
                                            type="radio"
                                            name='payments-method'
                                            // id='uaeVisitF'
                                            onChange={handleRadioChange}
                                            value="Stripe"
                                            checked={paymentMethod === "Stripe" ? true : false}
                                        />
                                        <img className='ml-1' src="../img/stripeicon.jpeg" alt="stripe-logo" loading="lazy"/>
                                    </div>
                                     <div>
                                        <input
                                            type="radio"
                                            name='payments-method'
                                            // id='uaeVisitF'
                                            onChange={handleRadioChange}
                                            value="PayPal"
                                            checked={paymentMethod === "PayPal" ? true : false}
                                        />
                                        <img className='ml-1' src="../img/paypalicon.png" alt="paypal-logo" />
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            name='payments-method'
                                            // id='uaeVisitF'
                                            onChange={handleRadioChange}
                                            value="Razorpay"
                                            checked={paymentMethod === "Razorpay" ? true : false}
                                        />
                                        {/* <img className='ml-1' src="../img/paypalicon.png" alt="paypal-logo" /> */}
                                        Razorpay
                                    </div>
                                    {/* <div>
                                        <input
                                            type="radio"
                                            name='payments-method'
                                            // id='uaeVisitF'
                                            onChange={handleRadioChange}
                                            value="PhonePe"
                                            checked={paymentMethod === "PhonePe" ? true : false}
                                        />
                                        <img style={{height:"30px"}} src="../img/phonepeicon.png" alt="phonepe-logo" loading="lazy"/>

                                    </div> */}
                                </div>
                               {paymentMethod === "PayPal" ?
                                <PayPalGateway
                                paymentMethod={paymentMethod}
                                applicationId={applicationDetails.displayId}
                                serviceType={serviceTypeValue}
                               />  :
                               <button  type="submit" className="btn button" id="checkout-button" name="proceedFinal" onClick={handleRedirectToPayment}> Proceed
                                    Now</button>}
                                   

                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
};

export default Checkout;