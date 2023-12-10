import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const Checkout = () => {

    const { id } = useParams();

    const [applicatDetails, setApplicatDetails] = useState([]);

    useEffect(() => {

        async function getApplicatDetails() {
            try {
                const appApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/applicant/${id}`)
                setApplicatDetails(appApi.data.application);
                console.log(appApi.data.application.id);
            } catch (error) {
                console.log("Something is Wrong Visa Type");
            }
        }

        getApplicatDetails();
    }, []);

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
                            <h3 className="page-title">Checkout</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><a href="/"> Home</a></li>
                                    <li className="active">Checkout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="checkout_pg pad_fix_50">
            <div className="container">
                <div className="row">

                    <div className="col-md-8">

                        <div className="big_order_summy">
                            <h2>Order Summary</h2>

                            <div className="column-three-dflex">
                                <div className="column-three">
                                    <div className="data">Reference ID : <span>{applicatDetails.displayId}</span></div>
                                </div>

                                <div className="column-three">
                                    <div className="data">Visa Applied for : <span> {applicatDetails.id}</span></div>
                                </div>

                                <div className="column-three">
                                    <div className="data bg_set">100% Refund if your Visa is not approved</div>
                                </div>
                            </div>





                        </div>

                        <div className="detail_table">
                            <div className="title">
                                <h3>Applicant Details</h3>
                            </div>

                            <div className="tab_set">
                                <div className="table-responsive">
                                    <table id="customers">
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Visa Applied Date</th>
                                            <th>Passport No.</th>
                                            <th>Expiry Date</th>
                                            <th>Action</th>
                                        </tr>

                                        <tr>
                                            <td>Khalid</td>
                                            <td>Ansari</td>
                                            <td>09 Nov, 2023</td>
                                            <td>4448948949498494</td>
                                            <td>14 Aug, 2040</td>
                                            <td><a href="#"> Edit </a>
                                            </td>
                                        </tr>


                                        <tr>
                                            <td>Cssfounde</td>
                                            <td>Testpankaj</td>
                                            <td>09 Nov, 2023</td>
                                            <td>4448948949498494</td>
                                            <td>16 Jan, 2036</td>
                                            <td><a href="#"> Edit </a>
                                            </td>
                                        </tr>

                                    </table>
                                </div>
                            </div>

                        </div>

                        <div className="note_check">
                            <p className="">For a limited time only, we are offering a 100% refund guarantee*, in the slim case
                                your visa application is not approved by the UAE immigration department</p>
                        </div>

                    </div>

                    <div className="col-md-4">
                        <div className="side_table_s">

                            <table className="tableStyle1" id="payment_box">
                                <tr>
                                    <th colspan="2">PAYMENT DETAILS</th>
                                </tr>

                                <tr>
                                    <td>Visa Fee</td>
                                    <td>$ 119</td>
                                </tr>

                                <tr className="add_Sr">
                                    <td colspan="2">Addtional Services</td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="d_flk">
                                            <label className="check_custom"> Travel Insurance
                                                <input type="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                            <a href="#" className="meetInfobtn">
                                                <img className="lazy" src="/img/info1.png" alt="Info" />
                                                <div className="meetInfoBox">
                                                    <h4>Travel Insurance</h4>
                                                    <p>Travel Insurance, with COVID-19 coverage is mandatory, as per the UAE
                                                        Government directive. Book the Government approved travel insurance
                                                        along with your visa to avail a flat discount of $100 on the
                                                        insurance fee.</p>
                                                </div>
                                            </a>
                                        </div>



                                    </td>
                                    <td>$ 99</td>
                                </tr>
                                <tr>

                                    <td>
                                        <div className="d_flk">
                                            <label className="check_custom"> Visa Refusal Coverage
                                                <input type="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                            <a href="#" className="meetInfobtn">
                                                <img className="lazy" src="/img/info1.png" alt="Info" />
                                                <div className="meetInfoBox">
                                                    <h4>Visa Refusal Coverage</h4>
                                                    <p>With our Visa Refusal Coverage, your application is covered. In the
                                                        event of government denial, you're entitled to a full refund.</p>
                                                    <p><b>Note:</b>
                                                        Remember, government fees and service Fees are non-refundable after
                                                        your application is submitted to the Government unless Denial
                                                        Protection is opted for."
                                                        Before availing of this service, please ensure that no existing
                                                        application is currently in the immigration system.</p>
                                                    <p>Kindly note that applications refused for security reasons by
                                                        immigration authorities are not eligible for refunds.</p>
                                                </div>
                                            </a>
                                        </div>
                                    </td>

                                    <td>$ 25</td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="d_flk">
                                            <label className="check_custom"> Airport Transfer
                                                <input type="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                            <a href="#" className="meetInfobtn">
                                                <img className="lazy" src="/img/info1.png" alt="Info" />
                                                <div className="meetInfoBox">
                                                    <h4>Airport Transfer</h4>
                                                    <p>We offers you easy, hassle free and safe airport to hotel transfers
                                                        at the lowest guaranteed price.</p>
                                                </div>
                                            </a>
                                        </div>
                                    </td>
                                    <td>$ 50</td>
                                </tr>




                                <tr>
                                    <td className="ftr_l">Total Fees</td>
                                    <td className="ftr_r">$ 119</td>
                                </tr>



                            </table>

                            <button type="submit" className="btn button" id="checkout-button" name="proceedFinal"> Proceed
                                Now</button>

                        </div>
                    </div>

                </div>
            </div>
        </section>
      
    </>
  )
};

export default Checkout;