import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerReview = () => {

    const [siteReviews, setSiteReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPage, setNextPage] = useState(1);

    const fetchData = async (page) => {
        const limit = 15;
        const offset = (page - 1) * limit;
    
        try {
          const response = await axios.get(
            `https://dgf0agfzdhu.emiratesevisaonline.com/reviews/site/2?limit=${limit}&offset=${offset}`
          );
          setSiteReviews(response.data); 
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
        getSiteInfo();
    }, []);

    async function getSiteInfo() {
        try {
        const siteReviewsApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/reviews/site/2`)
            setSiteReviews(siteReviewsApi.data);
        } catch (error) {
        console.log("Something is Wrong");
        }
    }
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
                            <h3 className="page-title">Customer Review</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><a href="/"> Home</a></li>
                                    <li className="active">Customer Review</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="our_happy_customer bg_rem">
            <div className="container">
                <div className="row">
                    <div className="title">
                        <h3>Customer Review</h3>
                    </div>
                </div>


                <div id="pinBoot">

                    <div className=" divid_sect">

                        {
                            siteReviews && siteReviews.length > 0 ?
                            siteReviews.map((item, index) => (

                                <div className="item" key={index+1}>
                                    <article className="white-panel">

                                        <div className="fg_review">
                                            <h3> {item.userName} </h3>
                                            <ul> 
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star"></i></li>
                                            </ul>
                                        </div>

                                        <h4>{item.subject} </h4>
                                        <p>{item.text}</p>
                                    </article>
                                </div>

                                )) :
                                'Nothing Found !!!'
                        }


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

export default CustomerReview;