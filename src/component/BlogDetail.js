import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useParams } from "react-router-dom";

const BlogDetail = () => {

    const { id } = useParams();

    const [siteBlogs, setSiteBlogs] = useState([]);
    useEffect(() => {
        async function getSiteBlogs() {
            try {
                const siteBlogApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/blog/${id}`)
                setSiteBlogs(siteBlogApi.data);
            } catch (error) {
                console.log("Something is Wrong");
            }
        }

        getSiteBlogs();
    }, [id]);



    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const dateFormatString = 'd MMMM, yyyy';

    return (
        <>
            <section className="breadcrumb-spacing" style={{ backgroundImage: `url("../img/bg/applynow.jpg")` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumb_title">
                                <h3 className="page-title">{siteBlogs.title}</h3>
                                <div className="breadcrumb_menu">
                                    <ul className="trail_items">
                                        <li><a href="/"> Home</a></li>
                                        <li className="active">{siteBlogs.title}</li>
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

                        <div className="col-md-12">
                            <div className="all_content_blog">
                                <div className="cmt-post-featured">
                                    <img className="img-fluid" src={`data:image/png;base64,${siteBlogs.image}`} alt="" />
                                    <div className="cmt-box-post-date">
                                        <span className="cmt-entry-date">
                                            {siteBlogs.createdAt ? format(siteBlogs.createdAt, dateFormatString) : '-'}
                                        </span>
                                    </div>
                                </div>

                                <div className="cmt-post-entry-header">
                                    <div className="post-meta">

                                        <span className="cmt-meta-line entry-date"><i className="fa fa-calendar"></i><time className="entry-date published" datetime="2018-07-28T00:39:29+00:00">{siteBlogs.createdAt ? format(siteBlogs.createdAt, dateFormatString) : '-'}</time></span>
                                    </div>
                                </div>

                                <div className="cmt_post_content">
                                    <div dangerouslySetInnerHTML={{ __html: (siteBlogs.text) }} />
                                </div>



                            </div>

                        </div>

                        

                    </div>

                </div>
            </section>
        </>
    )
};

export default BlogDetail;