import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ApplyVisa from './ApplyVisa';
import Apply from './Apply';

const EditApplicant = () => {

    const { id } = useParams();
    const [primary,setPrimary] = useState(null);
    const [documentFiles,setDocumentFiles] = useState(null);
 
    useEffect(() => {


        async function getApplicationDetails() {
            try {
                const appApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant/${id}`)
                setPrimary(prev => appApi.data.isPrimary || appApi.data.isPrimary === false ? appApi.data.isPrimary : null)
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
            } catch (error) {
                console.log("Something is Wrong Visa Type");
            }
        }
        getApplicationDetails();
        getDocumentFiles();
    }, [id]);


    return (
        <>
        {primary ? 
       <ApplyVisa 
       update={true}
       appId={id}
       docInfo={documentFiles}
       />    
       : primary === false ? 
       <Apply
       update={true}
       appId={id}
       docInfo={documentFiles}
       />:
       <div>
        Loading ...
       </div>
    }
        </>
    )
};

export default EditApplicant;