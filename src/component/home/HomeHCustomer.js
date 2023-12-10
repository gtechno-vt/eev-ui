import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';

const HomeHCustomer = () => {

  const [siteReviews, setSiteReviews] = useState([]);
    

  useEffect(() => {
      getSiteInfo();
  }, []);

  async function getSiteInfo() {
    try {
      const siteReviewsApi = await axios.get(`http://localhost:8081/reviews/site/2`)
      setSiteReviews(siteReviewsApi.data);
      console.log(siteReviewsApi.data);
    } catch (error) {
      console.log("Something is Wrong");
    }
  }
    
    const options = {
        margin: 0,
        responsiveClass: true,
        autoplayHoverPause:true,
        nav: true,
        dots: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 2,
            },
            700: {
                items: 3,
            },
            1000: {
                items: 3,

            }
        },
    };
    

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
              <OwlCarousel className='owl-theme test_monial_slider' loop margin={10} nav {...options}>


                {
                  siteReviews && siteReviews.length > 0 ?
                  siteReviews.map((item, index) => (

                    <div className='item' key={index+1}>
                      <article className="white-panel">

                      <div class="fg_review">
                      <h3>{item.userName}</h3>
                        <ul>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          </ul>
                          </div>
                        <h4>{item.subject}</h4>  
                        <p>{item.text}</p>
                       
                      </article>
                    </div>

                    )) :
                    'Nothing Found !!!'
                }



              </OwlCarousel>
            </div>

        </div>
    </section>
    
    </>
  );
};


export default HomeHCustomer;