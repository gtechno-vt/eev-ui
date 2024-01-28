import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addMonths } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { isValidEmail } from '../utils/StaticFunctions';
import { isValidMobile } from '../utils/StaticFunctions';
import ApiLoader from './ApiLoader';

const Apply = ({update,doc,displayId}) => {

    const { id } = useParams();
    const navigate = useNavigate();
  
    const [allCountry, setAllCountry] = useState([]);
    const [leadData, setLeadData] = useState({KnowUae:false,uaeVisit:false});
    const [applicationData, setApplicationData] = useState([]);
    const [allApplicantList,setAllApplicantList] = useState([])

    const [selectedFile, setSelectedFile] = useState("");
    const [selectedFilePhoto, setSelectedFilePhoto] = useState("");
    const [selectedFileDoc, setSelectedFileDoc] = useState("");
    const [showApiLoader,setShowApiLoader] = useState(false);


    //== = 
    useEffect(() => {
        
        async function getApplicationData() {

            try {
                if(update){
                setShowApiLoader(true);
                const applicationApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant/${id}`)
                setShowApiLoader(false);
                setApplicationData(applicationApi.data);
                const data = applicationApi.data;
                setLeadData({
                    firstName:data.firstName || "",
                    lastName:data.lastName || "",
                    dob:data.dob ? format(data.dob, 'yyyy-MM-dd') :"",
                    emailId:data.emailId || "",
                    countryCode:data.mobileNumber?.split("-")[0] ? data.mobileNumber?.split("-")[0]: "",
                    mobileNumber:data.mobileNumber?.split("-")[1] ? Number(data.mobileNumber?.split("-")[1]): "",
                    passportNumber:data.passportNumber || "",
                    passportExpiryDate:data.passportExpiryDate ? format(data.passportExpiryDate, 'yyyy-MM-dd') : "",
                    KnowUae:data.isContactInForeignCountry,
                    uaeVisit:data.isFirstForeignVisit,
                })

                setShowApiLoader(true);
                const res = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant?applicationDisplayId=${data.application.displayId}`)
                setShowApiLoader(false);              
                setAllApplicantList(res.data)

               }else{
                setShowApiLoader(true);
                const applicationApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant?applicationDisplayId=${id}`)
                setShowApiLoader(false);
                setApplicationData(applicationApi?.data[0] || {});
                setAllApplicantList(applicationApi.data)
               }
               
            } catch (error) {
                setShowApiLoader(false);
                console.log("Something is Wrong");
            }
        }

        async function getCountry() {

            try {
                setShowApiLoader(true);
                const countryApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/country/basic`)
                setShowApiLoader(false);
                setAllCountry(countryApi.data);
            } catch (error) {
                setShowApiLoader(false);
                console.log("Something is Wrong");
            }
        }

        getApplicationData();
        getCountry();
    }, [id]);

    //====

    // === Form Submit Start Here -=====
    async function onTextFieldChange(e) {
        console.log(e.target.value);
        setLeadData({
            ...leadData,
            [e.target.name]: e.target.value
        })
    }

   const handleFileUpload = (id) => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            axios.post(`https://dgf0agfzdhu.emiratesevisaonline.com/document/${id}/PASSPORT/upload`, formData)
                .then((res) => {
                    console.log(res);
                }).catch(error => {
                    console.log("My Error Passport-" + error);
                    window.scrollTo({ top: 0, behavior: 'smooth' });        
                })
            }


        if(selectedFilePhoto){

            const formDataPhoto = new FormData();
            formDataPhoto.append("file", selectedFilePhoto);

            axios.post(`https://dgf0agfzdhu.emiratesevisaonline.com/document/${id}/PHOTOGRAPH/upload`, formDataPhoto)
                .then((res) => {
                    console.log(res);
                }).catch(error => {
                    console.log("My Error Photo-" + error);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
        
        }

        if(selectedFileDoc){

            const formDataDoc = new FormData();
            formDataDoc.append("file", selectedFileDoc);

            axios.post(`https://dgf0agfzdhu.emiratesevisaonline.com/document/${id}/OTHER/upload`, formDataDoc)
                .then((res) => {
                    console.log(res);
                }).catch(error => {
                    console.log("My Error Doc-" + error);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
       
        }
    }


    async function onFormSubmit(e, scndVal) {
        e.preventDefault()

        var payloadData = (
            {
                "application": {
                    "id": applicationData?.application?.id
                },
                "residenceCountry": {
                    "id": applicationData?.residenceCountry?.id
                },
                "emailId": leadData.emailId || null,
                "firstName": leadData.firstName,
                "lastName": leadData.lastName || null,
                "dob": leadData.dob || null,
                "state": applicationData.state || null,
                "city": applicationData.city || null,
                "address": applicationData.address || null,
                "postalCode": applicationData.postalCode || null,
                "mobileNumber": leadData.countryCode && leadData.mobileNumber ? leadData.countryCode + "-" + leadData.mobileNumber: leadData.mobileNumber ? leadData.mobileNumber : null,
                // "whatsappNumber": leadData.whatsappNumber,
                "passportNumber": leadData.passportNumber,
                "profession": applicationData?.profession?.id ? {
                    "id": applicationData.profession.id
                }:null,
                "education": applicationData?.education?.id ?{
                    "id": applicationData.education.id
                }:null,
                "passportExpiryDate": leadData.passportExpiryDate,
                "isPrimary": false,
                "isContactInForeignCountry": leadData.KnowUae || leadData.KnowUae === false ? leadData.KnowUae : null,
                "isFirstForeignVisit": leadData.uaeVisit || leadData.uaeVisit === false  ? leadData.uaeVisit : null,
            }
        );

        console.log(payloadData,"payloadData");

        document.getElementById("firstName").style.border = "none";
        document.getElementById("lastName").style.border = "none";
        document.getElementById("emailId").style.border = "none";
        document.getElementById("dob").style.border = "none";
        document.getElementById("mobileNumber").style.border = "none";
        // document.getElementById("whatsappNumber").style.border = "none";
        document.getElementById("passportNumber").style.border = "none";
        document.getElementById("passportExpiryDate").style.border = "none";
        document.getElementById("countryCode").style.border = "none";
        
        // document.getElementById("arrivalDate").style.border = "none";
        // document.getElementById("passportExpiryDateDay").style.border = "none";
        // document.getElementById("passportExpiryDateMonth").style.border = "none";
        // document.getElementById("passportExpiryDateYear").style.border = "none";
        // document.getElementById("arrivalDateDay").style.border = "none";
        // document.getElementById("arrivalDateMonth").style.border = "none";
        // document.getElementById("arrivalDateYear").style.border = "none";
        let isAllRequiredDataFilled = true;
        if (!leadData.firstName) {
            document.getElementById("firstName").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
        // else
         if (leadData.emailId && !isValidEmail(leadData.emailId)) {
            document.getElementById("emailId").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        }
        // else
         if (leadData.mobileNumber && !isValidMobile(leadData.mobileNumber)) {
            document.getElementById("mobileNumber").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        }
        // else if (!leadData.countryCode) {
        //     document.getElementById("countryCode").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // }
        // else if (leadData.lastName == undefined) {
        //     document.getElementById("lastName").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } else if (leadData.emailId == undefined) {
        //     document.getElementById("emailId").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } else if (leadData.dob == undefined) {
        //     document.getElementById("dob").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
        // else if (!leadData.mobileNumber) {
        //     document.getElementById("mobileNumber").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
        // else if (leadData.whatsappNumber == undefined) {
        //     document.getElementById("whatsappNumber").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
        // else 
        if (!leadData.passportNumber) {
            document.getElementById("passportNumber").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
        // else
         if (!leadData.passportExpiryDate) {
            document.getElementById("passportExpiryDate").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        }
        if (leadData.uaeVisit == undefined) {
            // document.getElementById("arrivalDate").style.border = "1px solid red";
            // window.scrollTo({ top: 0, behavior: 'smooth' });
            isAllRequiredDataFilled = false;
        }  
         if (leadData.KnowUae == undefined) {
            // document.getElementById("arrivalDate").style.border = "1px solid red";
            // window.scrollTo({ top: 0, behavior: 'smooth' });
            isAllRequiredDataFilled = false;
        } 
        // else if (!leadData.arrivalDate) {
        //     document.getElementById("arrivalDate").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
        // else if (leadData.passportExpiryDateDay == undefined) {
        //     document.getElementById("passportExpiryDateDay").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } else if (leadData.passportExpiryDateMonth == undefined) {
        //     document.getElementById("passportExpiryDateMonth").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } else if (leadData.passportExpiryDateYear == undefined) {
        //     document.getElementById("passportExpiryDateYear").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } else if (leadData.arrivalDateDay == undefined) {
        //     document.getElementById("arrivalDateDay").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } else if (leadData.arrivalDateMonth == undefined) {
        //     document.getElementById("arrivalDateMonth").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } else if (leadData.arrivalDateYear == undefined) {
        //     document.getElementById("arrivalDateYear").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
        // else if (leadData.KnowUae == undefined) {
        //     // document.getElementById("arrivalDate").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
        // else if (!leadData.uaeVisit == undefined) {
        //     // document.getElementById("arrivalDate").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
        if(isAllRequiredDataFilled){

            try {
              if(update){
                // for update flow
                setShowApiLoader(true)
                await axios.put(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant/${id}`, payloadData)
                .then((res) => {
                    setShowApiLoader(false)
                    document.getElementById("succ_message").style.display = "block";
                    document.getElementById("alert_message").innerHTML = "Applicant Submitted Succesfully!";
                    setLeadData({});
                    setSelectedFile("")
                    setSelectedFileDoc("")
                    setSelectedFilePhoto("")
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    console.log(res);
                    setTimeout(() => {
                        if(document.getElementById("succ_message")){
                            document.getElementById("succ_message").style.display = "none";
                        }
                    }, 5000);
                    handleFileUpload(res.data.id)
                    
                    if (scndVal == 'add') {
                        navigate('/apply/' + res?.data?.application?.displayId);
                    } else {
                        navigate('/checkout/' + res?.data?.application?.displayId);
                    }
                });
              } else{
                //  for normal add flow
                setShowApiLoader(true)
                await axios.post(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant`, payloadData)
                .then((res) => {
                    setShowApiLoader(false)
                    document.getElementById("succ_message").style.display = "block";
                    document.getElementById("alert_message").innerHTML = "Applicant Submitted Succesfully!!!";
                    setLeadData({KnowUae:false,uaeVisit:false});
                    setSelectedFile("")
                    setSelectedFileDoc("")
                    setSelectedFilePhoto("");

                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    console.log(res);
                    setTimeout(() => {
                       if(document.getElementById("succ_message")){
                        document.getElementById("succ_message").style.display = "none";
                       }
                    }, 5000);
                    handleFileUpload(res.data.id)
                    
                    if (scndVal == 'add') {
                        navigate('/apply/' + res?.data?.application?.displayId);
                        setShowApiLoader(true);
                axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant?applicationDisplayId=${id}`).then(applicationApi => {
                    setAllApplicantList(applicationApi.data)
                })
                setShowApiLoader(false);
                    } else {
                        navigate('/checkout/' + res?.data?.application?.displayId);
                    }
                });
              } 
             
            } catch (error) {
                setShowApiLoader(false)
                console.log(error);
                alert("Something is Wrong");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }else{
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    const handleRadioChange = (e,val) => {
        console.log(val,typeof val);
            console.log(e.target.checked);
            setLeadData({
                ...leadData,
                [e.target.name]: val
            })
    }
    // = Form Submit #END Here...
    const handleSkipClick = () => {
        if(update){
            navigate(`/checkout/${displayId}`)
            return;
        }
        navigate(`/checkout/${id}`)
    }

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const currentDate = new Date();

    
    const months = Array.from({ length: 12 }, (_, index) =>
        format(addMonths(currentDate, index), 'MMMM')
    );

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, index) => currentYear + index);
    console.log(leadData, "leadData");
    const dateFormatString = 'd MMMM, yyyy';
    const todayDate =  new Date().toJSON().slice(0,10);
    return (
        <>
            <section className="breadcrumb-spacing" style={{ backgroundImage: `url("../img/bg/applynow.jpg")` }}>
            {showApiLoader && <ApiLoader/>}
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumb_title">
                                <h3 className="page-title">Apply Now</h3>
                                <div className="breadcrumb_menu">
                                    <ul className="trail_items">
                                        <li><a href="/"> Home</a></li>
                                        <li className="active">Apply Now</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="apply_now_form">
                <div className="container">

                    <div className="All_heading">
                        <h3 className="apply_title">Dubai Visa Application Form</h3>
                        <span></span>
                    </div>

                    <div className="row">

                        <div className="col-md-12">
                            <div className="form_start">
                                <div id="succ_message">
                                    <div id='alert_message'></div>
                                </div>
                                <form>
                                    
                                    <div class="box_shadow">
                                        <div class="title">
                                            <h3>Add More Applicant's Details </h3>
                                        </div>
                                        <div class="box_shadow_pd">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>First name <sup>*</sup></label>
                                                        <input 
                                                            type="text" 
                                                            placeholder="Enter First Name" 
                                                            name='firstName'
                                                            id='firstName'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.firstName || ""}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Last name</label>
                                                        <input 
                                                            type="text" 
                                                            placeholder="Enter Last Name" 
                                                            name='lastName'
                                                            id='lastName'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.lastName || ""}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Date Of Birth </label>
                                                        <input 
                                                            type="date" 
                                                            name='dob'
                                                            id='dob'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.dob || ""}
                                                            max={todayDate}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Email</label>
                                                        <input 
                                                            type="email" 
                                                            name='emailId'
                                                            id='emailId'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.emailId || ""}
                                                            placeholder="example@example.com" 
                                                        />
                                                    </div>
                                                </div>

                                                <div class="col-md-3">
                                                <div className="form-group">
                                                        <label>Country Code </label>
                                                        <select
                                                             name="countryCode"
                                                             id='countryCode'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.countryCode || ""}
                                                        >
                                                            <option value="">Select Country Code</option>
                                                            {
                                                                allCountry && allCountry.length > 0 ?
                                                                    allCountry.map((item, index) => (
                                                                        <option selected={item.countryCode === leadData.countryCode} key={index + 1} value={item.countryCode}>{item.name} ({item.countryCode})</option>
                                                                    )) :
                                                                    ''
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Mobile Number</label>
                                                        <input
                                                            name='mobileNumber'
                                                            id='mobileNumber'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.mobileNumber || ""}
                                                            type="number"
                                                            placeholder="Enter Mobile Number"
                                                            maxLength="10"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Passport Number <sup>*</sup></label>
                                                        <input
                                                            type="text"
                                                            name='passportNumber'
                                                            id='passportNumber'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.passportNumber || ""}
                                                            placeholder="Enter Passport Number"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Passport Expiry Date <sup>*</sup></label>

                                                        {/* <div className="date_gap">
                                                            <select
                                                                name="passportExpiryDateDay"
                                                                id='passportExpiryDateDay'
                                                                onChange={e => onTextFieldChange(e)}
                                                                value={leadData.passportExpiryDateDay}
                                                            >
                                                                <option value="">Day</option>
                                                                <option value="01">01</option>
                                                                <option value="02">02</option>
                                                                <option value="03">03</option>
                                                                <option value="04">04</option>
                                                                <option value="05">05</option>
                                                                <option value="06">06</option>
                                                                <option value="07">07</option>
                                                                <option value="08">08</option>
                                                                <option value="09">09</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                                <option value="12">12</option>
                                                                <option value="13">13</option>
                                                                <option value="14">14</option>
                                                                <option value="15">15</option>
                                                                <option value="16">16</option>
                                                                <option value="17">17</option>
                                                                <option value="18">18</option>
                                                                <option value="19">19</option>
                                                                <option value="20">20</option>
                                                                <option value="21">21</option>
                                                                <option value="22">22</option>
                                                                <option value="23">23</option>
                                                                <option value="24">24</option>
                                                                <option value="25">25</option>
                                                                <option value="26">26</option>
                                                                <option value="27">27</option>
                                                                <option value="28">28</option>
                                                                <option value="29">29</option>
                                                                <option value="30">30</option>
                                                                <option value="31">31</option>
                                                            </select>

                                                            <select
                                                                name="passportExpiryDateMonth"
                                                                id='passportExpiryDateMonth'
                                                                onChange={e => onTextFieldChange(e)}
                                                                value={leadData.passportExpiryDateMonth}
                                                            >
                                                                <option value="">Month</option>
                                                                <option value="01">January</option>
                                                                <option value="02">February</option>
                                                                <option value="03">March</option>
                                                                <option value="04">April</option>
                                                                <option value="05">May</option>
                                                                <option value="06">June</option>
                                                                <option value="07">July</option>
                                                                <option value="08">August</option>
                                                                <option value="09">September</option>
                                                                <option value="10">October</option>
                                                                <option value="21">November</option>
                                                                <option value="12">December</option>
                                                               

                                                            </select>

                                                            <select
                                                                name="passportExpiryDateYear"
                                                                id='passportExpiryDateYear'
                                                                onChange={e => onTextFieldChange(e)}
                                                                value={leadData.passportExpiryDateYear}
                                                            >
                                                                <option value="">Year</option>
                                                                {years.map((year, index) => (
                                                                    <option key={index} value={year}>{year}</option>
                                                                ))}
                                                            </select>

                                                        </div> */}
                                                         <input
                                                            name='passportExpiryDate'
                                                            id='passportExpiryDate'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.passportExpiryDate || ""}
                                                            type="date"
                                                            placeholder="YYYY-MM-DD"
                                                            min={todayDate}
                                                        />

                                                    </div>
                                                </div>

                                                {/* <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Arrival Date <sup>*</sup></label>

                                                        <div className="date_gap">
                                                            <select
                                                                name="arrivalDateDay"
                                                                id='arrivalDateDay'
                                                                onChange={e => onTextFieldChange(e)}
                                                                value={leadData.arrivalDateDay}
                                                            >
                                                                <option value="">Day</option>
                                                                <option value="01">01</option>
                                                                <option value="02">02</option>
                                                                <option value="03">03</option>
                                                                <option value="04">04</option>
                                                                <option value="05">05</option>
                                                                <option value="06">06</option>
                                                                <option value="07">07</option>
                                                                <option value="08">08</option>
                                                                <option value="09">09</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                                <option value="12">12</option>
                                                                <option value="13">13</option>
                                                                <option value="14">14</option>
                                                                <option value="15">15</option>
                                                                <option value="16">16</option>
                                                                <option value="17">17</option>
                                                                <option value="18">18</option>
                                                                <option value="19">19</option>
                                                                <option value="20">20</option>
                                                                <option value="21">21</option>
                                                                <option value="22">22</option>
                                                                <option value="23">23</option>
                                                                <option value="24">24</option>
                                                                <option value="25">25</option>
                                                                <option value="26">26</option>
                                                                <option value="27">27</option>
                                                                <option value="28">28</option>
                                                                <option value="29">29</option>
                                                                <option value="30">30</option>
                                                                <option value="31">31</option>
                                                            </select>

                                                            <select
                                                                name="arrivalDateMonth"
                                                                id='arrivalDateMonth'
                                                                onChange={e => onTextFieldChange(e)}
                                                                value={leadData.arrivalDateMonth}
                                                            >
                                                                <option value="">Month</option>
                                                                <option value="01">January</option>
                                                                <option value="02">February</option>
                                                                <option value="03">March</option>
                                                                <option value="04">April</option>
                                                                <option value="05">May</option>
                                                                <option value="06">June</option>
                                                                <option value="07">July</option>
                                                                <option value="08">August</option>
                                                                <option value="09">September</option>
                                                                <option value="10">October</option>
                                                                <option value="21">November</option>
                                                                <option value="12">December</option>

                                                               
                                                            </select>

                                                            <select
                                                                name="arrivalDateYear"
                                                                id='arrivalDateYear'
                                                                onChange={e => onTextFieldChange(e)}
                                                                value={leadData.arrivalDateYear}
                                                            >
                                                                <option value="">Year</option>
                                                                {years.map((year, index) => (
                                                                    <option key={index} value={year}>{year}</option>
                                                                ))}
                                                            </select>

                                                        </div>

                                                    </div>
                                                </div> */}
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>First UAE Visit? <sup>*</sup> </label>

                                                        <div className="radio_btn">
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    name='uaeVisit'
                                                                    id='uaeVisitF'
                                                                    onChange={e => handleRadioChange(e,true)}
                                                                    // value={}
                                                                    checked={leadData.uaeVisit ? true : false}
                                                                />
                                                                Yes
                                                            </label>

                                                            <label >
                                                                <input
                                                                    type="radio"
                                                                    name='uaeVisit'
                                                                    id='uaeVisitS'
                                                                    onChange={e => handleRadioChange(e,false)}
                                                                    // value={leadData.uaeVisit === false ? true:false}
                                                                    checked={leadData.uaeVisit === false ? true:false}
                                                                />
                                                                No
                                                            </label>

                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="col-md-8">
                                                    <div className="form-group">
                                                        <label>Is There Any family/friends/Known Person of yours in UAE? <sup>*</sup></label>

                                                        <div className="radio_btn">
                                                            <label >
                                                                <input
                                                                    type="radio"
                                                                    name='KnowUae'
                                                                    id='KnowUae'
                                                                    onChange={e => handleRadioChange(e,true)}
                                                                    // value={leadData.KnowUae}
                                                                    checked={leadData.KnowUae ? true :false}
                                                                />
                                                                Yes
                                                            </label>

                                                            <label >
                                                                <input
                                                                    type="radio"
                                                                    name='KnowUae'
                                                                    id='KnowUaeS'
                                                                    onChange={e => handleRadioChange(e,false)}
                                                                    // value={leadData.KnowUae}
                                                                    checked={leadData.KnowUae === false ? true : false}
                                                                />
                                                                No
                                                            </label>

                                                        </div>

                                                    </div>
                                                </div>

                                                
                                            </div>
                                        </div>
                                    </div>

                                    

                                    <div className="box_shadow">
                                        <div className="title">
                                            <h3>Upload Documents </h3>
                                        </div>
                                        <div className="box_shadow_pd">
                                            <div className="row">


                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Colored Passport</label>
                                                       {doc?.passportDocument ? <a download={`passport.${doc.passportMediaType}`} href={doc.passportDocument} className='doc-down-anchor'>{`Passport.${doc.passportMediaType}`}</a>
                                                    : doc?.passportDocument || doc?.photoDocument || doc?.otherDocument ? <a className='doc-down-anchor'></a> 
                                                    : ""   
                                                    }
                                                        <input 
                                                            type="file" 
                                                            multiple="multiple" 
                                                            className="form-control" 
                                                            onChange={e => setSelectedFile(e.target.files[0])} 
                                                        />
                                                    </div>
                                                    {/* <div className="form-group pic">
                                                        <div className="set">
                                                            <img id="blah" src="../img/passport.jpg" alt="your image" />
                                                        </div>
                                                        <label>Colored Passport copy</label>
                                                    </div> */}
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Colored photograph</label>
                                                        {doc?.photoDocument ? 
                                                        <a download={`passport.${doc.photoMediaType}`} href={doc.photoDocument} className='doc-down-anchor'>{`Photo.${doc.photoMediaType}`}</a>
                                                         : doc?.passportDocument || doc?.photoDocument || doc?.otherDocument ? <a className='doc-down-anchor'></a> 
                                                         : ""}
                                                        <input 
                                                            type="file" 
                                                            multiple="multiple" 
                                                            className="form-control" 
                                                            onChange={e => setSelectedFilePhoto(e.target.files[0])} 
                                                        />
                                                    </div>
                                                    {/* <div className="form-group pic">
                                                        <div className="set">
                                                            <img id="blah1" src="../img/dummy-avatar.jpg" alt="your image" />
                                                        </div>
                                                        <label>Colored photograph</label>
                                                    </div> */}
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Others</label>
                                                        {doc?.otherDocument ? <a download={`passport.${doc.otherDocumentMediaType}`} href={doc.otherDocument} className='doc-down-anchor'>{`OtherDoc.${doc.otherDocumentMediaType}`}</a>
                                                       : doc?.passportDocument || doc?.photoDocument || doc?.otherDocument ? <a className='doc-down-anchor'></a> 
                                                       : ""    
                                                    }
                                                        <input 
                                                            type="file" 
                                                            multiple="multiple" 
                                                            className="form-control" 
                                                            onChange={e => setSelectedFileDoc(e.target.files[0])} 
                                                        />
                                                    </div>
                                                    {/* <div className="form-group pic">
                                                        <div className="set">
                                                            <img id="blah1" src="../img/dummy-avatar.jpg" alt="your image" />
                                                        </div>
                                                        <label>Colored photograph</label>
                                                    </div> */}
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <div className="note">
                                                            <p><b>Note:</b> <ul><li> Upload of passport and photograph are not mandatory to complete the visa application form. You can provide us these documents later also on email: contact@emiratesevisaonline.com or on WhatsApp +971-569013615</li><li> Supported Document Formats - PDF, JPG, JPEG, PNG, DOC, DOCX</li></ul></p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="btn_d_flex">
                                                  { !update  ?
                                                  <>
                                                  <button
                                                        type="button"
                                                        onClick={e => onFormSubmit(e, 'add')}
                                                        className="green"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" /></svg>
                                                        Add More Applicants
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="red"
                                                        onClick={e => onFormSubmit(e, 'submit')}
                                                    >
                                                        Submit Application
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="teal"
                                                        onClick={handleSkipClick}
                                                    >
                                                        Skip
                                                    </button>
                                                    </> :
                                                    <>
                                                   <button
                                                   type="button"
                                                   className="red"
                                                   onClick={e => onFormSubmit(e, 'submit')}
                                               >
                                                   Update Application
                                               </button> 
                                                <button
                                                type="button"
                                                className="teal"
                                                onClick={handleSkipClick}
                                            >
                                                Skip
                                            </button>                                                  
                                            </>
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
                                                allApplicantList && allApplicantList.length > 0 ?
                                                allApplicantList.map((item, index) => (

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
                                                                        <Link to={`/applicant/edit/${item.id}`}> Edit </Link>
                                                                        :
                                                                        <Link to={`/applicant/edit/${item.id}`}> Edit  </Link>
                                                                }

                                                            </td>
                                                        </tr>

                                                    )) :
                                                    'Nothing Found !!!'
                                            }

                                        </table>
                                    </div>
                                    {/* <div className='d-flex justify-content-center'>
                                        <button className="btn button" id="checkout-button" name="proceedFinal" onClick={redirectAddMoreAppl}> Add More Applicants</button>
                                    </div> */}
                                </div>

                            </div>

        

                                </form>
                            </div>
                        </div>


                    </div>

                </div>


            </section>


        </>
    )
};

export default Apply;