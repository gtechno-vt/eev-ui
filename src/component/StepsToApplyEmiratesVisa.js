import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const StepsToApplyEmiratesVisa = () => {

    useEffect(() => {
		// 👇️ scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);
    
  return (
    <>
          <Helmet>
        <title>Steps To Apply Emirates E Visa Online | Get UAE Visa By Email</title>
        <meta name="description" content="How To Fill Emirates E Visa Online Application Form In 3 Simple Steps. Fill Application Form Details Online, Pay Fees and Get Emirates E Visa Copy By Email." />
        <meta name="keywords" content="how to apply emirates visa online, emirates e visa online, uae visa application online, steps to apply uae visa, emirates visa steps, emirates visa online process" />
        <meta itemprop="name" content="How To Get Emirates E Visa Online In 3 Steps | UAE Visa Online" />
        <meta itemprop="description" content="How To Fill Emirates E Visa Online Application Form In 3 Simple Steps. Fill Application Form Details Online, Pay Fees and Get Emirates E Visa Copy By Email." />
        <meta name="og:title" content='How To Get Emirates E Visa Online In 3 Steps | UAE Visa Online'/>
        <meta name="og:description" content='How To Fill Emirates E Visa Online Application Form In 3 Simple Steps. Fill Application Form Details Online, Pay Fees and Get Emirates E Visa Copy By Email.'/>
        <meta name="twitter:title" content='How To Get Emirates E Visa Online In 3 Steps | UAE Visa Online'/>
        <meta name="twitter:description" content='How To Fill Emirates E Visa Online Application Form In 3 Simple Steps. Fill Application Form Details Online, Pay Fees and Get Emirates E Visa Copy By Email. '/>
        <link rel="canonical" href="https://www.emiratesevisaonline.com/steps-to-apply-emirates-visa" />
      </Helmet>
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

                <div className="content">
                    <div className="step_cont">
                        <div className="title">
                            <h3>Choose your citizenship country & the country you live in</h3>
                        </div>
                        <div className="step_cont_pd">
                            <p>On the Home page, you can choose living and citizenship country from dropdown.
                                We offer Emirates Visa services for individuals from all countries. We
                                guarantee a smooth processing of your online visa application, regardless
                                of your country of origin or the country you are living in.</p>
                        </div>
                    </div>

                    <div className="cir_steps">
                        <div className="cir_step">
                            <span>Step 1<span>
                                </span></span>
                        </div>
                    </div>

                    <div className="Step_img">
                        <img src="../img/steps/step1.jpg" alt='step1' />
                    </div>


                </div>

                <div className="content">
                    <div className="step_cont">
                        <div className="title">
                            <h3>Choose suitable Emirates Visa type & click on "Apply Now"</h3>
                        </div>
                        <div className="step_cont_pd">

                            <p>Choose from Emirates visa types 14 days visa, 30 days visa and 60 days visa.
                                We uphold a commitment to absolute transparency, which is why
                                we present you with a detailed list of the necessary documents
                                and the total application cost at the starting stage. You are also
                                providing with information on the typical approval time.</p>
                        </div>
                    </div>

                    <div className="cir_steps">
                        <div className="cir_step">
                            <span>Step 2<span>
                                </span></span>
                        </div>
                    </div>

                    <div className="Step_img">
                        <img src="../img/steps/step2.jpg" alt='step2'/>
                    </div>


                </div>

                <div className="content">
                    <div className="step_cont">
                        <div className="title">
                            <h3>Complete the application form for your Emirates visa</h3>
                        </div>
                        <div className="step_cont_pd">

                            <p>We have a well organized Emirates application form, ensuring that
                                even first-time travelers can complete it in an easy way. This single
                                online visa application form allows you to include multiple
                                applicants traveling together in a group, family or corporate teams.
                                Applications can be tracked in Track Visa Status.</p>
                        </div>
                    </div>

                    <div className="cir_steps">
                        <div className="cir_step">
                            <span>Step 3<span>
                                </span></span>
                        </div>
                    </div>

                    <div className="Step_img">
                        <img src="../img/steps/step3.jpg" alt='step3' />
                    </div>


                </div>

                <div className="content">
                    <div className="step_cont">
                        <div className="title">
                            <h3>Pay for your Emirates visa application fees
                                securely online using our payment gateways</h3>
                        </div>
                        <div className="step_cont_pd">

                            <p>Complete your payment securely confidence using our
                                reliable payment gateways like Stripe, Paypal and others. We offer
                                payment options through Mastercard, Visa and RuPay Debit or
                                Credit cards. You can also pay via the authenticated
                                payment link provided by our team.</p>
                        </div>
                    </div>

                    <div className="cir_steps">
                        <div className="cir_step">
                            <span>Step 4<span>
                                </span></span>
                        </div>
                    </div>

                    <div className="Step_img">
                        <img src="../img/steps/step4.jpg" alt='step4'/>
                    </div>


                </div>


            </div>
        </section>
    </>
  )
};

export default StepsToApplyEmiratesVisa;