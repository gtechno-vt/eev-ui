import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';
import ApiLoader from './ApiLoader';

const EmiratesVisaBlog = () => {

    const [siteBlogs, setSiteBlogs] = useState([]);
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
            `https://ymfzdgfyzhm.emiratesevisaonline.com/blog/basic/2?limit=${limit}&offset=${offset}`
          );
          setShowApiLoader(false);
          setSiteBlogs(response.data); 
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

    const dateFormatString = 'd MMMM, yyyy';
  
  return (
    <>
       <Helmet>
        <title>Emirates E Visa Online Official Blog | UAE Tourist Visa Online</title>
        <meta name="description" content="emirates e visa online blog, dubai emirates visa, 14 days emirates visa, 30 days emirates visa, 60 days emirates visa online, transit visa, emirates visa on arrival, emirates visa services, emirates visa fees, emirates visa info, uae visit visa, document required for emirates visa, hot to get emirates visa, online emirates visa info"/>
        <meta name="keywords" content="emirates e visa online blog, dubai emirates visa, 14 days emirates visa, 30 days emirates visa, 60 days emirates visa online, transit visa, emirates visa on arrival, emirates visa services, emirates visa fees, emirates visa info, uae visit visa, document required for emirates visa, hot to get emirates visa, online emirates visa info" />
        <meta itemprop="name" content="Emirates E Visa Online Official Blog | UAE Tourist Visa Online" />
        <meta itemprop="description" content="Official Blog Of Emirates E Visa Online. Visit Our Blog To Get Information About Emirates Tourist, Transit And Business Visa.  Stay Tuned The Latest Visa Policy." />
        <meta name="og:title" content='Emirates E Visa Online Official Blog | UAE Tourist Visa Online'/>
        <meta name="og:description" content='Official Blog Of Emirates E Visa Online. Visit Our Blog To Get Information About Emirates Tourist, Transit And Business Visa.  Stay Tuned The Latest Visa Policy.'/>
        <meta name="twitter:title" content='Emirates E Visa Online Official Blog | UAE Tourist Visa Online'/>
        <meta name="twitter:description" content='Official Blog Of Emirates E Visa Online. Visit Our Blog To Get Information About Emirates Tourist, Transit And Business Visa.  Stay Tuned The Latest Visa Policy.'/>
        <link rel="canonical" href="https://www.emiratesevisaonline.com/emirates-visa-blog"/>
      </Helmet>
        <section className="breadcrumb-spacing" style={{  backgroundImage: `url("../img/bg/applynow.jpg")` }}>
        {showApiLoader && <ApiLoader />}
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="breadcrumb_title">
                            <h3 className="page-title">Blogs</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><a href="/"> Home</a></li>
                                    <li className="active">Blogs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="blog_grid_section clearfix">
            <div className="container">
                <div className="row">

                    {
                        siteBlogs && siteBlogs.length > 0 ?
                        siteBlogs.map((item, index) => (

                            <div className="col-lg-4 col-md-4 col-sm-6" key={index+1}>
                                <div className="featured-imagebox-post">
                                    <div className="featured-thumbnail">
                                        <img className="img-fluid" src={`data:image/png;base64,${item.image}`} alt="blogimg" />
                                    </div>
                                    <div className="featured-content">
                                        <div className="post-header">
                                            <div className="featured-title">
                                                <h3><a href="blog">{item.title}</a></h3>
                                            </div>
                                        </div>
                                        <div className="post-meta">
                                            
                                            <span><i className="fa fa-calendar"></i>{format(item.createdAt, dateFormatString)} </span>
                                        </div>
                                        <div className="post-desc">
                                            <p></p>
                                        </div>
                                        <div className="post-bottom">
                                            <a className="cmt-btn-size-sm" href={"blog/"+item.id}><i
                                                    className="fa fa-minus"></i>Read more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                           disabled={currentPage === totalPagesCount || totalPagesCount == 0 ? true : false}
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

export default EmiratesVisaBlog;