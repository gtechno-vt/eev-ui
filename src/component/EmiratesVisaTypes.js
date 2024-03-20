import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import ApiLoader from './ApiLoader';

const EmiratesVisaTypes = () => {

  const [visaType, setVisaType] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesCount,setTotalPagesCount] = useState(1);
  const [limit,setLimit] = useState(15);
  const [showApiLoader, setShowApiLoader] = useState(false);

  const fetchData = async (page) => {
    const offset = (page - 1) * limit;
    try {
      setShowApiLoader(true);
      const response = await axios.get(
        `https://ymfzdgfyzhm.emiratesevisaonline.com/visaVariant/0/48?limit=${limit}&offset=${offset}`
      );
      setShowApiLoader(false)
      setVisaType(response.data); 
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
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);


  return (
    <>
       <Helmet>
        <title>Types of Emirates Visa - Tourist Visa, Transit Visa, Business Visa</title>
        <meta name="description" content="Choose Emirates Visa Type as per Requirements From 14 Days, 30 Days, 60 Days Tourist Visa. Apply UAE Visa For Business, Conferences And Transit."/>
        <meta name="keywords" content="types of emirates visa, emirates transit visa, emirates tourist visa, emirates visit visa, 14 days visa, 30 days single entry visa, 30 days multiple entry visa, 60 days visa, emirates visa online, emirates business visa, uae visa types, 48 hours transit visa, 96 hours transit visa" />
        <meta itemprop="name" content="Types of Emirates Visa - Tourist Visa, Transit Visa, Business Visa" />
        <meta itemprop="description" content="Choose Emirates Visa Type as per Requirements From 14 Days, 30 Days, 60 Days Tourist Visa. Apply UAE Visa For Business, Conferences And Transit." />
        <meta name="og:title" content='Types of Emirates Visa - Tourist Visa, Transit Visa, Business Visa'/>
        <meta name="og:description" content='Choose Emirates Visa Type as per Requirements From 14 Days, 30 Days, 60 Days Tourist Visa. Apply UAE Visa For Business, Conferences And Transit.'/>
        <meta name="twitter:title" content='Types of Emirates Visa - Tourist Visa, Transit Visa, Business Visa'/>
        <meta name="twitter:description" content='Choose Emirates Visa Type as per Requirements From 14 Days, 30 Days, 60 Days Tourist Visa. Apply UAE Visa For Business, Conferences And Transit.'/>
        <link rel="canonical" href="https://www.emiratesevisaonline.com/emirates-visa-types" />
      </Helmet>
        <section className="breadcrumb-spacing" style={{  backgroundImage: `url("../img/bg/applynow.jpg")` }} >
        {showApiLoader && <ApiLoader />}
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="breadcrumb_title">
                            <h3 className="page-title">Emirates Visa Types</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><Link href="/"> Home</Link></li>
                                    <li className="active">Emirates Visa Types</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>




        <section className="pad_fix_50 ">
            <div className="container">
                <div className="row">

                    {
                        visaType && visaType.length > 0 ?
                        visaType.map((item, index) => (

                            <>

                                <div className="col-md-4" key={index+1}>
                                    <div className="visaBox">
                                        <div className="visaimg">
                                            <img className="lazy" src={`data:image/png;base64,${item.visaVariantImage}`} />
                                        </div>
                                        <div className="visatextBox">

                                            <div className="overflow">
                                                <div className="column-seven mob70">
                                                    <h2 className="visaTitleNew">{item.name}</h2>
                                                    <div className="visaContent">{item.entryType.name}</div>
                                                </div>


                                                <div className="alignFromCenter column-three mob30 paddingFromRight pos-Reltv yellow">
                                                    <div className="padding-All-sm">{item.visaFee} USD</div>
                                                    <Link className="primary-button" to={'/apply-now-visa/'+item.slugVisaVariantName}>Apply Now</Link>
                                                </div>
                                            </div>


                                            <div className="paddingAll">
                                                <div dangerouslySetInnerHTML={{ __html: (item.description) }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            
                                
                            </>
                            

                        )) :
                        !showApiLoader && <div className='my-3'>No data Found</div>
                    }



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

export default EmiratesVisaTypes;