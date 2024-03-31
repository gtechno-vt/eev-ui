import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ApplyVisa from './ApplyVisa';
import Apply from './Apply';

const EditApplicant = () => {

    let { id } = useParams();
    id =  atob(id);
    
    const [primary,setPrimary] = useState(null);
    const [documentFiles,setDocumentFiles] = useState(null);
    const [displayId,setDisplayId] = useState(null);
 
    useEffect(() => {
        async function getApplicationDetails() {
            try {
                const appApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/applicant/${id}`)
                setPrimary(prev => appApi.data.isPrimary || appApi.data.isPrimary === false ? appApi.data.isPrimary : null)
                setDisplayId(appApi.data.application.displayId);
            } catch (error) {
            }
        }

        async function getDocumentFiles() {
            try {
                const appApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/document?applicantId=${id}`)
                if(appApi.data[0].id != undefined){
                    const data = appApi.data[0];
                    if(data.passportDocument){
                        if(data.passportMediaType === "jpeg" || data.passportMediaType === "png" || data.passportMediaType === "jpg"
                        ){
                            data.passportDocument =`data:image/${data.passportMediaType};base64,${data.passportDocument}`
                        }else   if(data.passportMediaType === "pdf" || data.passportMediaType === "doc" || data.passportMediaType === "docx"){
                            data.passportDocument =`data:application/${data.passportMediaType};base64,${data.passportDocument}`
                         }
                    }
                    if(data.photoDocument){
                        if(data.photoMediaType === "jpeg" || data.photoMediaType === "png" || data.photoMediaType === "jpg"
                        ){
                            data.photoDocument =`data:image/${data.photoMediaType};base64,${data.photoDocument}`
                        }else   if(data.photoMediaType === "pdf" || data.photoMediaType === "doc" || data.photoMediaType === "docx"){
                            data.photoDocument =`data:application/${data.photoMediaType};base64,${data.photoDocument}`
                         }
                    }
                    if(data.otherDocument){
                        if(data.otherDocumentMediaType === "jpeg" || data.otherDocumentMediaType === "png" || data.otherDocumentMediaType === "jpg"
                        ){
                            data.otherDocument =`data:image/${data.otherDocumentMediaType};base64,${data.otherDocument}`
                        }else   if(data.otherDocumentMediaType === "pdf" || data.otherDocumentMediaType === "doc" || data.otherDocumentMediaType === "docx"){
                            data.otherDocument =`data:application/${data.otherDocumentMediaType};base64,${data.otherDocument}`
                         }
                    }
                      
                    setDocumentFiles(data);
                }
            } catch (error) {
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
       doc={documentFiles}
       displayId = {displayId}
       />    
       : primary === false ? 
       <Apply
       update={true}
       appId={id}
       doc={documentFiles}
       displayId = {displayId}
       />:
       <div>
        Loading ...
       </div>
    }
        </>
    )
};

export default EditApplicant;