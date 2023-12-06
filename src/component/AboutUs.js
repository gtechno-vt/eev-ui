import React, { useEffect } from 'react';

const AboutUs = () => {

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
                            <h3 className="page-title">About Us</h3>
                            <div className="breadcrumb_menu">
                                <ul className="trail_items">
                                    <li><a href="/"> Home</a></li>
                                    <li className="active">About Us</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="pad_fix_50 aboutus">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="prt_single_image-wrapper">
                        <img className="img-fluid" src="../img/about_01.png" />
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="content_ab">
                        <span className="why">Why Choose Us </span>
                        <h3>Why choose <span>Emirates E-visa Online ?</span></h3>
                        <p>Emirates evisa online advisory foundation was established with a small idea that was incepted
                            in the minds of its promoters in the year 1994! We skilfully guide applicants for
                            immigration process to any country they aspire to settle down.</p>
                        <p>Emirates evisa online advisory foundation was established with a small idea that was incepted
                            in the minds of its promoters in the year 1994! We skilfully guide applicants for
                            immigration process to any country they aspire to settle down.</p>

                        <p>Emirates evisa online advisory foundation was established with a small idea that was incepted
                            in the minds of its promoters in the year 1994! We skilfully guide applicants for
                            immigration process to any country they aspire to settle down.</p>
                        <p>Emirates evisa online advisory foundation was established with a small idea that was incepted
                            in the minds of its promoters in the year 1994! We skilfully guide applicants for
                            immigration process to any country they aspire to settle down.</p>

                        <p>Emirates evisa online advisory foundation was established with a small idea that was incepted
                            in the minds of its promoters in the year 1994! We skilfully guide applicants for
                            immigration process to any country they aspire to settle down.</p>
                        <p>Emirates evisa online advisory foundation was established with a small idea that was incepted
                            in the minds of its promoters in the year 1994! We skilfully guide applicants for
                            immigration process to any country they aspire to settle down.</p>




                    </div>
                </div>



            </div>
        </div>
    </section>
      
    </>
  )
};

export default AboutUs;