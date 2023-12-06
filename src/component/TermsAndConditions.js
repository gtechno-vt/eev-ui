import React, { useEffect } from 'react';

const TermsAndConditions = () => {

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
                        <h3 className="page-title">Terms & Conditions</h3>
                        <div className="breadcrumb_menu">
                            <ul className="trail_items">
                                <li><a href="/"> Home</a></li>
                                <li className="active">Terms & Conditions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section className="pad_fix_50 policy_css">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="content">
                        <h2>Terms & Conditions </h2>
                        <p>Mentioned below are the Terms and Conditions drafted by and for emiratesonline.com, which are
                            governed by UAE laws. Any change to these Terms and Conditions will only be considered if
                            they are provided in writing by one of our travel consultants on an official signed and
                            stamped Company letterhead.</p>

                        <p>The Company will process an application to the client's requirement and request and will not
                            be responsible for any incorrect information provided. Apart from specializing in visa
                            services, we facilitate best deals for our customers in booking hotels and tours in UAE. The
                            Company will make all efforts to make your travel experience swift and hassle free.</p>

                        <h3>Service Cancellation and Termination</h3>

                        <ul>
                            <li>By making payment towards your flight bookings, hotel bookings, e-visa, tour packages or
                                any other service you choose from <a href="#">www.emiratesonline.com</a>, you give us
                                consent to proceed further to process and deliver your required services.</li>
                            <li>By making a reservation with us, you accept and agree to the relevant cancellation and
                                no-show policy of the Trip Provider, and to any additional (delivery) terms and
                                conditions of the Trip Provider that may apply to your Trip (including the fine print of
                                the Trip Provider made available on our Platform and the relevant house rules of the
                                Trip Provider), including for services rendered and/or products offered by the Trip
                                Provider.</li>
                            <li>Hotel bookings are subject to availability and room prices may vary or change without
                                prior notice.</li>
                            <li>Emiratesonline.com reserves the right in an unforeseen event if the originally booked
                                hotel is not available then we shall ensure to get you a booking in the similar category
                                basis availability.</li>
                            <li><a href="#">www.emiratesonline.com</a> reserves the right to cancel payments or orders
                                prior to the commencement of the delivery, without stating any reasons for the same.
                            </li>
                            <li>You may cancel an order within a statutory period of 7 working days if your application
                                is not processed or forwarded to the immigration department. Time period will begin
                                after you receive an email confirmation from <a href="#">www.emiratesonline.com</a>.
                            </li>
                            <li>As soon as you make the payment at <a href="emiratesonline">www.emiratesonline.com</a>,
                                we will commence the processing of an order immediately. (NOTE: Refund can be possible
                                in the case wherein your application is not processed or not submitted to the
                                immigration for further approval.)</li>
                            <li>Any cancellation on the agreed service delivery which may result because of factors
                                beyond human control, such as the natural calamities, accidents, governmental
                                restrictions or any other event of force majeure. In such events, we shall only refund a
                                partial amount, decisive at our discretion.</li>
                            <li>Therefore, the services will have deemed to have been provided and you will lose the
                                right to cancel your order. emiratesonline.com shall expressly request your permission
                                to do so at the time you submit your order.</li>
                            <li>Insurance is processed and the policy document is published, in that case no
                                cancellation request can be entertained.</li>
                            <li>In case if you do not reach the venue for the specified activity, in the scheduled time,
                                your booking stands cancelled. And we reserve the right to deny any refund requests in
                                such cases.</li>
                            <li>Cancellations made seven calendar days prior to the tour date -Refund shall be 95% of
                                the booking amount, if the booking or part of booking falls under cancellation allowed.
                            </li>
                            <li>Cancellation of an order or withdrawal of an application shall levy pre-order processing
                                charge of USD 70.00.</li>
                            <li>Once your application is Approved by the UAE Visa issuing authority, emiratesonline.com
                                is unable to provide a refund and you must comply in accordance with the policy.</li>
                            <li>Application processed or approved at the UAE immigration desk will not get cancelled.
                            </li>
                            <li>However, the Company will not be responsible for any of the following events occurring
                                with the UAE Visa issuing authority.</li>
                            <li>Once the application is submitted and accepted at the UAE immigration department, then
                                the approval or rejection is based on the sole discretion of the department. Company
                                cannot influence or challenge immigration department for the same.</li>
                            <li>Refusal to issue the Visa, Refusal to accept the application, Issuance of an incorrect
                                Visa, Delay in processing the UAE Visa. Should the Company have caused any of the above
                                through error or omission, then the Company's liability is strictly limited to the cost
                                of a replacement Visa or refund of all fees paid and the Company cannot accept any
                                responsibility for consequential loss, such as, but not limited to: lost profits/income,
                                lost airfares.
                            </li>
                            <li>We will not trade with or provide any services to OFAC and sanctioned countries.</li>
                            <li>Customer using the website who are Minor /under the age of 18 shall not register as a
                                User of the website and shall not transact on or use the website</li>
                            <li>User is responsible for maintaining the confidentiality of his account.</li>
                            <li>With your express permission we process the application immediately with the supporting
                                documents. If the immigration asks for additional documents, applicant needs to full
                                fill the requirement, emiratesonline.com will not take any responsibility for the
                                rejection if it occurs due to non-fulfilment of requirement.</li>
                            <li>Emiratesonline is only responsible for the services we have mutually agreed upon (Which
                                is getting your e-visa application processed). Once the service is rendered, we are no
                                longer responsible, if due to any reason an applicant is not able to travel.</li>
                            <li>After we process your application and you wish to withdraw it, refund shall be processed
                                only after the standard deduction of $70.00 and in the situation:
                                <ul>
                                    <li>Application not accepted by the immigration department</li>
                                    <li>Application is not yet paid for at the immigration</li>
                                </ul>
                            </li>
                            <li>If an applicant wishes to cancel the visa which was approved by the immigration
                                department, there shall be a cancellation fee of $100.00. </li>
                            <li>No refund shall be processed in case of rejection, where in you have already applied in
                                govt system from some other service provider/travel agency.</li>
                            <li>Additional services including RT-PCR, Insurance and Airport transfers are rendered by
                                third party vendors and are all prepaid services. In case of refund there shall be a
                                partial deduction as pre-processing service charge or there can be a possible chance of
                                no refund depending upon the service provider.</li>
                        </ul>


                    </div>
                </div>
            </div>
        </div>
    </section>
      
    </>
  )
};

export default TermsAndConditions;