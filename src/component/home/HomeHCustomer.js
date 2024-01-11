import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import $ from 'jquery';

const HomeHCustomer = () => {
  const [happyHomeCustomer, setHappyHomeCustomer] = useState([]);

  useEffect(() => {
    getHappyCustomerInfo();
  }, []);

  async function getHappyCustomerInfo() {
    try {
      const happyCustomerApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/reviews/site/2`);
      setHappyHomeCustomer(happyCustomerApi.data);
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  }

  const options = {
    items: 3,
    // Add other options as needed
  };

  useEffect(() => {
    if ($.fn.owlCarousel) {
      $('.owl-carousel').owlCarousel(options);
    }
  }, [happyHomeCustomer]);

  return (
    <>
      <section className="our_happy_customer">
        <div className="container">
          <div className="row">
            <div className="title">
              <h3>Our Happy customer</h3>
            </div>
          </div>

          <div id="pinBoot">

            <div className='row'>
              {happyHomeCustomer && happyHomeCustomer.length > 0 ? (
                happyHomeCustomer.map((item, index) => (
                  <div key={index} className={'col-md-4 col-xs-12 displayContent'+(index+1)} style={
                    {display: 'none'}
                  } >
                    <article className="white-panel">
                      <div className="fg_review">
                        <h3>{item.userName}</h3>
                        <ul>
                          <li><i className="fa fa-star"></i></li>
                          <li><i className="fa fa-star"></i></li>
                          <li><i className="fa fa-star"></i></li>
                          <li><i className="fa fa-star"></i></li>
                          <li><i className="fa fa-star"></i></li>
                        </ul>
                      </div>
                      <h4>{item.subject}</h4>
                      <p>{item.text}</p>
                    </article>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
              
            {/* 
            <OwlCarousel className="owl-theme" {...options} >
              {happyHomeCustomer && happyHomeCustomer.length > 0 ? (
                happyHomeCustomer.map((item, index) => (
                  <div key={index}>
                    <article className="white-panel">
                      <div className="fg_review">
                        <h3>{item.userName}</h3>
                        <ul>
                          <li><i className="fa fa-star"></i></li>
                          <li><i className="fa fa-star"></i></li>
                          <li><i className="fa fa-star"></i></li>
                          <li><i className="fa fa-star"></i></li>
                          <li><i className="fa fa-star"></i></li>
                        </ul>
                      </div>
                      <h4>{item.subject}</h4>
                      <p>{item.text}</p>
                    </article>
                  </div>
                ))
              ) : (
                <div>Nothing Found !!!</div>
              )}
            </OwlCarousel>
            */}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHCustomer;