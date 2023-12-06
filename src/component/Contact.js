import React, { useEffect } from 'react';

const Contact = () => {

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
<h3 className="page-title">Contact Us</h3>
<div className="breadcrumb_menu">
<ul className="trail_items">
<li><a href="/"> Home</a></li>
<li className="active">Contact Us</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</section>


<section className="contact-details pad_fix_50">
<div className="container ">
<div className="row">
<div className="col-xl-7 col-lg-6">

<div className="all_title">
<span className="sub-title">Need any help?</span>
<h2>Feel free to write</h2>
</div>


<form id="contact_form" name="contact_form" className="" action="includes/sendmail.php" method="post"
novalidate="novalidate">
<div className="row">
<div className="col-sm-6">
<div className="mb-3">
<input name="form_name" className="form-control" type="text" placeholder="Enter Name *" />
</div>
</div>
<div className="col-sm-6">
<div className="mb-3">
<input name="form_email" className="form-control required email" type="email"
placeholder="Enter Email *" />
</div>
</div>
</div>
<div className="row">
<div className="col-sm-6">
<div className="mb-3">
<input name="form_subject" className="form-control required" type="text"
placeholder="Enter Subject *" />
</div>
</div>
<div className="col-sm-6">
<div className="mb-3">
<input name="form_phone" className="form-control" type="text" placeholder="Enter Phone *" />
</div>
</div>
</div>
<div className="mb-3">
<textarea name="form_message" className="form-control required" rows="7"
placeholder="Enter Message *"></textarea>
</div>
<div className="mb-3">
<input name="form_botcheck" className="form-control" type="hidden" value="" />
<button type="submit" className="btn_cont ">Send message</button>

</div>
</form>

</div>

<div className="col-xl-5 col-lg-6">
<div className="contact-details__right">

<div className="all_title">
<span className="sub-title">Need any help?</span>
<h2>Get In Touch</h2>
</div>


<ul className="list-unstyled contact-details__info">

<li>
<div className="icon">
<span className="fa fa-envelope"></span>
</div>
<div className="text">
<h6>Write To Us</h6>
<a href="mailto:contact@emiratesevisaonline.com">contact@emiratesevisaonline.com</a>
</div>
</li>
<li>
<div className="icon">
<span className="fa fa-map-marker"></span>
</div>
<div className="text">
<h6>Visit Us</h6>
<span>9, Naya Bas Patoda, Jhunjhunu Rajasthan, India - 331027</span>
</div>
</li>

<div className="whole-div">

<div className="right">
<h3>Follow Us: </h3>

<ul>
<li><a href="https://www.facebook.com/emiratesevisasonline">
<img src="../img/icons/fb.png" /></a></li>

<li><a href="https://www.instagram.com/emiratesevisaonline">
<img src="../img/icons/insta.png" /></a></li>

<li><a href="https://www.linkedin.com/company/emiratesevisaonline">
<img src="../img/icons/linke.png" /></a></li>

<li><a href="https://twitter.com/EmirateseVisa01">
<img src="../img/icons/tw.png" />
</a></li>
</ul>


</div>
</div>



</ul>
</div>
</div>
</div>
</div>
</section>



</>
)
};

export default Contact;



