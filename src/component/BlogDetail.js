import React, { useEffect } from 'react';

const BlogDetail = () => {

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
                            <h3 className="page-title">Privacy Policy</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><a href="/"> Home</a></li>
                                    <li className="active">Privacy Policy</li>
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

<div className="col-md-8">
<div className="all_content_blog">
<div className="cmt-post-featured">
<img className="img-fluid" src="../img/blog/detail.jpg" alt="" />
<div className="cmt-box-post-date">
<span className="cmt-entry-date">
<time className="entry-date" datetime="2019-08-28T08:07:55+00:00">28<span className="entry-month">Aug</span></time>
</span>
</div>
</div>

<div className="cmt-post-entry-header">
<div className="post-meta">

<span className="cmt-meta-line entry-date"><i className="fa fa-calendar"></i><time className="entry-date published" datetime="2018-07-28T00:39:29+00:00">July 21, 2020</time></span>
</div>
</div>

<div className="cmt_post_content">
<h3> Four major elements that we offer: </h3>
<p>There are full service engage company is to provide solution for employees needs training manage the entire HR department for companies. We offer comprehensive employment services such as assistance with employer compliance.Our company is your strategic HR partner as instead of HR.</p>

<p>There are full service engage company is to provide solution for employees needs training manage the entire HR department for companies. We offer comprehensive employment services such as assistance with employer compliance.Our company is your strategic HR partner as instead of HR.</p>

<h3> Four major elements that we offer: </h3>
<p>There are full service engage company is to provide solution for employees needs training manage the entire HR department for companies. We offer comprehensive employment services such as assistance with employer compliance.Our company is your strategic HR partner as instead of HR.</p>

<p>There are full service engage company is to provide solution for employees needs training manage the entire HR department for companies. We offer comprehensive employment services such as assistance with employer compliance.Our company is your strategic HR partner as instead of HR.</p>

<p>There are full service engage company is to provide solution for employees needs training manage the entire HR department for companies. We offer comprehensive employment services such as assistance with employer compliance.Our company is your strategic HR partner as instead of HR.</p>

<p>There are full service engage company is to provide solution for employees needs training manage the entire HR department for companies. We offer comprehensive employment services such as assistance with employer compliance.Our company is your strategic HR partner as instead of HR.</p>



</div>



</div>

</div>

<div className="col-lg-4 col-md-4 col-sm-6">
<div className="sidebar-right ">
<aside className="widget-recent-post">
<h3>Recent Posts</h3>
<ul>
<li>
<a href="#">
<img src="../img/blog/b_thumbb-01.jpg" alt="post-img" /></a>
<div className="post-detail">
<span className="post-date"><i className="fa fa-calendar"></i>Apr 06, 2020</span>
<a href="#">Why Indian Students Choose To Study Abroad?</a>
</div>
</li>

<li>
<a href="#">
<img src="../img/blog/b_thumbb-02.jpg" alt="post-img" /></a>
<div className="post-detail">
<span className="post-date"><i className="fa fa-calendar"></i>Apr 24, 2020</span>
<a href="#">To Improve Your Express Entry Application</a>
</div>
</li>

<li>
<a href="#">
<img src="../img/blog/b_thumbb-03.jpg" alt="post-img" /></a>
<div className="post-detail">
<span className="post-date"><i className="fa fa-calendar"></i>Apr 24, 2020</span>
<a href="#">Employment Insurance for Foreign Nationals</a>
</div>
</li>
</ul>
</aside>





</div>
</div>


</div>

</div>
</section>
    </>
  )
};

export default BlogDetail;