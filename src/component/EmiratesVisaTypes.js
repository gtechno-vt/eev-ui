import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const EmiratesVisaTypes = () => {

  const [visaType, setVisaType] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  const fetchData = async (page) => {
    const limit = 15;
    const offset = (page - 1) * limit;

    try {
      const response = await axios.get(
        `https://dgf0agfzdhu.emiratesevisaonline.com/visaVariant/0/48?limit=${limit}&offset=${offset}`
      );
      setVisaType(response.data); 
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
    getVisaType();
  }, []);

    async function getVisaType() {
        try {
            const visaTypeApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/visaVariant/0/48`)
            setVisaType(visaTypeApi.data);
        } catch (error) {
            console.log("Something is Wrong Visa Type");
        }
    }
    */


    useEffect(() => {
		// 👇️ scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);


  return (
    <>
        <section className="breadcrumb-spacing" style={{  backgroundImage: `url("../img/bg/applynow.jpg")` }} >
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
                                                    <Link className="primary-button" to={'/apply-now-visa/'+item.id}>Apply Now</Link>
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
                        ''
                    }



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

export default EmiratesVisaTypes;