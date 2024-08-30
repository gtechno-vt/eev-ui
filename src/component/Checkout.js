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
    const [paymentMethod, setPaymentMethod] = useState("MamoPay");
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
                const primaryApp = applicatntApi.data.find(ele => ele.isPrimary);
                if(primaryApp){
                    setPrimaryApplicant(primaryApp);
                }
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
            "key": "rzp_live_mLfB6rei9hUSrZ",
            "name": "Emirates E-Visa Online",
            "image": "data:image/png;base64,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",
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
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response){
                let redirectUrl = `https://voltechsoftware.com/?redirect=https://www.emiratesevisaonline.com/payment-failure/${id}?session_id=${orderData}&payment_id=${response.razorpay_payment_id}&signature=${response.razorpay_signature}`;
                window.location.href = redirectUrl;
        });
       
        } catch (error) {
            // console.log(error);
        }
    }

   const handleSaveRazorpayData = async(response,orderId) => {
            //  after api redirecting to success screen
            // navigate(`/payment-success/${id}?session_id=${orderId}&payment_id=${response.razorpay_payment_id}&signature=${response.razorpay_signature}`);
            let redirectUrl = `https://voltechsoftware.com/?redirect=https://www.emiratesevisaonline.com/payment-success/${id}?session_id=${orderId}&payment_id=${response.razorpay_payment_id}&signature=${response.razorpay_signature}`;
            window.location.href = redirectUrl;
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
                                <p className="">Users residing in India are recommended to use the Razorpay gateway for seamless payments.</p>
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
                                            onChange={handleRadioChange}
                                            value="MamoPay"
                                            checked={paymentMethod === "MamoPay" ? true : false}
                                        />
                                        <img className='ml-1' src="../img/mamopay-icon.jpeg" alt="mamopay-logo"/>
                                    </div>
                                    {/*<div>
                                        <input
                                            type="radio"
                                            name='payments-method'
                                            // id='uaeVisitF'
                                            onChange={handleRadioChange}
                                            value="Stripe"
                                            checked={paymentMethod === "Stripe" ? true : false}
                                        />
                                        <img className='ml-1' src="../img/stripeicon.jpeg" alt="stripe-logo"
                                             loading="lazy"/>
                                    </div>*/}
                                    <div>
                                        <input
                                            type="radio"
                                            name='payments-method'
                                            // id='uaeVisitF'
                                            onChange={handleRadioChange}
                                            value="PayPal"
                                            checked={paymentMethod === "PayPal" ? true : false}
                                        />
                                        <img className='ml-1' src="../img/paypalicon.png" alt="paypal-logo"/>
                                    </div>
                                    {/*<div>
                                        <input
                                            type="radio"
                                            name='payments-method'
                                            // id='uaeVisitF'
                                            onChange={handleRadioChange}
                                            value="Razorpay"
                                            checked={paymentMethod === "Razorpay" ? true : false}
                                        />
                                        {<img className='ml-1' src="../img/razorpay-icon.png" alt="razorpay-logo" /> }
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            name='payments-method'
                                            // id='uaeVisitF'
                                            onChange={handleRadioChange}
                                            value="Worldline"
                                            checked={paymentMethod === "Worldline" ? true : false}
                                        />
                                        {<img className='ml-1' src="../img/worldline-icon.svg" alt="worldline-logo" /> }
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
                                    /> :
                                    <button type="submit" className="btn button" id="checkout-button"
                                            name="proceedFinal" onClick={handleRedirectToPayment}> Proceed
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