import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const EmiratesVisaBlog = () => {

    const [siteBlogs, setSiteBlogs] = useState([]);
    useEffect(() => {
        getSiteBlogs();
    }, []);

    async function getSiteBlogs() {
        try {
        const siteBlogApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/blog/basic/2`)
            setSiteBlogs(siteBlogApi.data);
        } catch (error) {
            console.log("Something is Wrong");
        }
    }

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
                                            <p>{item.text}</p>
                                        </div>
                                        <div className="post-bottom">
                                            <a className="cmt-btn-size-sm" href={"blog/"+item.id}><i
                                                    className="fa fa-minus"></i>Read more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            )) :
                            'Nothing Found !!!'
                    }


                </div>
                {/* 
                <div className="pagination-block mb-15 res-991-mb-0">
                    <a className="page-numbers current" href="#">1</a>
                    <a className="page-numbers" href="#">2</a>
                    <a className="next page-numbers" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
                        </svg>
                    </a>
                </div>
                */}
            </div>
        </section>
      
    </>
  )
};

export default EmiratesVisaBlog;