import React, { useEffect } from 'react';

const TrackVisaApplication = () => {

    useEffect(() => {
		// 👇️ scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

    
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
                                <h3>Track Your Application</h3>
                                <form className="" method="post" action="">
                                    <div className="form-group">
                                        <label> Reference Number </label>
                                        <input type="text" placeholder="Enter Reference Number" />
                                    </div>

                                    <div className="track_btn">
                                        <button className="btn blue"> Reset</button>
                                        <button className="btn green"> Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="detail_refrence">
                            <table id="customers">
                                <tr>
                                    <td>Applicant Name :</td>
                                    <td>Khalid Ansari</td>
                                    <td>Applied On :</td>
                                    <td>10-11-2023</td>
                                </tr>
                                <tr>
                                    <td>Service Applied for :</td>
                                    <td>Transit Visa (Single Entry)</td>
                                    <td>Travel Date :</td>
                                    <td>16-11-2024</td>
                                </tr>
                                <tr>
                                    <td>Application Status :</td>
                                    <td colspan="3">Payment Pending (documents received).</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

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
      
    </>
  )
};

export default TrackVisaApplication;