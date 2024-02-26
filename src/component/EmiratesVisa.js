import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addMonths } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ApiLoader from './ApiLoader';
import { Helmet } from 'react-helmet';

const EmiratesVisa = () => {

    const { citizen } = useParams();
    const { travelling } = useParams();
    const navigate = useNavigate();
    const [showApiLoader,setShowApiLoader] = useState(false);
    const [leadData, setLeadData] = useState({
        'citizen': citizen || "",
        'traveling': travelling || "",
    });
    const [homeVisa, setHomeVisa] = useState([]);
    const [allCountry, setAllCountry] = useState([]);

    //== = 
    useEffect(() => {
        async function getCountry() {
            try {
                setShowApiLoader(true)
                const countryApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/country/basic`)
                setShowApiLoader(false)
                setAllCountry(countryApi.data);
                getVisaType({data:countryApi.data});
            } catch (error) {
                setAllCountry([]);
                setShowApiLoader(false)
                console.log("Something is Wrong");
            }
        }
        getCountry();
    }, []);
    //====

    async function getVisaType({data,citizen}) {
        console.log(data);
        const countryData = data && data.length > 0 ? data : allCountry;
        try {
            const newCitizen = citizen ? citizen : leadData.citizen;
            const ele = countryData.find(ele => ele.countryNameSlug === newCitizen);
            const id = ele ? ele.id : ""
            setShowApiLoader(true)
            const visaTypeApi = await axios.get(`https://ymfzdgfyzhm.emiratesevisaonline.com/visaVariant/${id}/48?fetchImages=false`)
            setShowApiLoader(false)
            setHomeVisa(visaTypeApi.data);
            console.log(visaTypeApi.data);
        } catch (error) {
            setHomeVisa([]);
            setShowApiLoader(false)
            console.log("Something is Wrong Visa Type");
        }
    }

    // === Form Submit Start Here -=====
    async function onTextFieldChange(e) {
        if(e.target.name === "citizen"){
            setHomeVisa([]);
            getVisaType({citizen:e.target.value});
        }
        setLeadData({
            ...leadData,
            [e.target.name]: e.target.value
        })
    }


    async function onFormSubmit(e) {
        e.preventDefault();

        let newCitizen = leadData.citizen;
        let newTravelling = leadData.traveling;

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
        let newCitizen = leadData.citizen ;
        let newTravelling = leadData.traveling;

        document.getElementById("citizen").style.border = "1px solid #444";
        document.getElementById("traveling").style.border = "1px solid #444";
        
        if (newCitizen == '') {
            document.getElementById("citizen").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (newTravelling == '') {
            document.getElementById("traveling").style.border = "1px solid red";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
           
        }
    
        navigate('/apply-visa/' + ids + '/' + newCitizen + '/' + travelling);
    }
    // = Form Submit #END Here...

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

   const  convertCitizen = (citizen) => {
           let str = citizen[0].toUpperCase()+ citizen.slice(1)
           return str;
    }


    return (
        <>
          <Helmet>
        <title>Official Emirates Visa For {convertCitizen(citizen)} Citizen In 24 Hours</title>
        <meta name="description" content={`Apply Emirates Visa Online For ${convertCitizen(citizen)} Citizen From Anywhere. Fill UAE Visa Application Form In 2 Minute, Make Payment and Get Visa Copy In Email.`}/>
        <meta name="keywords" content={`emirates e visa online, emirates visa for ${convertCitizen(citizen)} passport holder, apply uae visa for ${convertCitizen(citizen)} citizen, visit visa online for ${convertCitizen(citizen)} citizen, emirates business visa for ${convertCitizen(citizen)} citizen, emirates visa from ${convertCitizen(citizen)}, emirates visa documents requirement for ${convertCitizen(citizen)} nationals, uae visa fees, apply emirates visa for ${convertCitizen(citizen)} nationals, emirates e visa processing time, emirates e visa fees`} />
        <meta itemprop="name" content={`Official Emirates Visa For ${convertCitizen(citizen)} Citizen In 24 Hours`} />
        <meta itemprop="description" content={`Apply Emirates Visa Online For ${convertCitizen(citizen)} Citizen From Anywhere. Fill UAE Visa Application Form In 2 Minute, Make Payment and Get Visa Copy In Email.`} />
        <meta name="og:title" content={`Official Emirates Visa For ${convertCitizen(citizen)} Citizen In 24 Hours`}/>
        <meta name="og:description" content={`Apply Emirates Visa Online For ${convertCitizen(citizen)} Citizen From Anywhere. Fill UAE Visa Application Form In 2 Minute, Make Payment and Get Visa Copy In Email.`}/>
        <meta name="twitter:title" content={`Official Emirates Visa For ${convertCitizen(citizen)} Citizen In 24 Hours`}/>
        <meta name="twitter:description" content={`Apply Emirates Visa Online For ${convertCitizen(citizen)} Citizen From Anywhere. Fill UAE Visa Application Form In 2 Minute, Make Payment and Get Visa Copy In Email.`}/>
        <link rel="canonical" href={`https://www.emiratesevisaonline.com/emirates-visa/${citizen}/${travelling}`} />
      </Helmet>
            <section className="breadcrumb-spacing" style={{ backgroundImage: `url("../img/bg/applynow.jpg")` }}>
            {showApiLoader && <ApiLoader/>}
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
                                <div className="form_starts form_starts_desktop">

                                    <div className="name">Choose your Nationality</div>
                                    <div className="values">
                                        <select
                                            className="iner_new"
                                            name='citizen'
                                            id='citizen'
                                            onChange={e => onTextFieldChange(e)}
                                            value={leadData.citizen || ""}

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
                                            value={leadData.traveling || ""}
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
                                <div className="form_starts form_starts_mobile">

<div className="name">Choose your Nationality</div>
<div className="values mt-2">
    <select
        className="iner_new"
        name='citizen'
        id='citizen'
        onChange={e => onTextFieldChange(e)}
        value={leadData.citizen || ""}

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

<div className="name mt-2">You are Travelling From</div>
<div className="values mt-2">
    <select
        name='traveling'
        id='traveling'
        onChange={e => onTextFieldChange(e)}
        value={leadData.traveling || ""}
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

<button type="button" className="inear_ser_btn mt-3" onClick={e => onFormSubmit(e)}>Submit </button>

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

                                                    )) : showApiLoader === false ?
                                                    <div className='visa-type-contact'>Please contact us on WhatsApp to get your Visa Application processed.</div>
                                                    :""
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