import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const HomeHCustomer = () => {
  const [happyHomeCustomer, setHappyHomeCustomer] = useState([]);
  const [startIndex,setStartIndex] = useState(0);
  const myRef = useRef(null);
  
  useEffect(() => {
    getHappyCustomerInfo();
  }, []);

  async function getHappyCustomerInfo() {
    try {
      const happyCustomerApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/reviews/site/2`);
      setHappyHomeCustomer(happyCustomerApi.data);
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  }

 const corouselArrowClick = (click) => {
   if(click === "next"){
     if(myRef?.current?.offsetWidth && (Number(myRef?.current?.offsetWidth)  >= 768)){
        console.log(happyHomeCustomer.length,startIndex,"dfdf");
        setStartIndex(prev => happyHomeCustomer?.length-2 === prev+1 ? prev : prev+1);
      }else{
      console.log("call here");
        setStartIndex(prev => happyHomeCustomer?.length === prev+1 ? prev : prev+1);
      }
    }else{
      // for prev
      setStartIndex(prev => prev === 0 ? prev : prev-1);

    }
 }

  return (
    <>
      <section className="our_happy_customer" ref={myRef}>
        <div className="container">
          <div className="row">
            <div className="title">
              <h3>Our Happy customer</h3>
            </div>
          </div>

          <div id="pinBoot">
            <span className="corousel-forward-arrow" alt="" onClick={() => corouselArrowClick("prev")}>&#8249;</span> 
            
            <div className='row overflow-hidden flex-nowrap' >
              {happyHomeCustomer && happyHomeCustomer.length > 0 ? (
                happyHomeCustomer.slice(startIndex).map((item, index) => (
                  <div key={index} className={'col-md-4 col-xs-12 displayContent'+(index+1)}  >
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
            <span  className="corousel-backward-arrow" alt="" onClick={() => corouselArrowClick("next")}>&#8250;</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHCustomer;