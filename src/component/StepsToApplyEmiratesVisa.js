import React, { useEffect } from 'react';

const StepsToApplyEmiratesVisa = () => {

    useEffect(() => {
		// 👇️ scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);
    
  return (
    <>
        <section className="breadcrumb-spacing" style={{  backgroundImage: `url("../img/bg/applynow.jpg")` }} >
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="breadcrumb_title">
                            <h3 className="page-title">How To Apply</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><a href="<?= $base_url;?>"> Home</a></li>
                                    <li className="active">How To Apply</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="step_format">
            <div className="container">
                <div className="All_heading">
                    <h3 className="apply_title">How to Apply Dubai Visa</h3>
                    <span></span>
                </div>

                {/*<div className="content">
                    <div className="step_cont">
                        <div className="title">
                            <h3>Choose your nationality & the country you are living in</h3>
                        </div>
                        <div className="step_cont_pd">
                            <p>We have included an exhaustive list of countries which is more than any other service
                                provider. This ensures no matter which country you belong to, your dubai visa application is
                                processed without any hassle.</p>
                        </div>
                    </div>

                    <div className="cir_steps">
                        <div className="cir_step">
                            <span>Step 1<span>
                                </span></span>
                        </div>
                    </div>

                    <div className="Step_img">
                        <img src="../img/steps/step1.jpg" />
                    </div>


                </div>

                <div className="content">
                    <div className="step_cont">
                        <div className="title">
                            <h3>Choose your preferred DUBAI Visa type & click on "Apply Now"</h3>
                        </div>
                        <div className="step_cont_pd">

                            <p>We believe in complete transparency, and that's why we show you a list of all the required
                                documents and the total cost of the application at this stage, so you don't have any nasty
                                surprises once you complete dubai visa application form..</p>
                        </div>
                    </div>

                    <div className="cir_steps">
                        <div className="cir_step">
                            <span>Step 2<span>
                                </span></span>
                        </div>
                    </div>

                    <div className="Step_img">
                        <img src="../img/steps/step2.jpg" />
                    </div>


                </div>

                <div className="content">
                    <div className="step_cont">
                        <div className="title">
                            <h3>Complete your DUBAI Visa application form</h3>
                        </div>
                        <div className="step_cont_pd">

                            <p>We have simplified the application form so that even a first time applicant can fill this
                                form in less than 2 minutes. You can add as many applicants (travelling in a single group)
                                as you want from this single form. And yes, we are a stickler for privacy rights, that's why
                                all your personal information entered are SSL Encrypted.</p>
                        </div>
                    </div>

                    <div className="cir_steps">
                        <div className="cir_step">
                            <span>Step 3<span>
                                </span></span>
                        </div>
                    </div>

                    <div className="Step_img">
                        <img src="../img/steps/step3.jpg" />
                    </div>


                </div>

                <div className="content">
                    <div className="step_cont">
                        <div className="title">
                            <h3>Pay your DUBAI Visa application fees online through our secured payment gateway</h3>
                        </div>
                        <div className="step_cont_pd">

                            <p>Pay your application fee securely and with complete peace of mind through our trusted payment
                                gateway which uses an industry-leading 256-bit SSL for added security. We know you want
                                choices, that's why we have included the option of payment both using your credit card or
                                your debit card.</p>
                        </div>
                    </div>

                    <div className="cir_steps">
                        <div className="cir_step">
                            <span>Step 4<span>
                                </span></span>
                        </div>
                    </div>

                    <div className="Step_img">
                        <img src="../img/steps/step4.jpg" />
                    </div>


                </div>*/}


            </div>
        </section>
    </>
  )
};

export default StepsToApplyEmiratesVisa;