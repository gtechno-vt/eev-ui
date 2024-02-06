import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { isValidEmail, isValidMobile } from '../utils/StaticFunctions';
import { Helmet } from 'react-helmet';

const Contact = () => {

  const [siteInfo, setSiteInfo] = useState([]);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const handleCaptchaChange = (value) => {
    setIsCaptchaVerified(true);
  };

  const [lead, setLead] = useState({
    userName: "",
    userEmail: "",
    userMobile: "",
    subject: "",
    text: "",
    site: {
      id: '2'
    }
  });

  useEffect(() => {
    getSiteInfo();
  }, []);

  async function getSiteInfo() {
    try {
      const siteInfoApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/site-info/2`)
      setSiteInfo(siteInfoApi.data);
    } catch (error) {
      console.log("Something is Wrong");
    }
  }

  async function onTextFieldChange(e) {

    setLead({
      ...lead,
      [e.target.name]: e.target.value
    })
  }

  async function onFormSubmit(e) {
    e.preventDefault()

    document.getElementById("userName").style.borderColor = "#044";
    document.getElementById("userEmail").style.borderColor = "#044";
    document.getElementById("userMobile").style.borderColor = "#044";
    document.getElementById("subject").style.borderColor = "#044";
    document.getElementById("text").style.borderColor = "#044";
     
    let isAllRequiredDataFilled = true;

    if (!lead.userName) {
      document.getElementById("userName").style.borderColor = "red";
      isAllRequiredDataFilled = false;
    }
     if(!lead.userEmail  || !isValidEmail(lead.userEmail)) {
      document.getElementById("userEmail").style.borderColor = "red";
      isAllRequiredDataFilled = false;
    } 
     if (!lead.userMobile || !isValidMobile(lead.userMobile)) {
      document.getElementById("userMobile").style.borderColor = "red";
      isAllRequiredDataFilled = false;
    } 
    //  if (!lead.subject) {
    //   document.getElementById("subject").style.borderColor = "red";
    //   isAllRequiredDataFilled = false;
    // } 
    if (!lead.text) {
      document.getElementById("text").style.borderColor = "red";
      isAllRequiredDataFilled = false;
    } 
    
    if(isAllRequiredDataFilled) {
      if (isCaptchaVerified) {
      try {
        await axios.post(`https://ymfzdgfyzhm.emiratesevisaonline.com/query`, lead)
          .then((res) => {
            document.getElementById("succ_message").style.display = "block";
            document.getElementById("alert_message").innerHTML = "Your Query has been Submitted Succesfully!!! We will get back to you.";
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setLead({
              ...lead,
              userName: "",
              userEmail: "",
              userMobile: "",
              subject: "",
              text: ""
            })
            
            const timeoutId = setTimeout(() => {
              document.getElementById("succ_message").style.display = "none";
            }, 5000);
            return () => clearTimeout(timeoutId);
          });
      } catch (error) {
        console.log(error);
        alert("Something is Wrong");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
     } else {
        document.getElementById("succ_message").style.display = "block";
        document.getElementById("alert_message").innerHTML = "Invalid Captcha Try Again";
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const timeoutId = setTimeout(() => {
          document.getElementById("succ_message").style.display = "none";
        }, 5000);
        return () => clearTimeout(timeoutId);
     }
    }else{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

  }

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
     <Helmet>
        <title>Emirates Visa Immigration Consultant | UAE Visa Online Inquiry</title>
        <meta name="description" content="Visit Official Emirates Visa Website for E Visa Inquiry. Send Emirates Visa Inquiry Us To Our Official Email Or Talk To Our Customer Chat Support."/>
        <meta name="keywords" content="emirates visa online inquiry, emirats visa online center, contact emirates e visa online, emirates visa office, emirates visa support, emirates visa support, chat support emirates visa, online visa query, emirates embassy, official emirates immigration office" />
        <meta itemprop="name" content="Emirates Visa Immigration Consultant | UAE Visa Online Inquiry" />
        <meta itemprop="description" content="Visit Official Emirates Visa Website for E Visa Inquiry. Send Emirates Visa Inquiry Us To Our Official Email Or Talk To Our Customer Chat Support." />
        <meta name="og:title" content='Emirates Visa Immigration Consultant | UAE Visa Online Inquiry'/>
        <meta name="og:description" content='Visit Official Emirates Visa Website for E Visa Inquiry. Send Emirates Visa Inquiry Us To Our Official Email Or Talk To Our Customer Chat Support.'/>
        <meta name="twitter:title" content='Emirates Visa Immigration Consultant | UAE Visa Online Inquiry'/>
        <meta name="twitter:description" content='Visit Official Emirates Visa Website for E Visa Inquiry. Send Emirates Visa Inquiry Us To Our Official Email Or Talk To Our Customer Chat Support.'/>
        <link rel="canonical" href="https://www.emiratesevisaonline.com/contact-us" />
      </Helmet>
      <section className="breadcrumb-spacing" style={{ backgroundImage: `url("../img/bg/applynow.jpg")` }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumb_title">
                <h3 className="page-title">Contact Us</h3>
                <div className="breadcrumb_menu">
                  <ul className="trail_items">
                    <li>
                      <a href="/"> Home</a>
                    </li>
                    <li className="active">Contact Us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-details pad_fix_50">
        <div className="container ">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              <div className="all_title">
                <span className="sub-title">Need any help?</span>
                <h2>Feel free to write</h2>
              </div>

              <div id="succ_message">
                <div id='alert_message'></div>
              </div>
              <form >
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <input
                        name='userName'
                        id='userName'
                        value={lead.userName}
                        onChange={e => onTextFieldChange(e)}
                        className="form-control" type="text"
                        placeholder="Enter Name *"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <input
                        name='userEmail'
                        type="email" 
                        id='userEmail'
                        value={lead.userEmail}
                        onChange={e => onTextFieldChange(e)}
                        className="form-control" 
                        placeholder="Enter Email *"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <input
                        name='userMobile'
                        id='userMobile'
                        value={lead.userMobile}
                        onChange={e => onTextFieldChange(e)}
                        className="form-control" type="text"
                        placeholder="Enter Mobile *"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <input
                        name='subject'
                        id='subject'
                        value={lead.subject}
                        onChange={e => onTextFieldChange(e)}
                        className="form-control" type="text"
                        placeholder="Enter Subject"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <textarea name='text'
                    id='text'
                    value={lead.text}
                    onChange={e => onTextFieldChange(e)}
                    className="form-control required"
                    rows="7"
                    placeholder="Enter Message *">

                  </textarea>
                </div>
                <div className='mb-3'>
                  <ReCAPTCHA
                    sitekey="6LdmyEApAAAAAKqyBoLkgAXhvdxQ9gf1n-kcv2TT"
                    onChange={handleCaptchaChange}
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={e => onFormSubmit(e)}
                    className="btn_cont ">
                    Send message
                  </button>
                </div>

              </form>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="contact-details__right">
                <div className="all_title">
                  <span className="sub-title">Need any help?</span>
                  <h2>Get In Touch</h2>
                </div>
                <ul className="list-unstyled contact-details__info">
                  <li>
                    <div className="icon">
                      <span className="fa fa-envelope"></span>
                    </div>
                    <div className="text">
                      <h6>Write To Us</h6>
                      <a href={"mailto:" + siteInfo.emailAddress}>{siteInfo.emailAddress}</a>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="fa fa-map-marker"></span>
                    </div>
                    <div className="text">
                      <h6>Visit Us</h6>
                      <span>{siteInfo.address}</span>
                    </div>
                  </li>
                  <div className="whole-div">
                    <div className="right">
                      <h3>Follow Us: </h3>
                      <ul>
                        <li>
                          <a target='_blank' href="https://www.facebook.com/emiratesevisasonline">
                            <img src="../img/icons/fb.png" />
                          </a>
                        </li>
                        <li>
                          <a target='_blank' href="https://www.instagram.com/emiratesevisaonline">
                            <img src="../img/icons/insta.png" />
                          </a>
                        </li>
                        <li>
                          <a target='_blank' href="https://www.linkedin.com/company/emiratesevisaonline">
                            <img src="../img/icons/linke.png" />
                          </a>
                        </li>
                        <li>
                          <a target='_blank' href="https://twitter.com/EmirateseVisa01">
                            <img src="../img/icons/tw.png" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>



    </>
  )
};

export default Contact;



