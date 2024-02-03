import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addMonths } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { isValidEmail } from '../utils/StaticFunctions';
import { isValidMobile } from '../utils/StaticFunctions';
import ApiLoader from './ApiLoader';

const ApplyVisa = ({update,appId,doc}) => {

    const navigate = useNavigate();
    const { visa } = useParams();
    const { citizen } = useParams();
    const { travelling } = useParams();
    const [allCountry, setAllCountry] = useState([]);
    const [visaType, setVisaType] = useState([]);
    const [education, setEducation] = useState([]);
    const [profession, setProfession] = useState([]);
    const [purposeOfVisit, setPurposeOfVisit] = useState([]);
    const [leadData, setLeadData] = useState({KnowUae:false,uaeVisit:false});
    const [citizenData, setCitizenData] = useState("");
    const [travellingData, setTravellingData] = useState("");

    const [selectedFile, setSelectedFile] = useState("");
    const [selectedFilePhoto, setSelectedFilePhoto] = useState("");
    const [selectedFileDoc, setSelectedFileDoc] = useState("");
    const [showApiLoader,setShowApiLoader] = useState(false);

    // for update purpose 
    
// application status
// application id



    useEffect(() => {

        async function getCountry() {

            try {
                setShowApiLoader(true);
                const countryApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/country/basic`)
                setShowApiLoader(false);
                setAllCountry(countryApi.data);
                console.log(countryApi.data);
                if(citizen){
                    const citizenCountryAllData = countryApi.data.find(ele => ele.countryNameSlug === citizen);
                    setCitizenData(citizenCountryAllData.id);
                   if(citizenCountryAllData?.id){ getVisaType(citizenCountryAllData.id)}
                }
                if(visa && !citizen){
                    getVisaType(0)  
                }
                if(travelling){
                    const travellingCountryAllData = countryApi.data.find(ele => ele.countryNameSlug === travelling);  
                    setTravellingData(travellingCountryAllData.id);
                }
            } catch (error) {
                setShowApiLoader(false);
                console.log("Something is Wrong");
            }
        }

        async function getVisaType(citizenId) {
            try {
                setShowApiLoader(true);
                const visaTypeApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/visaVariant/${citizenId}/48?fetchImages=false`)
                setShowApiLoader(false);
                setVisaType(visaTypeApi.data);
                if(visa){
                    const singlevisaVar = visaTypeApi.data.find(ele => ele.slugVisaVariantName === visa);
                    console.log(singlevisaVar);
                    if (singlevisaVar) {
                        setVisaVariant(singlevisaVar.id)
                    }
                }
                console.log(visaTypeApi.data);
            } catch (error) {
                setShowApiLoader(false);
                console.log("Something is Wrong Visa Type");
            }
        }

        async function getEducation() {
            try {
                setShowApiLoader(true);
                const educationApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/education`)
                setShowApiLoader(false);
                setEducation(educationApi.data);
            } catch (error) {
                setShowApiLoader(false);
                console.log("Something is Wrong Visa Type");
            }
        }

        async function getProfession() {
            try {
                setShowApiLoader(true);
                const professionApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/profession`)
                setShowApiLoader(false);
                setProfession(professionApi.data);
            } catch (error) {
                setShowApiLoader(false);
                console.log("Something is Wrong Visa Type");
            }
        }

        async function getPurposeVisit() {
            try {
                setShowApiLoader(true);
                const purposeApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/purpose-of-visit`)
                setShowApiLoader(false);
                setPurposeOfVisit(purposeApi.data);
            } catch (error) {
                setShowApiLoader(false);
                console.log("Something is Wrong Visa Type");
            }
        }

        // for update purpose fetch the application details  -> only for update case
        async function getApplicationData() {

            try {
                setShowApiLoader(true);
                const applicationApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/applicant/${appId}`)
                // setApplicationData(applicationApi.data);
                setShowApiLoader(false);
                const data = applicationApi.data;
                  getVisaType(data?.application?.citizenshipCountry?.id || 0)
                setLeadData({
                    firstName:data.firstName || "",
                    lastName:data.lastName || "",
                    dob:data.dob ? format(data.dob, 'yyyy-MM-dd') :"",
                    emailId:data.emailId || "",
                    state:data.state || "",
                    city:data.city || "",
                    address:data.address || "",
                    postalCode:data.postalCode || "",
                    residenceCountry:data.residenceCountry || "",
                    countryCode:data.mobileNumber?.split("-")[0] ? data.mobileNumber?.split("-")[0]: "",
                    mobileNumber:data.mobileNumber?.split("-")[1] ? Number(data.mobileNumber?.split("-")[1]): "",
                    countryCodeWhatsapp:data.whatsappNumber?.split("-")[0] ? data.whatsappNumber?.split("-")[0]: "",
                    whatsappNumber:data.whatsappNumber?.split("-")[1] ? Number(data.whatsappNumber?.split("-")[1]): "",
                    customEducation:data.customEducation || "",
                    customProfession : data.customProfession || "",
                    purposeOfVisitText : data.application?.purposeOfVisitText || "",
                    passportNumber:data.passportNumber || "",
                    passportExpiryDate:data.passportExpiryDate ? format(data.passportExpiryDate, 'yyyy-MM-dd') : "",
                    arrivalDate:data?.application?.arrivalDate ? format(data.application.arrivalDate, 'yyyy-MM-dd') : "",
                    KnowUae:data.isContactInForeignCountry,
                    uaeVisit:data.isFirstForeignVisit,
                    purposeOfVisit:data.application?.purposeOfVisit?.id ? data.application.purposeOfVisit.id : data.application.purposeOfVisitText ? "other" : "",
                    applicationId:data.application?.id || "",
                    status:data.application.status,
                })

                setVisaVariant(data?.application?.visaVariant?.id || "")
                setCitizenData(data?.application?.citizenshipCountry?.id || "")
                setTravellingData(data?.residenceCountry?.id || "")
                 const prof = data.profession?.id ? data.profession.id : data.customProfession ? 'other': "";
                 const edu = data.education?.id ? data.education.id : data.customEducation ? 'other': "";
                setProfessionF(prof);
                setEducationF(edu);
              
               
                // console.log(applicationApi.data);
            } catch (error) {
                setShowApiLoader(false);
                console.log("Something is Wrong",error);
            }
        }

        getCountry();
        // getVisaType();
        getEducation();
        getProfession();
        getPurposeVisit();
        if(appId){
            getApplicationData();
        }
    }, []);



    // useEffect(() => {

    //     // async function getCityCounrtyId(){
    //     //     try {
    //     //         const cityCountryApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/country/slug-name/${citizen}`)
    //     //         setCitizenData(cityCountryApi.data.id);
    //     //     } catch (error) {
    //     //         console.log("Something is Wrong Visa Type");
    //     //     }
    //     // }

    //     // async function getTravelCounrtyId(){
    //     //     try {
    //     //         const travellingCountryApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/country/slug-name/${travelling}`)
    //     //         setTravellingData(travellingCountryApi.data.id);
    //     //     } catch (error) {
    //     //         console.log("Something is Wrong Visa Type");
    //     //     }
    //     // }


    //     // getCityCounrtyId();
    //     // getTravelCounrtyId();
    // }, [citizen, travelling]);

    // === Form Submit Start Here -=====
    async function onTextFieldChange(e) {
        setLeadData({
            ...leadData,
            [e.target.name]: e.target.value
        })
    }

    const handleRadioChange = (e,val) => {
        console.log(val,typeof val);
            console.log(e.target.checked);
            setLeadData({
                ...leadData,
                [e.target.name]: val
            })
    
    }

    // const [citizenshipCountry, setCitizenshipCountry] = useState("");
    async function onCitizen(e) {
        setCitizenData(e.target.value)
        setShowApiLoader(true);
        setVisaType([])
        const visaTypeApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/visaVariant/${e.target.value}/48?fetchImages=false`)
        setShowApiLoader(false);
        setVisaType(visaTypeApi.data);
        if(visaTypeApi.data.length > 0){
           const item = visaTypeApi.data.find(ele => ele.id === visaVariant);
           if(item){
            setVisaVariant(item.id)
           }else{
            setVisaVariant("")
           }
        }else{
            setVisaVariant("")
        }
        
    }

    // const [destinationCountry, setDestinationCountry] = useState("");
    function onDestination(e) {
        setTravellingData(e.target.value)
    }

    const [visaVariant, setVisaVariant] = useState("");
    function onVisaVariant(e) {
        setVisaVariant(e.target.value)
    }


    const [professionF, setProfessionF] = useState("");
    function OnProfessionF(e) {
        if (e.target.value == 'other') {
            setProfessionF('other')
            // document.getElementById('customProfessionLabel').style.display = "block";
        } else {
            setProfessionF(Number(e.target.value))
            // document.getElementById('customProfessionLabel').style.display = "none";
        }
    }

    const [educationF, setEducationF] = useState("");
    function onEducation(e) {
        
        if (e.target.value == 'other') {
            setEducationF("other")
            // document.getElementById('customEducationLabel').style.display = "block";
        } else {
            setEducationF(Number(e.target.value))
            // document.getElementById('customEducationLabel').style.display = "none";
        }
    }

    const handlePurposeOfVisit = (e) => {
        if (e.target.name == 'purposeOfVisit') {
            if (e.target.value == 'other') {
                setLeadData({
                    ...leadData,
                    [e.target.name]:"other",
                })
                // document.getElementById('purposeOfVisitTextLabel').style.display = "block";
            } else {
                setLeadData({
                    ...leadData,
                    [e.target.name]: Number(e.target.value)
                })
                // document.getElementById('purposeOfVisitTextLabel').style.display = "none";
            }
        }
       
    }

    const handleFileUpload = (id) => { 
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            axios.post(`https://ymfzdgfyzhm.emiratesevisaonline.com/document/${id}/PASSPORT/upload`, formData)
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

            axios.post(`https://ymfzdgfyzhm.emiratesevisaonline.com/document/${id}/PHOTOGRAPH/upload`, formDataPhoto)
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

            axios.post(`https://ymfzdgfyzhm.emiratesevisaonline.com/document/${id}/OTHER/upload`, formDataDoc)
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
        
        let payloadData = 
            {
                "application": {
                    "citizenshipCountry": {
                        "id": citizenData
                    },
                    "destinationCountry": {
                        "id": 48
                    },
                    "visaVariant": {
                        "id": visaVariant
                    },
                    "purposeOfVisit": leadData.purposeOfVisit && leadData.purposeOfVisit !== "other" ?{
                        "id": leadData.purposeOfVisit
                    }:null,
                    purposeOfVisitText:leadData.purposeOfVisitText || null,
                    "siteInfo": {
                        "id": 2
                    },
                    "arrivalDate": leadData.arrivalDate,
                    "status":"PAYMENT PENDING"
                },
                "residenceCountry": {
                    "id": travellingData
                },
                "emailId": leadData.emailId,
                "firstName": leadData.firstName,
                "lastName": leadData.lastName || null,
                "dob": leadData.dob || null,
                "state": leadData.state,
                "city": leadData.city || null,
                "address": leadData.address,
                "postalCode": leadData.postalCode || null,
                "mobileNumber": leadData.countryCode + "-" + leadData.mobileNumber,
                "whatsappNumber": leadData.countryCodeWhatsapp + "-" + leadData.whatsappNumber,
                "passportNumber": leadData.passportNumber,
                "profession": professionF && professionF !== "other" ?{
                    "id": professionF
                }:null,
                "education": educationF && educationF !== "other" ? {
                    "id": educationF
                }:null,
                customEducation:leadData.customEducation || null, 
                customProfession:leadData.customProfession || null, 
                "passportExpiryDate": leadData.passportExpiryDate,
                "isPrimary": true,
                "isContactInForeignCountry": leadData.KnowUae || leadData.KnowUae === false ? leadData.KnowUae : null,
                "isFirstForeignVisit": leadData.uaeVisit || leadData.uaeVisit === false  ? leadData.uaeVisit : null,
        
            }
        

        if(update){
            payloadData.application.id = leadData.applicationId;
            payloadData.application.status = leadData.status;
        }

        document.getElementById("citizenshipCountry").style.border = "1px solid #ccc";
        document.getElementById("destinationCountry").style.border = "1px solid #ccc";
        document.getElementById("visaVariant").style.border = "1px solid #ccc";
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
        // document.getElementById("residenceCountry").style.border = "1px solid #ccc";
        document.getElementById("postalCode").style.border = "1px solid #ccc";
        document.getElementById("passportNumber").style.border = "1px solid #ccc";
        // document.getElementById("passportExpiryDateDay").style.border = "1px solid #ccc";
        // document.getElementById("passportExpiryDateMonth").style.border = "1px solid #ccc";
        // document.getElementById("passportExpiryDateYear").style.border = "1px solid #ccc";
        // document.getElementById("arrivalDateDay").style.border = "1px solid #ccc";
        // document.getElementById("arrivalDateMonth").style.border = "1px solid #ccc";
        // document.getElementById("arrivalDateYear").style.border = "1px solid #ccc";
        document.getElementById("passportExpiryDate").style.border = "1px solid #ccc";
        document.getElementById("arrivalDate").style.border = "1px solid #ccc";

        let isAllRequiredDataFilled = true;
        if (!citizenData) {
            document.getElementById("citizenshipCountry").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
         if (!travellingData) {
            document.getElementById("destinationCountry").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        }  
        if (!visaVariant) {
            if(visaType && visaType.length === 0){
                document.getElementById("succ_message").style.display = "block";
                    document.getElementById("alert_message").innerHTML = "Please contact us on WhatsApp to get your Visa Application processed.";
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => {
                    document.getElementById("succ_message").style.display = "none";
                    document.getElementById("alert_message").innerHTML = "";
                  
                  }, 5000);
                return;
            }
            document.getElementById("visaVariant").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
         if (!leadData.firstName) {
            document.getElementById("firstName").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        }
        //  else if (leadData.lastName == undefined) {
        //     document.getElementById("lastName").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
        // else if (leadData.dob == undefined) {
        //     document.getElementById("dob").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
         if (!leadData.emailId || !isValidEmail(leadData.emailId)) {
            document.getElementById("emailId").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        }
        // else if (educationF == '0') {
        //     document.getElementById("educationF").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
         if (!professionF && !leadData.customProfession) {
            document.getElementById("professionF").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
         if (!leadData.purposeOfVisit && !leadData.purposeOfVisitText) {
            document.getElementById("purposeOfVisit").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
         if (!leadData.countryCode) {
            document.getElementById("countryCode").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
         if (!leadData.mobileNumber || !isValidMobile(leadData.mobileNumber)) {
            document.getElementById("mobileNumber").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
         if (!leadData.countryCodeWhatsapp) {
            document.getElementById("countryCodeWhatsapp").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
         if (!leadData.whatsappNumber || !isValidMobile(leadData.whatsappNumber)) {
            document.getElementById("whatsappNumber").style.border = "1px solid red";
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
         if (!leadData.address) {
            document.getElementById("address").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        }
         if (!leadData.city) {
            document.getElementById("city").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
         if (!leadData.state) {
            document.getElementById("state").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        }
        // else if (leadData.residenceCountry == undefined) {
        //     document.getElementById("residenceCountry").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
        // else if (leadData.postalCode == undefined) {
        //     document.getElementById("postalCode").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
         if (!leadData.passportNumber) {
            document.getElementById("passportNumber").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
        // else if (!leadData.passportExpiryDateDay) {
        //     document.getElementById("passportExpiryDateDay").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } else if (!leadData.passportExpiryDateMonth ) {
        //     document.getElementById("passportExpiryDateMonth").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } else if (!leadData.passportExpiryDateYear) {
        //     document.getElementById("passportExpiryDateYear").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 

         if (!leadData.passportExpiryDate) {
            document.getElementById("passportExpiryDate").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
         if (!leadData.arrivalDate) {
            document.getElementById("arrivalDate").style.border = "1px solid red";
            isAllRequiredDataFilled = false;
        } 
        
       


        // else if (!leadData.arrivalDateDay) {
        //     document.getElementById("arrivalDateDay").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
        // else if (!leadData.arrivalDateMonth) {
        //     document.getElementById("arrivalDateMonth").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } else if (!leadData.arrivalDateYear) {
        //     document.getElementById("arrivalDateYear").style.border = "1px solid red";
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // } 
        if(isAllRequiredDataFilled) {
            try {
              if(update){
                //   to update existing
                setShowApiLoader(true)
                await axios.put(`https://ymfzdgfyzhm.emiratesevisaonline.com/applicant/${appId}`, payloadData)
                .then((res) => {
                    setShowApiLoader(false)
                    document.getElementById("succ_message").style.display = "block";
                    document.getElementById("alert_message").innerHTML = "Your Query has been Submitted Succesfully!!! We will get back to you.";
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                    handleFileUpload(res.data.id)
                    if (scndVal == 'add') {
                        navigate('/apply/' + res?.data?.application?.displayId);
                    } else {
                        navigate('/checkout/' + res?.data?.application?.displayId);
                    }

                });
              }else{
                //  to add new
                setShowApiLoader(true)
                await axios.post(`https://ymfzdgfyzhm.emiratesevisaonline.com/applicant`, payloadData)
                .then((res) => {
                    setShowApiLoader(false)
                    document.getElementById("succ_message").style.display = "block";
                    document.getElementById("alert_message").innerHTML = "Your Query has been Submitted Succesfully!!! We will get back to you.";
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                    handleFileUpload(res.data.id)
                    if (scndVal == 'add') {
                        navigate('/apply/' + res?.data?.application?.displayId);
                    } else {
                        navigate('/checkout/' + res?.data?.application?.displayId);
                    }

                });
              }
            } catch (error) {
                setShowApiLoader(false)
                document.getElementById("succ_message").style.display = "block";
                document.getElementById("alert_message").innerHTML = error;
                console.log(error);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }else{
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }


    }

    
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
    const todayDate =  new Date().toJSON().slice(0,10);
    console.log(leadData, "leadData");
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
                                    <div className="box_shadow">
                                        <div className="box_shadow_pd">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Citizenship country </label>
                                                        <select
                                                            name="citizenshipCountry"
                                                            id='citizenshipCountry'
                                                            onChange={e => onCitizen(e)}
                                                            value={citizenData}
                                                        >
                                                            <option value="">-- select one --</option>
                                                            {
                                                                allCountry && allCountry.length > 0 ?
                                                                    allCountry.map((item, index) => (
                                                                        citizenData == item.id ?
                                                                            <option selected key={index + 1} value={item.id}>{item.name}</option>
                                                                            :
                                                                            <option selected key={index + 1} value={item.id}>{item.name}</option>
                                                                    )) :
                                                                    ''
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Traveling from</label>
                                                        <select
                                                            name="destinationCountry"
                                                            id='destinationCountry'
                                                            onChange={e => onDestination(e)}
                                                            value={travellingData}
                                                        >
                                                            <option value="">-- select one --</option>
                                                            {
                                                                allCountry && allCountry.length > 0 ?
                                                                    allCountry.map((item, index) => (
                                                                        travellingData == item.id ?
                                                                            <option selected key={index + 1} value={item.id}>{item.name}</option>
                                                                            :
                                                                            <option key={index + 1} value={item.id}>{item.name}</option>

                                                                    )) :
                                                                    ''
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Select Type of Visa</label>
                                                        <select
                                                            name="visaVariant"
                                                            id='visaVariant'
                                                            onChange={e => onVisaVariant(e)}
                                                            value={visaVariant}
                                                            disabled={visaType && visaType.length > 0 ? false : true}
                                                        >
                                                            <option value="">Visa Type</option>
                                                            {
                                                                visaType && visaType.length > 0 ?
                                                                    visaType.map((item, index) => (
                                                                        visaVariant == item.id ?
                                                                            <option selected key={index + 1} value={item.id}>{item.name}</option>
                                                                            :
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
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>First Name <sup>*</sup></label>
                                                        <input
                                                            type="text"
                                                            name='firstName'
                                                            id='firstName'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.firstName}
                                                            placeholder="Enter First Name"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Last Name </label>
                                                        <input
                                                            name='lastName'
                                                            id='lastName'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.lastName}
                                                            type="text"
                                                            placeholder="Enter Last Name"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Date of birth</label>
                                                        <input
                                                            name='dob'
                                                            id='dob'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.dob}
                                                            type="date"
                                                            placeholder="Date of birth"
                                                            // max={new Date().toJSON(0,10)}
                                                            max={todayDate}
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
                                                            value={leadData.emailId}
                                                            type="email"
                                                            placeholder="example@example.com"
                                                        />
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
                                                            value={leadData.mobileNumber}
                                                            type="number"
                                                            placeholder="Enter Mobile Number"
                                                            maxLength="10"
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
                                                            value={leadData.whatsappNumber}
                                                            placeholder="Enter Whatsapp Number"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Education </label>
                                                        <select
                                                            name="educationF"
                                                            id='educationF'
                                                            onChange={e => onEducation(e)}
                                                            value={educationF}
                                                        >
                                                            <option value="">Select Education </option>
                                                            {
                                                                education && education.length > 0 ?
                                                                    education.map((item, index) => (
                                                                        <option key={index + 1} value={item.id}>{item.name}</option>
                                                                    )) :
                                                                    ''
                                                            }
                                                            <option value="other">Others</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Profession <sup>*</sup></label>
                                                        <select
                                                            name="professionF"
                                                            id='professionF'
                                                            onChange={e => OnProfessionF(e)}
                                                            value={professionF}
                                                        >
                                                            <option value="">Select Profession </option>
                                                            {
                                                                profession && profession.length > 0 ?
                                                                    profession.map((item, index) => (
                                                                        <option key={index + 1} value={item.id}>{item.name}</option>
                                                                    )) :
                                                                    ''
                                                            }
                                                            <option value="other">Others</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Purpose of Visit <sup>*</sup></label>
                                                        <select
                                                            name="purposeOfVisit"
                                                            id='purposeOfVisit'
                                                            onChange={handlePurposeOfVisit}
                                                            value={leadData.purposeOfVisit}
                                                        >
                                                            <option value="">Select Visit </option>
                                                            {
                                                                purposeOfVisit && purposeOfVisit.length > 0 ?
                                                                    purposeOfVisit.map((item, index) => (
                                                                        <option key={index + 1} value={item.id}>{item.name}</option>
                                                                    )) :
                                                                    ''
                                                            }
                                                            <option value="other">Others</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                
                                                <div className="col-md-4" id='customEducationLabel'>
                                                    <div className="form-group">
                                                        <label  className={educationF !== "other" ? "lightGray" : ""}>Education (Others) </label>
                                                        <input
                                                            name='customEducation'
                                                            id='customEducation'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.customEducation}
                                                            type="text"
                                                            placeholder=""
                                                            disabled = {educationF !== "other" ? true : false}
                                                        />
                                                    </div>
                                                </div>

                                              



                                                <div className="col-md-4" id='customProfessionLabel' >
                                                    <div className="form-group">
                                                        <label className={professionF !== "other" ? "lightGray" : ""}>Profession (Others) </label>
                                                        <input
                                                            name='customProfession'
                                                            id='customProfession'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.customProfession}
                                                            type="text"
                                                            placeholder=""
                                                            disabled = {professionF !== "other" ? true : false}
                                                        />
                                                    </div>
                                                </div>

                                              
                                                <div className="col-md-4" id='purposeOfVisitTextLabel'>
                                                    <div className="form-group">
                                                        <label className={leadData.purposeOfVisit !== "other" ? "lightGray" : ""}>Purpose of Visit (Others) </label>
                                                        <input
                                                            name='purposeOfVisitText'
                                                            id='purposeOfVisitText'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.purposeOfVisitText }
                                                            type="text"
                                                            placeholder=""
                                                            disabled = {leadData.purposeOfVisit !== "other" ? true : false}

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
                                                                    id='uaeVisitF'
                                                                    onChange={e => handleRadioChange(e,true)}
                                                                    // value={leadData.uaeVisit}
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
                                                                    // value={leadData.uaeVisit}
                                                                    checked={leadData.uaeVisit === false ? true:false}
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
                                                            value={leadData.address}
                                                            placeholder="Enter Current Address"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>City  <sup>*</sup></label>
                                                        <input
                                                            type="text"
                                                            name='city'
                                                            id='city'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.city}
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
                                                            value={leadData.state}
                                                            placeholder="Enter State/Province"
                                                        />
                                                    </div>
                                                </div>

                                                {/* <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Country </label>
                                                        <select
                                                            name="residenceCountry"
                                                            id='residenceCountry'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.residenceCountry}
                                                        >
                                                            <option value="">-- select one --</option>
                                                            {
                                                                allCountry && allCountry.length > 0 ?
                                                                    allCountry.map((item, index) => (
                                                                        <option key={index + 1} value={item.id}>{item.name}</option>
                                                                    )) :
                                                                    ''
                                                            }
                                                        </select>
                                                    </div>
                                                </div> */}

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Zipcode / Pincode / Postal Code</label>
                                                        <input
                                                            name='postalCode'
                                                            id='postalCode'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.postalCode}
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
                                                            value={leadData.passportNumber}
                                                            placeholder="Enter Passport Number"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Passport Expiry Date <sup>*</sup></label>

                                                        {/* <div className="date_gap"> */}
                                                            {/* <select
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
                                                                <option value="31">31</option> */}
                                                                {/* 
                                                                {numbers.map((number, index) => (
                                                                    <option key={index} value={number}>{number}</option>
                                                                ))}
                                                                */}
                                                            {/* </select> */}
{/* 
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
                                                                <option value="12">December</option> */}
                                                                {/* 
                                                                {months.map((month, index) => (
                                                                    <option key={index} value={month}>{month}</option>
                                                                ))}
                                                                */}

                                                            {/* </select> */}

                                                            {/* <select
                                                                name="passportExpiryDateYear"
                                                                id='passportExpiryDateYear'
                                                                onChange={e => onTextFieldChange(e)}
                                                                value={leadData.passportExpiryDateYear}
                                                            >
                                                                <option value="">Year</option>
                                                                {years.map((year, index) => (
                                                                    <option key={index} value={year}>{year}</option>
                                                                ))}
                                                            </select> */}

                                                        {/* </div> */}
                                                        <input
                                                            name='passportExpiryDate'
                                                            id='passportExpiryDate'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.passportExpiryDate}
                                                            type="date"
                                                            placeholder="YYYY-MM-DD"
                                                            min={todayDate}
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Arrival Date <sup>*</sup></label>

                                                        {/* <div className="date_gap">
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

                                                        </div> */}
                                                         <input
                                                            name='arrivalDate'
                                                            id='arrivalDate'
                                                            onChange={e => onTextFieldChange(e)}
                                                            value={leadData.arrivalDate}
                                                            type="date"
                                                            placeholder="YYYY-MM-DD"
                                                            min={todayDate}
                                                        />

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
                                                        {/* <input type="file" onChange={handleFileChange} /> */}
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
                                                        {doc?.photoDocument ? <a download={`passport.${doc.photoMediaType}`} href={doc.photoDocument} className='doc-down-anchor'>{`Photo.${doc.photoMediaType}`}</a>
                                                    : doc?.passportDocument || doc?.photoDocument || doc?.otherDocument ? <a className='doc-down-anchor'></a> 
                                                    : ""    
                                                    }
                                                        <input
                                                            type="file"
                                                            onChange={e => setSelectedFilePhoto(e.target.files[0])}
                                                            className="form-control"
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
                                                            <p><b>Note:</b> <ul><li> Upload of passport and photograph are not mandatory to complete the visa application form. You can provide us these documents later also on email: contact@emiratesevisaonline.com or on WhatsApp.</li><li> Supported Document Formats - PDF, JPG, JPEG, PNG, DOC, DOCX.</li></ul></p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="btn_d_flex">
                                                  {
                                                    update ? 
                                                    <button
                                                    type="button"
                                                    className="red"
                                                    onClick={e => onFormSubmit(e, 'submit')}
                                                >
                                                    Update Application
                                                </button>
                                                    
                                                    :
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
                                                    </>
                                                  }


                                                </div>
                                            </div>


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

export default ApplyVisa;