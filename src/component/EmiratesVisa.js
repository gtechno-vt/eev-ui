import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addMonths } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const EmiratesVisa = () => {

    const { citizen } = useParams();
    const { travelling } = useParams();
    const navigate = useNavigate();

    const [leadData, setLeadData] = useState({
        'citizen': '',
        'traveling': ''
    });
    const [homeVisa, setHomeVisa] = useState([]);
    const [allCountry, setAllCountry] = useState([]);

    //== = 
    useEffect(() => {



        async function getVisaType() {
            try {
                const visaTypeApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/visaVariant/0/48?fetchImages=false`)
                setHomeVisa(visaTypeApi.data);
                console.log(visaTypeApi.data);
            } catch (error) {
                console.log("Something is Wrong Visa Type");
            }
        }

        async function getCountry() {

            try {
                const countryApi = await axios.get(`https://dgf0agfzdhu.emiratesevisaonline.com/country/basic`)
                setAllCountry(countryApi.data);
            } catch (error) {
                console.log("Something is Wrong");
            }
        }


        getVisaType();
        getCountry();
    }, []);
    //====

    // === Form Submit Start Here -=====
    async function onTextFieldChange(e) {
        setLeadData({
            ...leadData,
            [e.target.name]: e.target.value
        })
    }


    async function onFormSubmit(e) {
        e.preventDefault();

        var newCitizen = leadData.citizen ? leadData.citizen : citizen;
        var newTravelling = leadData.traveling ? leadData.traveling : travelling;

        document.getElementById("citizen").style.border = "1px solid #444";
        document.getElementById("traveling").style.border = "1px solid #444";
        
        if (newCitizen == '') {
            document.getElementById("citizen").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (newTravelling == '') {
            document.getElementById("traveling").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/emirates-visa/' + newCitizen + '/' + newTravelling);
        }
    }

    async function onFormSubmitApply(e, ids) {
        e.preventDefault();

        navigate('/apply-visa/' + ids + '/' + citizen + '/' + travelling);
    }

    // = Form Submit #END Here...

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);


    return (
        <>
            <section className="breadcrumb-spacing" style={{ backgroundImage: `url("../img/bg/applynow.jpg")` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumb_title">
                                <h3 className="page-title">Apply Now </h3>
                                <div className="breadcrumb_menu">
                                    <ul className="trail_items">
                                        <li><a href="/"> Home</a></li>
                                        <li className="active">Apply Now</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 0-------------------0 */}

            <section className="innear_search">
                <div className="container">
                    <div className="width_set">
                        <div className="form_start">
                            <form method="post" action="">
                                <div className="form_starts">

                                    <div className="name">Choose your Nationality</div>
                                    <div className="values">
                                        <select
                                            className="iner_new"
                                            name='citizen'
                                            id='citizen'
                                            onChange={e => onTextFieldChange(e)}
                                            value={leadData.citizen || citizen}

                                        >
                                            <option value=''>--Select--</option>
                                            {
                                                allCountry && allCountry.length > 0 ?
                                                    allCountry.map((item, index) => (
                                                        citizen == item.countryNameSlug ?
                                                            <option key={index + 1} selected value={item.countryNameSlug}>{item.name}</option>
                                                            :
                                                            <option key={index + 1} value={item.countryNameSlug}>{item.name}</option>

                                                    )) :
                                                    ''
                                            }
                                        </select>
                                    </div>

                                    <div className="name">You are Travelling From</div>
                                    <div className="values">
                                        <select
                                            name='traveling'
                                            id='traveling'
                                            onChange={e => onTextFieldChange(e)}
                                            value={leadData.traveling || travelling}
                                            className="iner_new"
                                        >
                                            <option value=''>--Select--</option>
                                            {
                                                allCountry && allCountry.length > 0 ?
                                                    allCountry.map((item, index) => (
                                                        travelling == item.countryNameSlug ?
                                                            <option selected key={index + 1} value={item.countryNameSlug}>{item.name}</option>
                                                            :
                                                            <option key={index + 1} value={item.countryNameSlug}>{item.name}</option>
                                                    )) :
                                                    ''
                                            }
                                        </select>
                                    </div>

                                    <button type="button" className="inear_ser_btn" onClick={e => onFormSubmit(e)}>Submit </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pad_fix_50 apply_visa_detail">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title_apply">
                                <h3>Apply Emirates Visa for

                                    <b>{
                                        allCountry && allCountry.length > 0 ?
                                            allCountry.map((item, index) => (
                                                citizen == item.countryNameSlug ?
                                                    ' ' + item.name + ' '
                                                    :
                                                    ''

                                            )) :
                                            ''
                                    } </b>


                                    national travelling from
                                    <b> {
                                        allCountry && allCountry.length > 0 ?
                                            allCountry.map((item, index) => (
                                                travelling == item.countryNameSlug ?
                                                    ' ' + item.name + ' '
                                                    :
                                                    ''

                                            )) :
                                            ''
                                    } </b>

                                </h3>
                            </div>
                        </div>


                        <div className="col-md-12">
                            <div className="ApplY_data">

                                <div role="tabpanel">


                                    <div className="col-md-12">
                                        <ul className="nav nav-pills brand-pills nav-stacked" role="tablist">
                                            {
                                                homeVisa && homeVisa.length > 0 ?
                                                    homeVisa.map((item, index) => (

                                                        <li key={index + 1} role="presentation" className={index == 0 ? 'active' : '' + "brand-nav" + index == 1 ? 'busine_s' : '' + " " + index == 2 ? 'black' : 'busine_s'}>
                                                            <a href={"#tab" + (index + 1)} aria-controls={"#tab" + (index + 1)} role="tab" data-toggle="tab">{item.name}</a>
                                                        </li>

                                                    )) :
                                                    ''
                                            }



                                        </ul>
                                    </div>


                                    <div className="col-md-12">
                                        <div className="tab-content">

                                            {
                                                homeVisa && homeVisa.length > 0 ?
                                                    homeVisa.map((item, index) => (

                                                        <>

                                                            <div key={index + 1} role="tabpanel" className={index == 0 ? 'tab-pane active' : ' tab-pane'} id={"tab" + (index + 1)}>
                                                                <div className="padd_30">
                                                                    <div className="content">
                                                                        <p><b>{item.name}:</b> </p>
                                                                        <div dangerouslySetInnerHTML={{ __html: (item.description) }} />


                                                                        {/* ------------------  */}


                                                                        <div className="side_table_s">

                                                                            <table className="tableStyle1" id="payment_box">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <th colspan="2">{item.name}</th>
                                                                                    </tr>

                                                                                    <tr>
                                                                                        <td>Service Type</td>
                                                                                        <td>{item.entryType.name}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Type of Visa</td>
                                                                                        <td>{item.visaType.name}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Visa Validity</td>
                                                                                        <td> {item.visaValidity} Days After Approval  </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Stay Validity in UAE</td>
                                                                                        <td>{item.stayValidity}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Approval Time</td>
                                                                                        <td>{item.processingTime}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Visa Fee </td>
                                                                                        <td>{item.visaFee} USD</td>
                                                                                    </tr>

                                                                                    <tr>
                                                                                        <td className="tb_btn" colspan="2">
                                                                                            <button type="button" onClick={e => onFormSubmitApply(e, item.slugVisaVariantName)} className="btn">Apply Now </button></td>
                                                                                    </tr>

                                                                                </tbody>
                                                                            </table>


                                                                        </div>

                                                                        {/* --------------- */}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>


                                                    )) :
                                                    ''
                                            }




                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>







                    </div>
                </div>
            </section>


            {/* 0-------------------0 */}





        </>
    )
};

export default EmiratesVisa;