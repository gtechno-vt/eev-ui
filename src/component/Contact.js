import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {

  const [siteInfo, setSiteInfo] = useState([]);

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
      const siteInfoApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/site-info/2`)
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


    if (lead.userName == '') {
      document.getElementById("userName").style.borderColor = "red";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (lead.userEmail == '') {
      document.getElementById("userEmail").style.borderColor = "red";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (lead.userMobile == '') {
      document.getElementById("userMobile").style.borderColor = "red";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (lead.subject == '') {
      document.getElementById("subject").style.borderColor = "red";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (lead.text == '') {
      document.getElementById("text").style.borderColor = "red";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {

      try {
        await axios.post(`https://dgf0agfzdhu.emiratesevisaonline.com/query`, lead)
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
            //window.location.reload();
          });
      } catch (error) {
        console.log(error);
        alert("Something is Wrong");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

  }

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
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
                        id='userEmail'
                        value={lead.userEmail}
                        onChange={e => onTextFieldChange(e)}
                        className="form-control" type="email"
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
                        placeholder="Enter Subject *"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <textarea name='text'
                    id='txet'
                    value={lead.text}
                    onChange={e => onTextFieldChange(e)}
                    className="form-control required"
                    rows="7"
                    placeholder="Enter Message *">

                  </textarea>
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



