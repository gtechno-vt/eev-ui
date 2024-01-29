import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const EmiratesVisaBlog = () => {

    const [siteBlogs, setSiteBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPage, setNextPage] = useState(1);


    const fetchData = async (page) => {
        const limit = 15;
        const offset = (page - 1) * limit;
    
        try {
          const response = await axios.get(
            `https://ymfzdgfyzhm.emiratesevisaonline.com/blog/basic/2?limit=${limit}&offset=${offset}`
          );
          setSiteBlogs(response.data); 
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
        getSiteBlogs();
    }, []);

    async function getSiteBlogs() {
        try {
        const siteBlogApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/blog/basic/2`)
            setSiteBlogs(siteBlogApi.data);
        } catch (error) {
            console.log("Something is Wrong");
        }
    }
    */

    useEffect(() => {
		// 👇️ scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

    const dateFormatString = 'd MMMM, yyyy';
    
  return (
    <>
        <section className="breadcrumb-spacing" style={{  backgroundImage: `url("../img/bg/applynow.jpg")` }}>
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
                                        <img className="img-fluid" src={`data:image/png;base64,${item.image}`} alt="image" />
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

export default EmiratesVisaBlog;