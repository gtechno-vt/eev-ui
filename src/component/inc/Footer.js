import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


const Footer = () => {

    const [siteInfo, setSiteInfo] = useState([]);
    const [visitorCount,setVisitorCount] = useState();


    useEffect(() => {
        async function getSiteInfo() {
			try {
				const siteInfoApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/site-info/2`)
				setSiteInfo(siteInfoApi.data);
                setVisitorCount(siteInfoApi.data.visitorCount);

                const countInfo =  await axios.put(`https://ymfzdgfyzhm.emiratesevisaonline.com/site-info/visitor-count/2`) 
               if(countInfo.data){
                   setVisitorCount(countInfo.data);
               }


			} catch (error) {
			}
		}
      
        getSiteInfo();
	}, []);

  return (
    <>

<div className="footer_des">
    <div className="container">

        <div className="logo_addres">
            <div className="row">
                <div className="col-md-5">
                    <div className="logo_ftr">

                        <img src="/img/logo.png" alt='logo' loading="lazy"/>
                        <div className="logo_content">
                            <p> {siteInfo.footerText}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="ftr_add">

                        <div className="ftr_title">
                            <h3>Quick Links </h3>
                        </div>

                        <ul className="ftr_links">
                            <li className="active"><Link to="">Home</Link></li>
                            <li><Link to="steps-to-apply-emirates-visa">How To Apply</Link></li>
                            <li><Link to="emirates-visa-types">Emirates Visa Type</Link></li>
                            <li><Link to="track-visa-application">Track Visa Status</Link></li>
                            <li><Link to="apply-now">Urgent Visa</Link></li>
                            <li><Link to="contact-us">Contact Us</Link></li>
                        </ul>

                    </div>
                </div>

                <div className="col-md-2">
                    <div className="ftr_add">

                        <div className="ftr_title">
                            <h3>Policy Links </h3>
                        </div>

                        <ul className="ftr_links">
                            <li><Link to="terms-and-conditions">Terms And Conditions</Link></li>
                            <li><Link to="privacy-policy"> Privacy Policy </Link></li>
                            <li><Link to="emirates-visa-faqs"> Faq's </Link></li>
                            <li><Link to="emirates-visa-blog"> Blog </Link></li>
                            <li><Link to="customer-review"> Customer Review </Link></li>
                            <li><Link to="about-us"> About Us</Link></li>
                        </ul>

                    </div>
                </div>

                <div className="col-md-3">
                    <div className="ftr_add">

                        <div className="ftr_title">
                            <h3>Contact Info </h3>
                        </div>

                        <div className="ad">
                            <div className="icon"><img src="/img/icons/location.png" alt='location' loading="lazy"/></div>
                            <div className="addres">
                                <p>{siteInfo.address} </p>
                            </div>
                        </div>

                        <div className="ad">
                            <div className="icon"><img src="/img/icons/email.png" alt='email' loading="lazy"/></div>
                            <div className="addres">
                                <p>{siteInfo.emailAddress}</p>
                            </div>
                        </div>

                        <ul className="social-links clearfix">
                        <li>
  <a href="https://www.facebook.com/emiratesevisasonline" className="facebook-link" aria-label="Facebook">
    <span className="fa-brands fa-facebook-f" aria-hidden="true"></span>
    <span className="sr-only">Facebook</span> 
  </a>
</li>

<li>
  <a href="https://twitter.com/EmirateseVisa01" className="twitter-link" aria-label="Twitter">
    <span className="fa-brands fa-x-twitter" aria-hidden="true"></span>
    <span className="sr-only">Twitter</span> 
  </a>
</li>
<li>
  <a href="https://www.youtube.com/@emiratesevisaonline" className="youtube-link" aria-label="Youtube">
    <span className="fa-brands fa-youtube" aria-hidden="true"></span>
    <span className="sr-only">Youtube</span> 
  </a>
</li>
                           
<li>
  <a href="https://www.linkedin.com/company/emiratesevisaonline" className="linkedin-link" aria-label="Linkedin">
    <span className="fa-brands fa-linkedin-in" aria-hidden="true"></span>
    <span className="sr-only">Linkedin</span> 
  </a>
</li>
<li>
  <a href="https://www.instagram.com/emiratesevisaonline" className="instagram-link" aria-label="Instagram">
    <span className="fa-brands fa-instagram" aria-hidden="true"></span>
    <span className="sr-only">Instagram</span> 
  </a>
</li>
                        
                        </ul>

                        <div className="ftr_pay">
                            <img src="/img/payment.webp" alt='payment' loading="lazy"/>
                        </div>

                    </div>
                </div>



            </div>

        </div>

    </div>
</div>

<div className="copy_right">
    <div className="container">
    <div className="visit_c">
<p>All Rights Reserved {(new Date().getFullYear())} &#169;  emiratesevisaonline</p>
        <p> Visitor Count: {visitorCount}</p>
</div>
    </div>
</div>

    </>
  )
};

export default Footer;