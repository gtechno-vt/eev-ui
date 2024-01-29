import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';

function HomeFaq() {

  const [siteFaq, setSiteFaq] = useState([]);

  useEffect(() => {
    async function getSiteInfo() {

      try {
        const siteFaqApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/site-faq/site/2`)
        setSiteFaq(siteFaqApi.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getSiteInfo();
  }, []);


  return (
    <section className="faqs">
      <div className="container">

        <div className="row">
          <div className="title">
            <h3>Frequently Asked Questions</h3>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="faqs_list">
              <Accordion defaultActiveKey={1}>

                {
                  siteFaq && siteFaq.length > 0 ?
                    siteFaq.map((item, index) => (

                      <Accordion.Item eventKey={index + 1} key={index + 1} >
                        <Accordion.Header>{item.question}  </Accordion.Header>
                        <Accordion.Body>
                          <p>{item.answer}</p>
                        </Accordion.Body>
                      </Accordion.Item>

                    )) :
                    <div className='text-center'>
                      <div className="loader">

                      </div>
                    </div>
                }


              </Accordion>
              <br />
            </div>
          </div>
        </div>

      </div>
    </section>


  );
}

export default HomeFaq;