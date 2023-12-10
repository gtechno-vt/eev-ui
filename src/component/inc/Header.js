import React, { useEffect, useState } from 'react';
import { Link , useLocation } from "react-router-dom";
import axios from 'axios';


const Header = () => {

    const location = useLocation();

    const { hash, pathname, search } = location;


    //const ScrollListenerComponent = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [headerPosition, setHeaderPosition] = useState(false);
    const toggleClass = 'main_menu page-header is-sticky'; // replace 'yourToggleClass' with the actual class you want to toggle
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if(pathname == '/'){
            setHeaderPosition(true);
        }
        desktopToMobile('mob_notify', 'desktop_menu');
    }, []);

    async function openNav(e) {
		e.preventDefault()
		const mySidenav = document.getElementById("mySidenav");
        const main = document.getElementById("main");
        mySidenav.style.width = '100%';
        main.style.marginLeft = '100%';

	}

    async function closeNav(e) {
		e.preventDefault()
		document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0"; 

	}

    
  
    function desktopToMobile(mobileId, desktopId){
        document.getElementById(mobileId).innerHTML = document.getElementById(desktopId).innerHTML
    }

    const [siteInfo, setSiteInfo] = useState([]);
    useEffect(() => {
        getSiteInfo();
    }, []);

    async function getSiteInfo() {
        try {
        const siteInfoApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/site-info/2`)
            setSiteInfo(siteInfoApi.data);
        } catch (error) {
        console.log("Something is Wrong");
        }
    }

    
      
  return (
    
        

    
    <>

    {/* 
<div className={headerPosition == true ? 'home_pg' : ''}>
*/}
<div className=''>

    <header className={scrollPosition > 150 ? toggleClass : '' +"main_menu page-header"} >
        <div className="container">
            <div className="row">

                <div className="col-md-3">
                    <div className="logo_togle">
                        <div className="logo">
                            <Link to="/">
                                <img src="/img/logo.png" />
                            </Link>
                        </div>

                        <div className="menu_togle_btn">
                            <span onClick={e => openNav(e)}>
                                <i className="fa fa-bars" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>

                </div>

                <div className="col-md-9">
                    <div className="head_menus">
                        <nav className="" id="desktop_menu">
                            <ul>
                                <li className="active">
                                    <Link to="/">
                                        <img src="/img/icons/10.png" />
                                        <span>Home</span></Link></li>

                                <li><Link to="/steps-to-apply-emirates-visa">
                                        <img src="/img/icons/11.png" />
                                        <span>How To Apply</span></Link></li>

                                <li><Link to="/emirates-visa-types">
                                        <img src="/img/icons/12.png" />
                                        <span>Emirates Visa Type</span></Link>
                                

                                </li>

                                <li><Link to="/track-visa-application">
                                        <img src="/img/icons/13.png" />
                                        <span>Track Visa Status</span></Link></li>

                                <li><Link to="/apply-now">
                                        <img src="/img/icons/14.png" />
                                        <span>Urgent Visa</span></Link></li>

                                <li><Link to="/contact-us">
                                        <img src="/img/icons/15.png" />
                                        <span>Contact Us</span></Link></li>
                            </ul>
                            <div className="head_whatsapp">
                                <a target='_blank' href={"https://api.whatsapp.com/send?phone="+siteInfo.whatsAppNumber+"&text=Hello"}
                                    data-toggle="tooltip" data-placement="top" title={siteInfo.whatsAppNumber}> <img
                                        src="/img/vector.png" />
                                    <span>Apply Express Visa </span> </a>
                            </div>
                        </nav>

                    </div>
                </div>


            </div>
        </div>
    </header>


    <div id="mySidenav" className="sidenav">
        <div className="sidenavg">
            <div className="logo">
                <Link to="/">
                    <img src="/img/logo.png" />
                </Link>
            </div>
            <div className="mobile_menu" id="mob_notify">

            </div>
            <a href="#" className="closebtn" onClick={e => closeNav(e)} >×</a>

        </div>
    </div>

</div>

    </>
  )
};

export default Header;