import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import ApiLoader from './ApiLoader';

const EmiratesVisaFaqs = () => {

  const [siteFaq, setSiteFaq] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesCount,setTotalPagesCount] = useState(1);
  const [limit,setLimit] = useState(15);
  const [showApiLoader, setShowApiLoader] = useState(false);

  const fetchData = async (page) => {
    // const limit = 15;
    const offset = (page - 1) * limit;

    try {
      setShowApiLoader(true)
      const response = await axios.get(
        `https://y2hhbibraxroyw4.emiratesevisaonline.com/site-faq/site/2?limit=${limit}&offset=${offset}`
      );
      setShowApiLoader(false)
      setSiteFaq(response.data); 
      if(Number(response?.headers["total-count"])){
        setTotalPagesCount(Math.ceil(Number(response.headers["total-count"])/limit))
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(newPage);
  };

  useEffect(() => {
		// 👇️ scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

  return (
    <>
               <Helmet>
        <title>Emirates Visa Frequently Asked Questions | UAE Visa Faqs</title>
        <meta name="description" content="Frequently Asked Questions Of UAE Visa Online Application. Visit Emirates Visa Official Website and Check Your Query Related to Apply Emirates Visa Online."/>
        <meta name="keywords" content="emirates visa faqs, uae visa faqs, emirates visa online query, frequently asked question of emirates visa online, emirates visa query" />
        <meta itemprop="name" content="Emirates Visa Frequently Asked Questions | UAE Visa Faqs" />
        <meta itemprop="description" content="Frequently Asked Questions Of UAE Visa Online Application. Visit Emirates Visa Official Website and Check Your Query Related to Apply Emirates Visa Online." />
        <meta name="og:title" content='Emirates Visa Frequently Asked Questions | UAE Visa Faqs'/>
        <meta name="og:description" content='Frequently Asked Questions Of UAE Visa Online Application. Visit Emirates Visa Official Website and Check Your Query Related to Apply Emirates Visa Online.'/>
        <meta name="twitter:title" content='Emirates Visa Frequently Asked Questions | UAE Visa Faqs'/>
        <meta name="twitter:description" content='Frequently Asked Questions Of UAE Visa Online Application. Visit Emirates Visa Official Website and Check Your Query Related to Apply Emirates Visa Online.'/>
        <link rel="canonical" href="https://www.emiratesevisaonline.com/emirates-visa-faqs" />
      </Helmet>
        <section className="breadcrumb-spacing" style={{  backgroundImage: `url("../img/bg/applynow.avif")` }}>
          {showApiLoader && <ApiLoader />}
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
            <div className="All_heading">
                    <h1 className="apply_title">Frequently Asked Questions (FAQS)
</h1>
                    <span></span>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="faqs_list">
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
                                  !showApiLoader && <div className='my-3'>No data Found</div>
                              }
                            </Accordion>

                        </div>
                    </div>
                </div>

                {/* Pagination controls */}
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                       
                          
                            <button
                              className="page-link pagination-btn"
                              disabled={currentPage === 1 ? true : false}
                              onClick={() => handlePageChange(currentPage - 1)}
                            >
                              Previous
                            </button>
                      
                      </li>
                      <li className="page-item"><button className="page-link">{currentPage}</button></li>
                      <li className="page-item">
                          <button
                           className="page-link pagination-btn" 
                           onClick={() => handlePageChange(currentPage + 1)}
                           disabled={currentPage === totalPagesCount || totalPagesCount == 0  ? true : false}
                           >
                            Next
                          </button>
                      
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