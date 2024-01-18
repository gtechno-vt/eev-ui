import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addMonths } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ApplyVisa from './ApplyVisa';
import Apply from './Apply';

const EditApplicant = () => {

    const { id } = useParams();
    const [applicatDetails,setApplicatDetails] = useState(null)
    const [primary,setPrimary] = useState(null);
    useEffect(() => {


        async function getApplicationDetails() {
            try {
                const appApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant/${id}`)
                setApplicatDetails(appApi.data);
                console.log(appApi.data.isPrimary);
                setPrimary(prev => appApi.data.isPrimary || appApi.data.isPrimary === false ? appApi.data.isPrimary : null)
                // setEducationF(appApi.data.education.id);
                // setProfessionF(appApi.data.profession.id);
                // setleadData(appApi.data);

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
        getApplicationDetails();
        getDocumentFiles();
    }, [id]);

    // === Form Submit Start Here -=====
  

   


    
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

    

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

   



    return (
        <>
        {primary ? 
       <ApplyVisa 
       update={true}
       appId={id}
       />    
       : primary === false ? 
       <Apply
       update={true}
       appId={id}
       />:
       <div>
        Loading ...
       </div>
    }
        </>
    )
};

export default EditApplicant;