import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addMonths } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const EditApplicant = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [allCountry, setAllCountry] = useState([]);
    const [visaType, setVisaType] = useState([]);
    const [education, setEducation] = useState([]);
    const [profession, setProfession] = useState([]);
    const [purposeOfVisit, setPurposeOfVisit] = useState([]);

    const [leadData, setleadData] = useState([]);
    const [applicatDetails, setApplicatDetails] = useState([]);
    const [documentFiles, setDocumentFiles] = useState([]);

    const [selectedFile, setSelectedFile] = useState({ file : null });
    const [selectedFilePhoto, setSelectedFilePhoto] = useState({ file : null });
    const [selectedFileDoc, setSelectedFileDoc] = useState({ file : null });



    useEffect(() => {

        async function getCountry() {

            try {
                const countryApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/country/basic`)
                setAllCountry(countryApi.data);
            } catch (error) {
                console.log("Something is Wrong");
            }
        }

        async function getVisaType() {
            try {
                const visaTypeApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/visaVariant/0/48?fetchImages=false`)
                setVisaType(visaTypeApi.data);
            } catch (error) {
                console.log("Something is Wrong Visa Type");
            }
        }

        async function getEducation() {
            try {
                const educationApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/education`)
                setEducation(educationApi.data);
            } catch (error) {
                console.log("Something is Wrong Visa Type");
            }
        }

        async function getProfession() {
            try {
                const professionApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/profession`)
                setProfession(professionApi.data);
            } catch (error) {
                console.log("Something is Wrong Visa Type");
            }
        }

        async function getPurposeVisit() {
            try {
                const purposeApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/purpose-of-visit`)
                setPurposeOfVisit(purposeApi.data);
            } catch (error) {
                console.log("Something is Wrong Visa Type");
            }
        }

        async function getApplicationDetails() {
            try {
                const appApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant/${id}`)
                setApplicatDetails(appApi.data);
                setEducationF(appApi.data.education.id);
                setProfessionF(appApi.data.profession.id);
                setleadData(appApi.data);


            } catch (error) {
                console.log("Something is Wrong Visa Type");
            }
        }

        async function getDocumentFiles() {
            try {
                const appApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/document?applicantId=${id}`)
                if(appApi.data[0].id != undefined){
                    setDocumentFiles(appApi.data);
                }
                console.log(appApi.data[0].id);
            } catch (error) {
                console.log("Something is Wrong Visa Type");
            }
        }

        getCountry();
        getVisaType();
        getEducation();
        getProfession();
        getPurposeVisit();
        getApplicationDetails();
        getDocumentFiles();
    }, [id]);

    // === Form Submit Start Here -=====
    async function onTextFieldChange(e) {
        setleadData({
            ...leadData,
            [e.target.name]: e.target.value
        })
    }

    const [citizenshipCountry, setCitizenshipCountry] = useState("0");
    function onCitizen(e) {
        setCitizenshipCountry(e.target.value)
    }

    const [destinationCountry, setDestinationCountry] = useState("0");
    function onDestination(e) {
        setDestinationCountry(e.target.value)
    }

    const [visaVariant, setVisaVariant] = useState("0");
    function onVisaVariant(e) {
        setVisaVariant(e.target.value)
    }


    const [professionF, setProfessionF] = useState("0");
    function OnProfessionF(e) {
        setProfessionF(e.target.value)
    }

    const [educationF, setEducationF] = useState("0");
    function onEducation(e) {
        setEducationF(e.target.value)
    }

    async function onFormSubmit(e, scndVal) {
        e.preventDefault()

        var uaeVisitData =false;
        var KnowUaeData = false;
        if(leadData.uaeVisit == undefined){
            uaeVisitData = false;
        } else {
            uaeVisitData = leadData.uaeVisit;
        }

        if(leadData.KnowUae == undefined){
            KnowUaeData = false;
        } else {
            KnowUaeData = leadData.KnowUae;
        }

        var payloadData = (

            {
                "application": {
                    "id": applicatDetails.application.id
                },
                "residenceCountry": {
                    "id": applicatDetails.residenceCountry.id
                },
                "emailId": leadData.emailId,
                "firstName": leadData.firstName,
                "lastName": leadData.lastName,
                "state": leadData.state,
                "city": leadData.city,
                "address": leadData.address,
                "postalCode": leadData.postalCode,
                "mobileNumber": leadData.mobileNumber,
                "whatsappNumber": leadData.whatsappNumber,
                "passportNumber": leadData.passportNumber,
                "profession": {
                    "id": professionF
                },
                "education": {
                    "id": educationF
                },
                "passportExpiryDate": leadData.passportExpiryDateYear + "-" + leadData.passportExpiryDateMonth + "-" + leadData.passportExpiryDateDay,
                "isPrimary": false,
                "isContactInForeignCountry": KnowUaeData,
                "isFirstForeignVisit": uaeVisitData
            }

        );

       

        document.getElementById("firstName").style.border = "1px solid #ccc";
        document.getElementById("lastName").style.border = "1px solid #ccc";
        document.getElementById("dob").style.border = "1px solid #ccc";
        document.getElementById("emailId").style.border = "1px solid #ccc";
        document.getElementById("educationF").style.border = "1px solid #ccc";
        document.getElementById("professionF").style.border = "1px solid #ccc";
        document.getElementById("purposeOfVisit").style.border = "1px solid #ccc";
        document.getElementById("countryCode").style.border = "1px solid #ccc";
        document.getElementById("mobileNumber").style.border = "1px solid #ccc";
        document.getElementById("countryCodeWhatsapp").style.border = "1px solid #ccc";
        document.getElementById("whatsappNumber").style.border = "1px solid #ccc";
        document.getElementById("address").style.border = "1px solid #ccc";
        document.getElementById("city").style.border = "1px solid #ccc";
        document.getElementById("state").style.border = "1px solid #ccc";
        document.getElementById("residenceCountry").style.border = "1px solid #ccc";
        document.getElementById("postalCode").style.border = "1px solid #ccc";
        document.getElementById("passportNumber").style.border = "1px solid #ccc";
        document.getElementById("passportExpiryDateDay").style.border = "1px solid #ccc";
        document.getElementById("passportExpiryDateMonth").style.border = "1px solid #ccc";
        document.getElementById("passportExpiryDateYear").style.border = "1px solid #ccc";
        document.getElementById("arrivalDateDay").style.border = "1px solid #ccc";
        document.getElementById("arrivalDateMonth").style.border = "1px solid #ccc";
        document.getElementById("arrivalDateYear").style.border = "1px solid #ccc";

        if (leadData.firstName == undefined) {
            document.getElementById("firstName").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.lastName == undefined) {
            document.getElementById("lastName").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.emailId == undefined) {
            document.getElementById("emailId").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.dob == undefined) {
            document.getElementById("dob").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.mobileNumber == undefined) {
            document.getElementById("mobileNumber").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.whatsappNumber == undefined) {
            document.getElementById("whatsappNumber").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.passportNumber == undefined) {
            document.getElementById("passportNumber").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.passportExpiryDateDay == undefined) {
            document.getElementById("passportExpiryDateDay").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.passportExpiryDateMonth == undefined) {
            document.getElementById("passportExpiryDateMonth").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.passportExpiryDateYear == undefined) {
            document.getElementById("passportExpiryDateYear").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.arrivalDateDay == undefined) {
            document.getElementById("arrivalDateDay").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.arrivalDateMonth == undefined) {
            document.getElementById("arrivalDateMonth").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (leadData.arrivalDateYear == undefined) {
            document.getElementById("arrivalDateYear").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }else {

            try {
                await axios.put(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant/${id}`, payloadData)
                    .then((res) => {
                        document.getElementById("succ_message").style.display = "block";
                        document.getElementById("alert_message").innerHTML = "Your Query has been Submitted Succesfully!!! We will get back to you.";
                        window.scrollTo({ top: 0, behavior: 'smooth' });


                        // Upload Documents..
                        //

                        
                        try {

                            const formData = new FormData();
                            formData.append("file", selectedFile);
                
                            axios.post(`https://dgf0agfzdhu.emiratesevisaonline.com/document/${res.data.id}/PASSPORT/upload`, formData)
                                .then((res) => {
                                    console.log(res);
                                });
                        } catch (error) {
                            console.log("My Error Passport-"+error);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }

                        try {

                            const formDataPhoto = new FormData();
                            formDataPhoto.append("file", selectedFilePhoto);
                
                            axios.post(`https://dgf0agfzdhu.emiratesevisaonline.com/document/${res.data.id}/PHOTOGRAPH/upload`, formDataPhoto)
                                .then((res) => {
                                    console.log(res);
                                });
                        } catch (error) {
                            console.log("My Error Photo-"+error);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }

                        try {

                            const formDataDoc = new FormData();
                            formDataDoc.append("file", selectedFileDoc);
                
                            axios.post(`https://dgf0agfzdhu.emiratesevisaonline.com/document/${res.data.id}/OTHER/upload`, formDataDoc)
                                .then((res) => {
                                    console.log(res);
                                });
                        } catch (error) {
                            console.log("My Error Doc-"+error);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }

                        if (scndVal == 'add') {
                            navigate('/apply/' + res.data.id);
                        } else {
                            navigate('/checkout/' + res.data.id);
                        }
                    });
            } catch (error) {
                console.log(error);
                alert("Something is Wrong");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }


    }

    // = Form Submit #END Here...

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const currentDate = new Date();

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    const months = Array.from({ length: 12 }, (_, index) =>
        format(addMonths(currentDate, index), 'MMMM')
    );

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, index) => currentYear + index);

    const dateFormatString = 'dd-MM-yyyy';

    return (
        <>
            <section className="breadcrumb-spacing" style={{ backgroundImage: `url("../img/bg/applynow.jpg")` }}>
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
                                {
                                    applicatDetails.id ?
                                        <>
                                            <form>
                                                <div className="box_shadow">
                                                    <div className="box_shadow_pd">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label>Citizenship country
                                                                    </label>
                                                                    <select
                                                                        name="citizenshipCountry"
                                                                        id='citizenshipCountry'
                                                                        onChange={e => onCitizen(e)}
                                                                        value={citizenshipCountry || applicatDetails.application.citizenshipCountry.id || ''}
                                                                    >
                                                                        <option value={applicatDetails.application.citizenshipCountry.id }>{applicatDetails.application.citizenshipCountry.name }</option>
                                                                        {
                                                                            allCountry && allCountry.length > 0 ?
                                                                                allCountry.map((item, index) => (
                                                                                    <option key={index + 1} value={item.id}>{item.name}</option> 
                                                                                )) :
                                                                                ''
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label>Living country/Traveling from </label>
                                                                    <select
                                                                        name="destinationCountry"
                                                                        id='destinationCountry'
                                                                        onChange={e => onDestination(e)}
                                                                        value={destinationCountry}
                                                                    >
                                                                        <option value={applicatDetails.application.destinationCountry.id}>{applicatDetails.application.destinationCountry.name} </option>
                                                                        {
                                                                            allCountry && allCountry.length > 0 ?
                                                                                allCountry.map((item, index) => (
                                                                                    <option key={index + 1} value={item.id}>{item.name}</option>
                                                                                )) :
                                                                                ''
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label>Select Type of Visa</label>
                                                                    <select
                                                                        name="visaVariant"
                                                                        id='visaVariant'
                                                                        onChange={e => onVisaVariant(e)}
                                                                        value={visaVariant}
                                                                    >
                                                                        <option value={applicatDetails.application.visaVariant.id }>{applicatDetails.application.visaVariant.name }</option>
                                                                        {
                                                                            visaType && visaType.length > 0 ?
                                                                                visaType.map((item, index) => (
                                                                                    <option key={index + 1} value={item.id}>{item.name}</option>
                                                                                )) :
                                                                                ''
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">

                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="box_shadow">
                                                    <div className="title">
                                                        <h3>Applicant's Details </h3>
                                                    </div>
                                                    <div className="box_shadow_pd">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label>First Name <sup>*</sup></label>
                                                                    <input
                                                                        type="text"
                                                                        name='firstName'
                                                                        id='firstName'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.firstName || applicatDetails.firstName || ''}
                                                                        placeholder="Enter First Name"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label>Last Name </label>
                                                                    <input
                                                                        name='lastName'
                                                                        id='lastName'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.lastName || applicatDetails.lastName || ''}
                                                                        type="text"
                                                                        placeholder="Enter Last Name"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label>Date of birth </label>
                                                                    <input
                                                                        name='dob'
                                                                        id='dob'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.dob || applicatDetails.dob || ''}
                                                                        type="date"
                                                                        placeholder="Date of birth"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label>Email <sup>*</sup></label>
                                                                    <input
                                                                        name='emailId'
                                                                        id='emailId'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.emailId || applicatDetails.emailId || ''}
                                                                        type="email"
                                                                        placeholder="example@gmail.com"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label>Education </label>
                                                                    <select
                                                                        name="educationF"
                                                                        id='educationF'
                                                                        onChange={e => onEducation(e)}
                                                                        value={educationF}
                                                                    >
                                                                        <option value={applicatDetails.education.id }>{applicatDetails.education.name } </option>
                                                                        {
                                                                            education && education.length > 0 ?
                                                                                education.map((item, index) => (
                                                                                    <option key={index + 1} value={item.id}>{item.name}</option>
                                                                                )) :
                                                                                ''
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label>Profession <sup>*</sup></label>
                                                                    <select
                                                                        name="professionF"
                                                                        id='professionF'
                                                                        onChange={e => OnProfessionF(e)}
                                                                        value={professionF}
                                                                    >
                                                                        <option value={applicatDetails.profession.id }>{applicatDetails.profession.name } </option>
                                                                        {
                                                                            profession && profession.length > 0 ?
                                                                                profession.map((item, index) => (
                                                                                    <option key={index + 1} value={item.id}>{item.name}</option>
                                                                                )) :
                                                                                ''
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label>Purpose of Visit <sup>*</sup></label>
                                                                    <select
                                                                        name="purposeOfVisit"
                                                                        id='purposeOfVisit'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.purposeOfVisit}
                                                                    >
                                                                        <option value={applicatDetails.application.purposeOfVisit.id }>{applicatDetails.application.purposeOfVisit.name } </option>
                                                                        {
                                                                            purposeOfVisit && purposeOfVisit.length > 0 ?
                                                                                purposeOfVisit.map((item, index) => (
                                                                                    <option key={index + 1} value={item.id}>{item.name}</option>
                                                                                )) :
                                                                                ''
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label>Country Code <sup>*</sup></label>
                                                                    <select
                                                                        name="countryCode"
                                                                        id='countryCode'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.countryCode}
                                                                    >
                                                                        <option value="">Select Country Code</option>
                                                                        {
                                                                            allCountry && allCountry.length > 0 ?
                                                                                allCountry.map((item, index) => (
                                                                                    <option key={index + 1} value={item.id}>{item.name} ({item.countryCode})</option>
                                                                                )) :
                                                                                ''
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label>Mobile Number <sup>*</sup></label>
                                                                    <input
                                                                        name='mobileNumber'
                                                                        id='mobileNumber'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.mobileNumber || applicatDetails.mobileNumber || ''}
                                                                        type="number"
                                                                        placeholder="Enter Mobile Number"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label>Country Code <sup>*</sup></label>
                                                                    <select
                                                                        name="countryCodeWhatsapp"
                                                                        id='countryCodeWhatsapp'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.countryCodeWhatsapp}
                                                                    >
                                                                        <option value="">Select Country Code</option>
                                                                        {
                                                                            allCountry && allCountry.length > 0 ?
                                                                                allCountry.map((item, index) => (
                                                                                    <option key={index + 1} value={item.id}>{item.name} ({item.countryCode})</option>
                                                                                )) :
                                                                                ''
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label>Whatsapp Number <sup>*</sup></label>
                                                                    <input
                                                                        type="number"
                                                                        name='whatsappNumber'
                                                                        id='whatsappNumber'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.whatsappNumber || applicatDetails.whatsappNumber || ''}
                                                                        placeholder="Enter Whatsapp Number"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label>First UAE Visit? <sup>*</sup></label>

                                                                    <div className="radio_btn">
                                                                        <label>
                                                                            <input
                                                                                type="radio"
                                                                                name='uaeVisit'
                                                                                onChange={e => onTextFieldChange(e)}
                                                                                value="True"
                                                                                checked={leadData.uaeVisit === 'True'}
                                                                            />
                                                                            Yes
                                                                        </label>

                                                                        <label >
                                                                            <input
                                                                                type="radio"
                                                                                name='uaeVisit'
                                                                                onChange={e => onTextFieldChange(e)}
                                                                                value="False"
                                                                                checked={leadData.uaeVisit === 'False'}
                                                                            />
                                                                            No
                                                                        </label>

                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="col-md-8">
                                                                <div className="form-group">
                                                                    <label>Is There Any family/friends/Known Person of yours in UAE?<sup>*</sup></label>

                                                                    <div className="radio_btn">
                                                                        <label>
                                                                            <input
                                                                                type="radio"
                                                                                name='KnowUae'
                                                                                onChange={e => onTextFieldChange(e)}
                                                                                value="True"
                                                                                checked={leadData.KnowUae === 'True'}
                                                                            />
                                                                            Yes
                                                                        </label>

                                                                        <label >
                                                                            <input
                                                                                type="radio"
                                                                                name='KnowUae'
                                                                                onChange={e => onTextFieldChange(e)}
                                                                                value="False"
                                                                                checked={leadData.KnowUae === 'False'}
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
                                                        <h3>Address Details </h3>
                                                    </div>
                                                    <div className="box_shadow_pd">
                                                        <div className="row">

                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label>Current Address (where you are currently staying) <sup>*</sup></label>
                                                                    <input
                                                                        type="text"
                                                                        name='address'
                                                                        id='address'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.address || applicatDetails.address || ''}
                                                                        placeholder="Enter Current Address"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label>City</label>
                                                                    <input
                                                                        type="text"
                                                                        name='city'
                                                                        id='city'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.city || applicatDetails.city || ''}
                                                                        placeholder="Enter City"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label> State/Province <sup>*</sup></label>
                                                                    <input
                                                                        type="text"
                                                                        name='state'
                                                                        id='state'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.state || applicatDetails.state || ''}
                                                                        placeholder="Enter State/Province"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label>Country </label>
                                                                    <select
                                                                        name="residenceCountry"
                                                                        id='residenceCountry'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.residenceCountry}
                                                                    >
                                                                        <option value={applicatDetails.residenceCountry.id }>{applicatDetails.residenceCountry.name }</option>
                                                                        {
                                                                            allCountry && allCountry.length > 0 ?
                                                                                allCountry.map((item, index) => (
                                                                                    <option key={index + 1} value={item.id}>{item.name}</option>
                                                                                )) :
                                                                                ''
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label>Zipcode / Pincode / Postal Code</label>
                                                                    <input
                                                                        name='postalCode'
                                                                        id='postalCode'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.postalCode || applicatDetails.postalCode || ''}
                                                                        type="text"
                                                                        placeholder="Enter Zipcode / Pincode / Postal Code"
                                                                    />
                                                                </div>
                                                            </div>



                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="box_shadow">
                                                    <div className="title">
                                                        <h3>Passport Details </h3>
                                                    </div>
                                                    <div className="box_shadow_pd">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label>Passport Number <sup>*</sup></label>
                                                                    <input
                                                                        type="text"
                                                                        name='passportNumber'
                                                                        id='passportNumber'
                                                                        onChange={e => onTextFieldChange(e)}
                                                                        value={leadData.passportNumber || applicatDetails.passportNumber || ''}
                                                                        placeholder="Enter Passport Number"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label>Passport Expiry Date <sup>*</sup></label>

                                                                    <div className="date_gap">
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

                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
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
                                                                    <input 
                                                                        type="file"
                                                                        onChange={e => setSelectedFile(e.target.files[0])}
                                                                    />
                                                                </div>
                                                                <div className="form-group pic">
                                                                    <div className="set">
                                                                        <img id="blah" src="../img/passport.jpg" alt="your image" />
                                                                    </div>
                                                                    <label>Colored Passport copy</label>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label>Colored photograph</label>
                                                                    <input 
                                                                        type="file"
                                                                        onChange={e => setSelectedFilePhoto(e.target.files[0])}
                                                                    />
                                                                </div>
                                                                <div className="form-group pic">
                                                                    <div className="set">
                                                                        <img id="blah1" src="../img/dummy-avatar.jpg" alt="your image" />
                                                                    </div>
                                                                    <label>Colored photograph</label>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label>Others</label>
                                                                    <input 
                                                                        type="file"
                                                                        onChange={e => setSelectedFileDoc(e.target.files[0])}
                                                                    />
                                                                </div>
                                                                <div className="form-group pic">
                                                                    <div className="set">
                                                                        <img id="blah1" src="../img/dummy-avatar.jpg" alt="your image" />
                                                                    </div>
                                                                    <label>Colored photograph</label>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <div className="note">
                                                                        <p><b>Note:</b> Upload of passport and photograph are not mandatory to complete the visa application form. You can provide us these documents later also on email: contact@emiratesevisaonline.com or on WhatsApp +91-1234567890</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="row">
                                                            <div className="btn_d_flex">
                                                                <button
                                                                    type="button"
                                                                    className="red"
                                                                    onClick={e => onFormSubmit(e, 'submit')}
                                                                >
                                                                    Update Application
                                                                </button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </form>
                                        </>
                                        :
                                        '-'
                                }

                            </div>
                        </div>

                        <div className='oldDocuments'>
                            <div className=''>
                                {
                                    documentFiles && documentFiles.length > 0 ?
                                    documentFiles.map((item, index) => (
                                        <div className='row' key={index+1}>
                                            <div className='col-md-3' >
                                                <img className="lazy" src={`data:image/png;base64,${item.photoDocument}`} style={{maxWidth: '100%'}} />
                                                <h4>Photo Documents</h4>
                                            </div> 
                                            <div className='col-md-3' >
                                                <img className="lazy" src={`data:image/png;base64,${item.passportDocument}`} style={{maxWidth: '100%'}} />
                                                <h4>Passport Documents</h4>
                                            </div> 
                                            <div className='col-md-3' >
                                                <img className="lazy" src={`data:image/png;base64,${item.otherDocument}`} style={{maxWidth: '100%'}} />
                                                <h4>Other Documents</h4>
                                            </div> 
                                        </div>
                                    )) :
                                    ''
                                }
                                
                            </div>
                        </div>


                    </div>

                </div>


            </section>


        </>
    )
};

export default EditApplicant;