import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';

const EmiratesVisaFaqs = () => {

  const [siteFaq, setSiteFaq] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  const fetchData = async (page) => {
    const limit = 15;
    const offset = (page - 1) * limit;

    try {
      const response = await axios.get(
        `https://ymfzdgfyzhm.emiratesevisaonline.com/site-faq/site/2?limit=${limit}&offset=${offset}`
      );
      setSiteFaq(response.data); 
      if(response.data.length == 0){
        setNextPage(0); 
        setCurrentPage(page-1)
      } else {
        setNextPage(1); 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  /*
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
  */

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
                            <h3 className="page-title">Faqs</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><a href="/"> Home</a></li>
                                    <li className="active">Faqs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="pad_fix_50 faq_css">
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="faqs_list">
                            <div className="all_title">
                                <h2>Frequently Asked Questions (FAQS)</h2>
                            </div>
                            <Accordion defaultActiveKey={1}>
                              {
                                siteFaq && siteFaq.length > 0 ?
                                siteFaq.map((item, index) => (

                                    <Accordion.Item eventKey={index + 1} key={index + 1} >
                                      <Accordion.Header>{item.question}  </Accordion.Header>
                                      <Accordion.Body>
                                        <div dangerouslySetInnerHTML={{ __html: (item.answer) }} />
                                      </Accordion.Body>
                                    </Accordion.Item>

                                  )) :
                                  <div className='text-center'>
                                    <div className="loader">

                                    </div>
                                  </div>
                              }
                            </Accordion>

                        </div>
                    </div>
                </div>

                {/* Pagination controls */}
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        {
                          currentPage === 1 ? 
                            <a
                              className="page-link"
                            >
                              Previous
                            </a>
                          :
                            <a
                              className="page-link"
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </a>
                        }
                      
                      </li>
                      <li className="page-item"><a className="page-link">{currentPage}</a></li>
                      <li className="page-item">
                      {

                        nextPage == 1 ? 
                          <a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                          </a>
                        :
                          <a className="page-link">
                            Last
                          </a>
                      }
                      
                      </li>
                    </ul>
                  </nav>
                {/* Pagination controls */}

                



            </div>
        </section>
      
    </>
  )
};

export default EmiratesVisaFaqs;