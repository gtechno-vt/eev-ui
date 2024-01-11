import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const TrackVisaApplication = () => {

    const [trackData, setTrackData] = useState([]);
    const [track, setTrack] = useState({
        appId: ""
    })

    async function onTextFieldChange(e) {

        setTrack({
            ...track,
            [e.target.name]: e.target.value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault()
        
        if(track.appId == ''){
            document.getElementById("appId").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            
            try {
                const trackApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant?applicationDisplayId=${track.appId}`);
                setTrackData(trackApi.data);
            } catch (error) {
                alert("Something is Wrong");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
             
    }

    async function onFormReset(e) {
        e.preventDefault()
        
        document.getElementById('appId').value = "";
        setTrackData("");
             
    }

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
                            <h3 className="page-title">Track Application</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><a href="/"> Home</a></li>
                                    <li className="active">Track Application</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="pad_fix_50 track_status">
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-md-9">
                        <div className="tack_form">
                            <div className="tack_forms">
                                <h3>Track Your Application </h3>
                                <form>
                                    <div className="form-group">
                                        <label> Reference Number </label>
                                        <input 
                                            type="text" 
                                            name='appId'
                                            id='appId'
                                            value={track.appId} 
                                            onChange={e => onTextFieldChange(e)} 
                                            placeholder="Enter Reference Number" 
                                        />
                                    </div>

                                    <div className="track_btn">
                                        <button onClick={e => onFormReset(e)} className="btn blue"> Reset</button>
                                        <button onClick={e => onFormSubmit(e)} className="btn green"> Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>


                    {
                        trackData && trackData.length > 0 ?
                            trackData.map((item, index) => (
                                <div className="col-md-9">
                                    <div className="detail_refrence">
                                        <table id="customers">
                                            <tbody>
                                            <tr>
                                                <td>Applicant Name :</td>
                                                <td> 
                                                    {item.firstName} &nbsp;
                                                    {item.middleName} &nbsp;
                                                    {item.lastName}
                                                </td>
                                                <td>Applied On :</td>
                                                <td>{format(item.application.createdAt, dateFormatString)}</td>
                                            </tr>
                                            <tr>
                                                <td>Service Applied for :</td>
                                                <td>
                                                    { item.application.visaVariant.name }
                                                </td>
                                                <td>Travel Date :</td>
                                                <td>{format(item.application.arrivalDate, dateFormatString)}</td>
                                            </tr>
                                            <tr>
                                                <td>Application Status :</td>
                                                <td colSpan="3">{item.application.status}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )) :
                                ''
                    }


                    
                    
                </div>
            </div>
        </section>

        {/* 
        <section className="track_status_cnt">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="content">
                            <h3>Know the status of your Dubai Visa Application</h3>
                            <p>Travel requires a lot of planning. And knowing how much time your visa will take to process
                                helps you easily organize hotels, flights, and travel itineraries. Dubai is a hot favourite
                                amongst wanderers</p>

                            <p><b>How can one enjoy an easy trip to Dubai?</b></p>

                            <p>A well-planned Dubai trip can be a highlight of your travel diaries. So if you know your
                                Dubai visa application status, you can shape a remarkable journey to your dream destination.
                            </p>

                            <p>Different Dubai visas enable travellers to make a logical move to facilitate a
                                seamless journey. Trips can be a fun thing if:
                            </p>

                            <ul>
                                <li>Applicants enjoy the privilege to apply for a visa from the comfort of their couch.</li>
                                <li>Applicants can fill-up and submit the online visa application form.</li>
                                <li>Applicants can easily upload required documents and make secured payments.</li>
                                <li>Applicants can track the <strong>status of their online visa application</strong>.</li>
                            </ul>

                            <p><b>How to get Dubai visa application status?</b></p>

                            <p>Applicants enjoy all the above at emiratesevisaonline.com. The hassle-free Dubai visa process
                                at emiratesevisaonline.com provides you with a facility to track your Dubai visa application
                                status. The live tracking system at emirates evisa online is a highly advanced tool that
                                enables travellers to sync with their visa processing status.</p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        */}
      
    </>
  )
};

export default TrackVisaApplication;