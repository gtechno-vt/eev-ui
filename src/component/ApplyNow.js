import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplyNow = () => {

    const [allCountry, setAllCountry] = useState([]);
    const [visaType, setVisaType] = useState([]);


    useEffect(() => {

		async function getCountry() {

			try {
				const countryApi = await axios.get(`http://localhost:8081/country/basic`)
				setAllCountry(countryApi.data);
			} catch (error) {
				console.log("Something is Wrong");
			}
		}

		getCountry();
	}, []);

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
                                <h3 className="page-title">Apply Now</h3>
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


            <section className="apply_now_form">
                <div className="container">

                    <div className="All_heading">
                        <h3 className="apply_title">Dubai Visa Application Form</h3>
                        <span></span>
                    </div>

                    <div className="row">

                        <div className="col-md-12">
                            <div className="form_start">
                                <form>

                                    <div className="box_shadow">
                                        <div className="box_shadow_pd">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Citizenship country</label>
                                                        <select name="nationality">
                                                            <option value="">-- select one --</option>
                                                            {
                                                                allCountry && allCountry.length > 0 ?
                                                                    allCountry.map((item, index) => (
                                                                        <option key={index+1} value={item.id}>{item.name}</option>
                                                                    )) :
                                                                        ''
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Living country/Traveling from</label>
                                                        <select name="nationality">
                                                            <option value="">-- select one --</option>
                                                            {
                                                                allCountry && allCountry.length > 0 ?
                                                                    allCountry.map((item, index) => (
                                                                        <option key={index+1} value={item.id}>{item.name}</option>
                                                                    )) :
                                                                        ''
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Select Type of Visa</label>
                                                        <select className="form-control-input" name="visa_type_id" onchange="getServiceData()">
                                                            <option value="">Visa Type</option>
                                                            <option value="6">96 Hrs ( Transit Visa Single Entry ) </option>
                                                            <option value="1">14 ( Days Visa Single Entry ) </option>
                                                            <option value="2">30 ( Days Visa Single Entry ) </option>
                                                            <option value="7">60 ( Days Visa Single Entry ) </option>
                                                            <option value="21">14 ( Days Visa Multiple Entry ) </option>
                                                            <option value="3">30 ( Days Visa Multiple Entry ) </option>
                                                            <option value="22">60 ( Days Visa Multiple Entry ) </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Fee</label>
                                                        <div className="big_price">$ 119 </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    <div className="box_shadow">
                                        <div className="title">
                                            <h3>Applicant's Details </h3>
                                        </div>
                                        <div className="box_shadow_pd">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>First Name <sup>*</sup></label>
                                                        <input name="first_name" type="text" value="" placeholder="Enter First Name" />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Last Name </label>
                                                        <input name="first_name" type="text" value="" placeholder="Enter Last Name" />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Date of birth </label>
                                                        <input name="first_name" type="date" value="" placeholder="Date of birth" />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Email <sup>*</sup></label>
                                                        <input name="current_address" type="email" value="" placeholder="example@gmail.com" />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Education </label>
                                                        <select>
                                                            <option value="">Select Education </option>
                                                            <option value="BCA">BCA </option>
                                                            <option value="MCA">MCA </option>
                                                            <option value="BBA">BBA </option>
                                                            <option value="MBA">MBA </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Profession <sup>*</sup></label>
                                                        <select>
                                                            <option value="">Select Profession </option>
                                                            <option value="BCA">Profession 1 </option>
                                                            <option value="MCA">Profession 2 </option>
                                                            <option value="BBA">Profession 3 </option>
                                                            <option value="MBA">Profession 4 </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Purpose of Visit <sup>*</sup></label>
                                                        <select>
                                                            <option value="">Select Visit </option>
                                                            <option value="BCA">Visit 1 </option>
                                                            <option value="MCA">Visit 2 </option>
                                                            <option value="BBA">Visit 3 </option>
                                                            <option value="MBA">Visit 4 </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Country Code <sup>*</sup></label>
                                                        <select id="phone" name="phone">
                                                            <option value="">Select Country Code</option>
                                                            <option value="93">Afghanistan +93</option>
                                                            <option value="358">Aland Islands +358</option>
                                                            <option value="355">Albania +355</option>
                                                            <option value="213">Algeria +213</option>
                                                            <option value="1684">American Samoa +1684</option>
                                                            <option value="376">Andorra +376</option>
                                                            <option value="244">Angola +244</option>
                                                            <option value="1264">Anguilla +1264</option>
                                                            <option value="672">Antarctica +672</option>
                                                            <option value="1268">Antigua and Barbuda +1268</option>
                                                            <option value="54">Argentina +54</option>
                                                            <option value="374">Armenia +374</option>
                                                            <option value="297">Aruba +297</option>
                                                            <option value="61">Australia +61</option>
                                                            <option value="43">Austria +43</option>
                                                            <option value="994">Azerbaijan +994</option>
                                                            <option value="1242">Bahamas +1242</option>
                                                            <option value="973">Bahrain +973</option>
                                                            <option value="880">Bangladesh +880</option>
                                                            <option value="1246">Barbados +1246</option>
                                                            <option value="375">Belarus +375</option>
                                                            <option value="32">Belgium +32</option>
                                                            <option value="501">Belize +501</option>
                                                            <option value="229">Benin +229</option>
                                                            <option value="1441">Bermuda +1441</option>
                                                            <option value="975">Bhutan +975</option>
                                                            <option value="591">Bolivia +591</option>
                                                            <option value="599">Bonaire, Sint Eustatius and Saba +599</option>
                                                            <option value="387">Bosnia and Herzegovina +387</option>
                                                            <option value="267">Botswana +267</option>
                                                            <option value="55">Bouvet Island +55</option>
                                                            <option value="55">Brazil +55</option>
                                                            <option value="246">British Indian Ocean Territory +246</option>
                                                            <option value="673">Brunei Darussalam +673</option>
                                                            <option value="359">Bulgaria +359</option>
                                                            <option value="226">Burkina Faso +226</option>
                                                            <option value="257">Burundi +257</option>
                                                            <option value="855">Cambodia +855</option>
                                                            <option value="237">Cameroon +237</option>
                                                            <option value="1">Canada +1</option>
                                                            <option value="238">Cape Verde +238</option>
                                                            <option value="1345">Cayman Islands +1345</option>
                                                            <option value="236">Central African Republic +236</option>
                                                            <option value="235">Chad +235</option>
                                                            <option value="56">Chile +56</option>
                                                            <option value="86">China +86</option>
                                                            <option value="61">Christmas Island +61</option>
                                                            <option value="672">Cocos (Keeling) Islands +672</option>
                                                            <option value="57">Colombia +57</option>
                                                            <option value="269">Comoros +269</option>
                                                            <option value="242">Congo +242</option>
                                                            <option value="242">Congo, Democratic Republic of the Congo +242</option>
                                                            <option value="682">Cook Islands +682</option>
                                                            <option value="506">Costa Rica +506</option>
                                                            <option value="225">Cote D'Ivoire +225</option>
                                                            <option value="385">Croatia +385</option>
                                                            <option value="53">Cuba +53</option>
                                                            <option value="599">Curacao +599</option>
                                                            <option value="357">Cyprus +357</option>
                                                            <option value="420">Czech Republic +420</option>
                                                            <option value="45">Denmark +45</option>
                                                            <option value="253">Djibouti +253</option>
                                                            <option value="1767">Dominica +1767</option>
                                                            <option value="1809">Dominican Republic +1809</option>
                                                            <option value="593">Ecuador +593</option>
                                                            <option value="20">Egypt +20</option>
                                                            <option value="503">El Salvador +503</option>
                                                            <option value="240">Equatorial Guinea +240</option>
                                                            <option value="291">Eritrea +291</option>
                                                            <option value="372">Estonia +372</option>
                                                            <option value="251">Ethiopia +251</option>
                                                            <option value="500">Falkland Islands (Malvinas) +500</option>
                                                            <option value="298">Faroe Islands +298</option>
                                                            <option value="679">Fiji +679</option>
                                                            <option value="358">Finland +358</option>
                                                            <option value="33">France +33</option>
                                                            <option value="594">French Guiana +594</option>
                                                            <option value="689">French Polynesia +689</option>
                                                            <option value="262">French Southern Territories +262</option>
                                                            <option value="241">Gabon +241</option>
                                                            <option value="220">Gambia +220</option>
                                                            <option value="995">Georgia +995</option>
                                                            <option value="49">Germany +49</option>
                                                            <option value="233">Ghana +233</option>
                                                            <option value="350">Gibraltar +350</option>
                                                            <option value="30">Greece +30</option>
                                                            <option value="299">Greenland +299</option>
                                                            <option value="1473">Grenada +1473</option>
                                                            <option value="590">Guadeloupe +590</option>
                                                            <option value="1671">Guam +1671</option>
                                                            <option value="502">Guatemala +502</option>
                                                            <option value="44">Guernsey +44</option>
                                                            <option value="224">Guinea +224</option>
                                                            <option value="245">Guinea-Bissau +245</option>
                                                            <option value="592">Guyana +592</option>
                                                            <option value="509">Haiti +509</option>
                                                            <option value="39">Holy See (Vatican City State) +39</option>
                                                            <option value="504">Honduras +504</option>
                                                            <option value="852">Hong Kong +852</option>
                                                            <option value="36">Hungary +36</option>
                                                            <option value="354">Iceland +354</option>
                                                            <option value="91">India +91</option>
                                                            <option value="62">Indonesia +62</option>
                                                            <option value="98">Iran, Islamic Republic of +98</option>
                                                            <option value="964">Iraq +964</option>
                                                            <option value="353">Ireland +353</option>
                                                            <option value="44">Isle of Man +44</option>
                                                            <option value="972">Israel +972</option>
                                                            <option value="39">Italy +39</option>
                                                            <option value="1876">Jamaica +1876</option>
                                                            <option value="81">Japan +81</option>
                                                            <option value="44">Jersey +44</option>
                                                            <option value="962">Jordan +962</option>
                                                            <option value="7">Kazakhstan +7</option>
                                                            <option value="254">Kenya +254</option>
                                                            <option value="686">Kiribati +686</option>
                                                            <option value="850">Korea, Democratic People's Republic of +850</option>
                                                            <option value="82">Korea, Republic of +82</option>
                                                            <option value="381">Kosovo +383</option>
                                                            <option value="965">Kuwait +965</option>
                                                            <option value="996">Kyrgyzstan +996</option>
                                                            <option value="856">Lao People's Democratic Republic +856</option>
                                                            <option value="371">Latvia +371</option>
                                                            <option value="961">Lebanon +961</option>
                                                            <option value="266">Lesotho +266</option>
                                                            <option value="231">Liberia +231</option>
                                                            <option value="218">Libyan Arab Jamahiriya +218</option>
                                                            <option value="423">Liechtenstein +423</option>
                                                            <option value="370">Lithuania +370</option>
                                                            <option value="352">Luxembourg +352</option>
                                                            <option value="853">Macao +853</option>
                                                            <option value="389">Macedonia, the Former Yugoslav Republic of +389</option>
                                                            <option value="261">Madagascar +261</option>
                                                            <option value="265">Malawi +265</option>
                                                            <option value="60">Malaysia +60</option>
                                                            <option value="960">Maldives +960</option>
                                                            <option value="223">Mali +223</option>
                                                            <option value="356">Malta +356</option>
                                                            <option value="692">Marshall Islands +692</option>
                                                            <option value="596">Martinique +596</option>
                                                            <option value="222">Mauritania +222</option>
                                                            <option value="230">Mauritius +230</option>
                                                            <option value="262">Mayotte +262</option>
                                                            <option value="52">Mexico +52</option>
                                                            <option value="691">Micronesia, Federated States of +691</option>
                                                            <option value="373">Moldova, Republic of +373</option>
                                                            <option value="377">Monaco +377</option>
                                                            <option value="976">Mongolia +976</option>
                                                            <option value="382">Montenegro +382</option>
                                                            <option value="1664">Montserrat +1664</option>
                                                            <option value="212">Morocco +212</option>
                                                            <option value="258">Mozambique +258</option>
                                                            <option value="95">Myanmar +95</option>
                                                            <option value="264">Namibia +264</option>
                                                            <option value="674">Nauru +674</option>
                                                            <option value="977">Nepal +977</option>
                                                            <option value="31">Netherlands +31</option>
                                                            <option value="599">Netherlands Antilles +599</option>
                                                            <option value="687">New Caledonia +687</option>
                                                            <option value="64">New Zealand +64</option>
                                                            <option value="505">Nicaragua +505</option>
                                                            <option value="227">Niger +227</option>
                                                            <option value="234">Nigeria +234</option>
                                                            <option value="683">Niue +683</option>
                                                            <option value="672">Norfolk Island +672</option>
                                                            <option value="1670">Northern Mariana Islands +1670</option>
                                                            <option value="47">Norway +47</option>
                                                            <option value="968">Oman +968</option>
                                                            <option value="92">Pakistan +92</option>
                                                            <option value="680">Palau +680</option>
                                                            <option value="970">Palestinian Territory, Occupied +970</option>
                                                            <option value="507">Panama +507</option>
                                                            <option value="675">Papua New Guinea +675</option>
                                                            <option value="595">Paraguay +595</option>
                                                            <option value="51">Peru +51</option>
                                                            <option value="63">Philippines +63</option>
                                                            <option value="64">Pitcairn +64</option>
                                                            <option value="48">Poland +48</option>
                                                            <option value="351">Portugal +351</option>
                                                            <option value="1787">Puerto Rico +1787</option>
                                                            <option value="974">Qatar +974</option>
                                                            <option value="262">Reunion +262</option>
                                                            <option value="40">Romania +40</option>
                                                            <option value="7">Russian Federation +7</option>
                                                            <option value="250">Rwanda +250</option>
                                                            <option value="590">Saint Barthelemy +590</option>
                                                            <option value="290">Saint Helena +290</option>
                                                            <option value="1869">Saint Kitts and Nevis +1869</option>
                                                            <option value="1758">Saint Lucia +1758</option>
                                                            <option value="590">Saint Martin +590</option>
                                                            <option value="508">Saint Pierre and Miquelon +508</option>
                                                            <option value="1784">Saint Vincent and the Grenadines +1784</option>
                                                            <option value="684">Samoa +684</option>
                                                            <option value="378">San Marino +378</option>
                                                            <option value="239">Sao Tome and Principe +239</option>
                                                            <option value="966">Saudi Arabia +966</option>
                                                            <option value="221">Senegal +221</option>
                                                            <option value="381">Serbia +381</option>
                                                            <option value="381">Serbia and Montenegro +381</option>
                                                            <option value="248">Seychelles +248</option>
                                                            <option value="232">Sierra Leone +232</option>
                                                            <option value="65">Singapore +65</option>
                                                            <option value="721">Sint Maarten +721</option>
                                                            <option value="421">Slovakia +421</option>
                                                            <option value="386">Slovenia +386</option>
                                                            <option value="677">Solomon Islands +677</option>
                                                            <option value="252">Somalia +252</option>
                                                            <option value="27">South Africa +27</option>
                                                            <option value="500">South Georgia and the South Sandwich Islands +500</option>
                                                            <option value="211">South Sudan +211</option>
                                                            <option value="34">Spain +34</option>
                                                            <option value="94">Sri Lanka +94</option>
                                                            <option value="249">Sudan +249</option>
                                                            <option value="597">Suriname +597</option>
                                                            <option value="47">Svalbard and Jan Mayen +47</option>
                                                            <option value="268">Swaziland +268</option>
                                                            <option value="46">Sweden +46</option>
                                                            <option value="41">Switzerland +41</option>
                                                            <option value="963">Syrian Arab Republic +963</option>
                                                            <option value="886">Taiwan, Province of China +886</option>
                                                            <option value="992">Tajikistan +992</option>
                                                            <option value="255">Tanzania, United Republic of +255</option>
                                                            <option value="66">Thailand +66</option>
                                                            <option value="670">Timor-Leste +670</option>
                                                            <option value="228">Togo +228</option>
                                                            <option value="690">Tokelau +690</option>
                                                            <option value="676">Tonga +676</option>
                                                            <option value="1868">Trinidad and Tobago +1868</option>
                                                            <option value="216">Tunisia +216</option>
                                                            <option value="90">Turkey +90</option>
                                                            <option value="7370">Turkmenistan +7370</option>
                                                            <option value="1649">Turks and Caicos Islands +1649</option>
                                                            <option value="688">Tuvalu +688</option>
                                                            <option value="256">Uganda +256</option>
                                                            <option value="380">Ukraine +380</option>
                                                            <option value="971">United Arab Emirates +971</option>
                                                            <option value="44">United Kingdom +44</option>
                                                            <option value="1">United States +1</option>
                                                            <option value="1">United States Minor Outlying Islands +1</option>
                                                            <option value="598">Uruguay +598</option>
                                                            <option value="998">Uzbekistan +998</option>
                                                            <option value="678">Vanuatu +678</option>
                                                            <option value="58">Venezuela +58</option>
                                                            <option value="84">Viet Nam +84</option>
                                                            <option value="1284">Virgin Islands, British +1284</option>
                                                            <option value="1340">Virgin Islands, U.s. +1340</option>
                                                            <option value="681">Wallis and Futuna +681</option>
                                                            <option value="212">Western Sahara +212</option>
                                                            <option value="967">Yemen +967</option>
                                                            <option value="260">Zambia +260</option>
                                                            <option value="263">Zimbabwe +263</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Mobile Number <sup>*</sup></label>
                                                        <input name="current_address" type="number" value="" placeholder="Enter Mobile Number" />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Country Code <sup>*</sup></label>
                                                        <select className="form-select" id="phone" name="phone">
                                                            <option value="">Select Country Code</option>
                                                            <option value="93">Afghanistan +93</option>
                                                            <option value="358">Aland Islands +358</option>
                                                            <option value="355">Albania +355</option>
                                                            <option value="213">Algeria +213</option>
                                                            <option value="1684">American Samoa +1684</option>
                                                            <option value="376">Andorra +376</option>
                                                            <option value="244">Angola +244</option>
                                                            <option value="1264">Anguilla +1264</option>
                                                            <option value="672">Antarctica +672</option>
                                                            <option value="1268">Antigua and Barbuda +1268</option>
                                                            <option value="54">Argentina +54</option>
                                                            <option value="374">Armenia +374</option>
                                                            <option value="297">Aruba +297</option>
                                                            <option value="61">Australia +61</option>
                                                            <option value="43">Austria +43</option>
                                                            <option value="994">Azerbaijan +994</option>
                                                            <option value="1242">Bahamas +1242</option>
                                                            <option value="973">Bahrain +973</option>
                                                            <option value="880">Bangladesh +880</option>
                                                            <option value="1246">Barbados +1246</option>
                                                            <option value="375">Belarus +375</option>
                                                            <option value="32">Belgium +32</option>
                                                            <option value="501">Belize +501</option>
                                                            <option value="229">Benin +229</option>
                                                            <option value="1441">Bermuda +1441</option>
                                                            <option value="975">Bhutan +975</option>
                                                            <option value="591">Bolivia +591</option>
                                                            <option value="599">Bonaire, Sint Eustatius and Saba +599</option>
                                                            <option value="387">Bosnia and Herzegovina +387</option>
                                                            <option value="267">Botswana +267</option>
                                                            <option value="55">Bouvet Island +55</option>
                                                            <option value="55">Brazil +55</option>
                                                            <option value="246">British Indian Ocean Territory +246</option>
                                                            <option value="673">Brunei Darussalam +673</option>
                                                            <option value="359">Bulgaria +359</option>
                                                            <option value="226">Burkina Faso +226</option>
                                                            <option value="257">Burundi +257</option>
                                                            <option value="855">Cambodia +855</option>
                                                            <option value="237">Cameroon +237</option>
                                                            <option value="1">Canada +1</option>
                                                            <option value="238">Cape Verde +238</option>
                                                            <option value="1345">Cayman Islands +1345</option>
                                                            <option value="236">Central African Republic +236</option>
                                                            <option value="235">Chad +235</option>
                                                            <option value="56">Chile +56</option>
                                                            <option value="86">China +86</option>
                                                            <option value="61">Christmas Island +61</option>
                                                            <option value="672">Cocos (Keeling) Islands +672</option>
                                                            <option value="57">Colombia +57</option>
                                                            <option value="269">Comoros +269</option>
                                                            <option value="242">Congo +242</option>
                                                            <option value="242">Congo, Democratic Republic of the Congo +242</option>
                                                            <option value="682">Cook Islands +682</option>
                                                            <option value="506">Costa Rica +506</option>
                                                            <option value="225">Cote D'Ivoire +225</option>
                                                            <option value="385">Croatia +385</option>
                                                            <option value="53">Cuba +53</option>
                                                            <option value="599">Curacao +599</option>
                                                            <option value="357">Cyprus +357</option>
                                                            <option value="420">Czech Republic +420</option>
                                                            <option value="45">Denmark +45</option>
                                                            <option value="253">Djibouti +253</option>
                                                            <option value="1767">Dominica +1767</option>
                                                            <option value="1809">Dominican Republic +1809</option>
                                                            <option value="593">Ecuador +593</option>
                                                            <option value="20">Egypt +20</option>
                                                            <option value="503">El Salvador +503</option>
                                                            <option value="240">Equatorial Guinea +240</option>
                                                            <option value="291">Eritrea +291</option>
                                                            <option value="372">Estonia +372</option>
                                                            <option value="251">Ethiopia +251</option>
                                                            <option value="500">Falkland Islands (Malvinas) +500</option>
                                                            <option value="298">Faroe Islands +298</option>
                                                            <option value="679">Fiji +679</option>
                                                            <option value="358">Finland +358</option>
                                                            <option value="33">France +33</option>
                                                            <option value="594">French Guiana +594</option>
                                                            <option value="689">French Polynesia +689</option>
                                                            <option value="262">French Southern Territories +262</option>
                                                            <option value="241">Gabon +241</option>
                                                            <option value="220">Gambia +220</option>
                                                            <option value="995">Georgia +995</option>
                                                            <option value="49">Germany +49</option>
                                                            <option value="233">Ghana +233</option>
                                                            <option value="350">Gibraltar +350</option>
                                                            <option value="30">Greece +30</option>
                                                            <option value="299">Greenland +299</option>
                                                            <option value="1473">Grenada +1473</option>
                                                            <option value="590">Guadeloupe +590</option>
                                                            <option value="1671">Guam +1671</option>
                                                            <option value="502">Guatemala +502</option>
                                                            <option value="44">Guernsey +44</option>
                                                            <option value="224">Guinea +224</option>
                                                            <option value="245">Guinea-Bissau +245</option>
                                                            <option value="592">Guyana +592</option>
                                                            <option value="509">Haiti +509</option>
                                                            <option value="39">Holy See (Vatican City State) +39</option>
                                                            <option value="504">Honduras +504</option>
                                                            <option value="852">Hong Kong +852</option>
                                                            <option value="36">Hungary +36</option>
                                                            <option value="354">Iceland +354</option>
                                                            <option value="91">India +91</option>
                                                            <option value="62">Indonesia +62</option>
                                                            <option value="98">Iran, Islamic Republic of +98</option>
                                                            <option value="964">Iraq +964</option>
                                                            <option value="353">Ireland +353</option>
                                                            <option value="44">Isle of Man +44</option>
                                                            <option value="972">Israel +972</option>
                                                            <option value="39">Italy +39</option>
                                                            <option value="1876">Jamaica +1876</option>
                                                            <option value="81">Japan +81</option>
                                                            <option value="44">Jersey +44</option>
                                                            <option value="962">Jordan +962</option>
                                                            <option value="7">Kazakhstan +7</option>
                                                            <option value="254">Kenya +254</option>
                                                            <option value="686">Kiribati +686</option>
                                                            <option value="850">Korea, Democratic People's Republic of +850</option>
                                                            <option value="82">Korea, Republic of +82</option>
                                                            <option value="381">Kosovo +383</option>
                                                            <option value="965">Kuwait +965</option>
                                                            <option value="996">Kyrgyzstan +996</option>
                                                            <option value="856">Lao People's Democratic Republic +856</option>
                                                            <option value="371">Latvia +371</option>
                                                            <option value="961">Lebanon +961</option>
                                                            <option value="266">Lesotho +266</option>
                                                            <option value="231">Liberia +231</option>
                                                            <option value="218">Libyan Arab Jamahiriya +218</option>
                                                            <option value="423">Liechtenstein +423</option>
                                                            <option value="370">Lithuania +370</option>
                                                            <option value="352">Luxembourg +352</option>
                                                            <option value="853">Macao +853</option>
                                                            <option value="389">Macedonia, the Former Yugoslav Republic of +389</option>
                                                            <option value="261">Madagascar +261</option>
                                                            <option value="265">Malawi +265</option>
                                                            <option value="60">Malaysia +60</option>
                                                            <option value="960">Maldives +960</option>
                                                            <option value="223">Mali +223</option>
                                                            <option value="356">Malta +356</option>
                                                            <option value="692">Marshall Islands +692</option>
                                                            <option value="596">Martinique +596</option>
                                                            <option value="222">Mauritania +222</option>
                                                            <option value="230">Mauritius +230</option>
                                                            <option value="262">Mayotte +262</option>
                                                            <option value="52">Mexico +52</option>
                                                            <option value="691">Micronesia, Federated States of +691</option>
                                                            <option value="373">Moldova, Republic of +373</option>
                                                            <option value="377">Monaco +377</option>
                                                            <option value="976">Mongolia +976</option>
                                                            <option value="382">Montenegro +382</option>
                                                            <option value="1664">Montserrat +1664</option>
                                                            <option value="212">Morocco +212</option>
                                                            <option value="258">Mozambique +258</option>
                                                            <option value="95">Myanmar +95</option>
                                                            <option value="264">Namibia +264</option>
                                                            <option value="674">Nauru +674</option>
                                                            <option value="977">Nepal +977</option>
                                                            <option value="31">Netherlands +31</option>
                                                            <option value="599">Netherlands Antilles +599</option>
                                                            <option value="687">New Caledonia +687</option>
                                                            <option value="64">New Zealand +64</option>
                                                            <option value="505">Nicaragua +505</option>
                                                            <option value="227">Niger +227</option>
                                                            <option value="234">Nigeria +234</option>
                                                            <option value="683">Niue +683</option>
                                                            <option value="672">Norfolk Island +672</option>
                                                            <option value="1670">Northern Mariana Islands +1670</option>
                                                            <option value="47">Norway +47</option>
                                                            <option value="968">Oman +968</option>
                                                            <option value="92">Pakistan +92</option>
                                                            <option value="680">Palau +680</option>
                                                            <option value="970">Palestinian Territory, Occupied +970</option>
                                                            <option value="507">Panama +507</option>
                                                            <option value="675">Papua New Guinea +675</option>
                                                            <option value="595">Paraguay +595</option>
                                                            <option value="51">Peru +51</option>
                                                            <option value="63">Philippines +63</option>
                                                            <option value="64">Pitcairn +64</option>
                                                            <option value="48">Poland +48</option>
                                                            <option value="351">Portugal +351</option>
                                                            <option value="1787">Puerto Rico +1787</option>
                                                            <option value="974">Qatar +974</option>
                                                            <option value="262">Reunion +262</option>
                                                            <option value="40">Romania +40</option>
                                                            <option value="7">Russian Federation +7</option>
                                                            <option value="250">Rwanda +250</option>
                                                            <option value="590">Saint Barthelemy +590</option>
                                                            <option value="290">Saint Helena +290</option>
                                                            <option value="1869">Saint Kitts and Nevis +1869</option>
                                                            <option value="1758">Saint Lucia +1758</option>
                                                            <option value="590">Saint Martin +590</option>
                                                            <option value="508">Saint Pierre and Miquelon +508</option>
                                                            <option value="1784">Saint Vincent and the Grenadines +1784</option>
                                                            <option value="684">Samoa +684</option>
                                                            <option value="378">San Marino +378</option>
                                                            <option value="239">Sao Tome and Principe +239</option>
                                                            <option value="966">Saudi Arabia +966</option>
                                                            <option value="221">Senegal +221</option>
                                                            <option value="381">Serbia +381</option>
                                                            <option value="381">Serbia and Montenegro +381</option>
                                                            <option value="248">Seychelles +248</option>
                                                            <option value="232">Sierra Leone +232</option>
                                                            <option value="65">Singapore +65</option>
                                                            <option value="721">Sint Maarten +721</option>
                                                            <option value="421">Slovakia +421</option>
                                                            <option value="386">Slovenia +386</option>
                                                            <option value="677">Solomon Islands +677</option>
                                                            <option value="252">Somalia +252</option>
                                                            <option value="27">South Africa +27</option>
                                                            <option value="500">South Georgia and the South Sandwich Islands +500</option>
                                                            <option value="211">South Sudan +211</option>
                                                            <option value="34">Spain +34</option>
                                                            <option value="94">Sri Lanka +94</option>
                                                            <option value="249">Sudan +249</option>
                                                            <option value="597">Suriname +597</option>
                                                            <option value="47">Svalbard and Jan Mayen +47</option>
                                                            <option value="268">Swaziland +268</option>
                                                            <option value="46">Sweden +46</option>
                                                            <option value="41">Switzerland +41</option>
                                                            <option value="963">Syrian Arab Republic +963</option>
                                                            <option value="886">Taiwan, Province of China +886</option>
                                                            <option value="992">Tajikistan +992</option>
                                                            <option value="255">Tanzania, United Republic of +255</option>
                                                            <option value="66">Thailand +66</option>
                                                            <option value="670">Timor-Leste +670</option>
                                                            <option value="228">Togo +228</option>
                                                            <option value="690">Tokelau +690</option>
                                                            <option value="676">Tonga +676</option>
                                                            <option value="1868">Trinidad and Tobago +1868</option>
                                                            <option value="216">Tunisia +216</option>
                                                            <option value="90">Turkey +90</option>
                                                            <option value="7370">Turkmenistan +7370</option>
                                                            <option value="1649">Turks and Caicos Islands +1649</option>
                                                            <option value="688">Tuvalu +688</option>
                                                            <option value="256">Uganda +256</option>
                                                            <option value="380">Ukraine +380</option>
                                                            <option value="971">United Arab Emirates +971</option>
                                                            <option value="44">United Kingdom +44</option>
                                                            <option value="1">United States +1</option>
                                                            <option value="1">United States Minor Outlying Islands +1</option>
                                                            <option value="598">Uruguay +598</option>
                                                            <option value="998">Uzbekistan +998</option>
                                                            <option value="678">Vanuatu +678</option>
                                                            <option value="58">Venezuela +58</option>
                                                            <option value="84">Viet Nam +84</option>
                                                            <option value="1284">Virgin Islands, British +1284</option>
                                                            <option value="1340">Virgin Islands, U.s. +1340</option>
                                                            <option value="681">Wallis and Futuna +681</option>
                                                            <option value="212">Western Sahara +212</option>
                                                            <option value="967">Yemen +967</option>
                                                            <option value="260">Zambia +260</option>
                                                            <option value="263">Zimbabwe +263</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Whatsapp Number <sup>*</sup></label>
                                                        <input name="Whatsapp Number" type="number" value="" placeholder="Enter Whatsapp Number" />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>First UAE Visit? <sup>*</sup></label>

                                                        <div className="radio_btn">
                                                            <label for="html">
                                                                <input type="radio" id="html" name="fav_language" value="HTML" />
                                                                Yes</label>

                                                            <label for="css">
                                                                <input type="radio" id="css" name="fav_language" value="CSS" />
                                                                No</label>

                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="col-md-8">
                                                    <div className="form-group">
                                                        <label>Is There Any family/friends/Known Person of yours in UAE?<sup>*</sup></label>

                                                        <div className="radio_btn">
                                                            <label for="html">
                                                                <input type="radio" id="html" name="fav_language" value="HTML" />
                                                                Yes</label>

                                                            <label for="css">
                                                                <input type="radio" id="css" name="fav_language" value="CSS" />
                                                                No</label>

                                                        </div>

                                                    </div>
                                                </div>




                                            </div>
                                        </div>
                                    </div>

                                    <div className="box_shadow">
                                        <div className="title">
                                            <h3>Address Details </h3>
                                        </div>
                                        <div className="box_shadow_pd">
                                            <div className="row">

                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Current Address (where you are currently staying) <sup>*</sup></label>
                                                        <input name="current_address" type="text" value="" placeholder="Enter Current Address" />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input name="current_address" type="text" value="" placeholder="Enter City" />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label> State/Province <sup>*</sup></label>
                                                        <input name="current_address" type="text" value="" placeholder="Enter State/Province" />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Zipcode / Pincode / Postal Code</label>
                                                        <input name="current_address" value="" type="number" placeholder="Enter Zipcode / Pincode / Postal Code" />
                                                    </div>
                                                </div>



                                            </div>
                                        </div>
                                    </div>

                                    <div className="box_shadow">
                                        <div className="title">
                                            <h3>Passport Details </h3>
                                        </div>
                                        <div className="box_shadow_pd">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Passport Number <sup>*</sup></label>
                                                        <input name="first_name" type="text" value="" placeholder="Enter Passport Number" />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Passport Expiry Date <sup>*</sup></label>

                                                        <div className="date_gap">
                                                            <select id="" name="">
                                                                <option value="">Day</option>
                                                                <option value="01">01</option>
                                                                <option value="02">02</option>
                                                                <option value="03">03</option>
                                                                <option value="04">04</option>
                                                                <option value="05">05</option>
                                                                <option value="06">06</option>
                                                                <option value="07">07</option>
                                                                <option value="08">08</option>
                                                                <option value="09">09</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                                <option value="12">12</option>
                                                                <option value="13">13</option>
                                                                <option value="14">14</option>
                                                                <option value="15">15</option>
                                                                <option value="16">16</option>
                                                                <option value="17">17</option>
                                                                <option value="18">18</option>
                                                                <option value="19">19</option>
                                                                <option value="20">20</option>
                                                                <option value="21">21</option>
                                                                <option value="22">22</option>
                                                                <option value="23">23</option>
                                                                <option value="24">24</option>
                                                                <option value="25">25</option>
                                                                <option value="26">26</option>
                                                                <option value="27">27</option>
                                                                <option value="28">28</option>
                                                                <option value="29">29</option>
                                                                <option value="30">30</option>
                                                                <option value="31">31</option>
                                                            </select>

                                                            <select id="" name="">
                                                                <option value="">Month</option>
                                                                <option value="01">January</option>
                                                                <option value="02">February</option>
                                                                <option value="03">March</option>
                                                                <option value="04">April</option>
                                                                <option value="05">May</option>
                                                                <option value="06">June</option>
                                                                <option value="07">July</option>
                                                                <option value="08">August</option>
                                                                <option value="09">September</option>
                                                                <option value="10">October</option>
                                                                <option value="11">November</option>
                                                                <option value="12">December</option>
                                                            </select>

                                                            <select id="" name="">
                                                                <option value="">Year</option>
                                                                <option value="2053">2053</option>
                                                                <option value="2052">2052</option>
                                                                <option value="2051">2051</option>
                                                                <option value="2050">2050</option>
                                                                <option value="2049">2049</option>
                                                                <option value="2048">2048</option>
                                                                <option value="2047">2047</option>
                                                                <option value="2046">2046</option>
                                                                <option value="2045">2045</option>
                                                                <option value="2044">2044</option>
                                                                <option value="2043">2043</option>
                                                                <option value="2042">2042</option>
                                                                <option value="2041">2041</option>
                                                                <option value="2040">2040</option>
                                                                <option value="2039">2039</option>
                                                                <option value="2038">2038</option>
                                                                <option value="2037">2037</option>
                                                                <option value="2036">2036</option>
                                                                <option value="2035">2035</option>
                                                                <option value="2034">2034</option>
                                                                <option value="2033">2033</option>
                                                                <option value="2032">2032</option>
                                                                <option value="2031">2031</option>
                                                                <option value="2030">2030</option>
                                                                <option value="2029">2029</option>
                                                                <option value="2028">2028</option>
                                                                <option value="2027">2027</option>
                                                                <option value="2026">2026</option>
                                                                <option value="2025">2025</option>
                                                                <option value="2024">2024</option>
                                                                <option value="2023">2023</option>
                                                            </select>

                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Arrival Date <sup>*</sup></label>

                                                        <div className="date_gap">
                                                            <select id="" name="">
                                                                <option value="">Day</option>
                                                                <option value="01">01</option>
                                                                <option value="02">02</option>
                                                                <option value="03">03</option>
                                                                <option value="04">04</option>
                                                                <option value="05">05</option>
                                                                <option value="06">06</option>
                                                                <option value="07">07</option>
                                                                <option value="08">08</option>
                                                                <option value="09">09</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                                <option value="12">12</option>
                                                                <option value="13">13</option>
                                                                <option value="14">14</option>
                                                                <option value="15">15</option>
                                                                <option value="16">16</option>
                                                                <option value="17">17</option>
                                                                <option value="18">18</option>
                                                                <option value="19">19</option>
                                                                <option value="20">20</option>
                                                                <option value="21">21</option>
                                                                <option value="22">22</option>
                                                                <option value="23">23</option>
                                                                <option value="24">24</option>
                                                                <option value="25">25</option>
                                                                <option value="26">26</option>
                                                                <option value="27">27</option>
                                                                <option value="28">28</option>
                                                                <option value="29">29</option>
                                                                <option value="30">30</option>
                                                                <option value="31">31</option>
                                                            </select>

                                                            <select id="" name="">
                                                                <option value="">Month</option>
                                                                <option value="01">January</option>
                                                                <option value="02">February</option>
                                                                <option value="03">March</option>
                                                                <option value="04">April</option>
                                                                <option value="05">May</option>
                                                                <option value="06">June</option>
                                                                <option value="07">July</option>
                                                                <option value="08">August</option>
                                                                <option value="09">September</option>
                                                                <option value="10">October</option>
                                                                <option value="11">November</option>
                                                                <option value="12">December</option>
                                                            </select>

                                                            <select id="" name="">
                                                                <option value="">Year</option>
                                                                <option value="2053">2053</option>
                                                                <option value="2052">2052</option>
                                                                <option value="2051">2051</option>
                                                                <option value="2050">2050</option>
                                                                <option value="2049">2049</option>
                                                                <option value="2048">2048</option>
                                                                <option value="2047">2047</option>
                                                                <option value="2046">2046</option>
                                                                <option value="2045">2045</option>
                                                                <option value="2044">2044</option>
                                                                <option value="2043">2043</option>
                                                                <option value="2042">2042</option>
                                                                <option value="2041">2041</option>
                                                                <option value="2040">2040</option>
                                                                <option value="2039">2039</option>
                                                                <option value="2038">2038</option>
                                                                <option value="2037">2037</option>
                                                                <option value="2036">2036</option>
                                                                <option value="2035">2035</option>
                                                                <option value="2034">2034</option>
                                                                <option value="2033">2033</option>
                                                                <option value="2032">2032</option>
                                                                <option value="2031">2031</option>
                                                                <option value="2030">2030</option>
                                                                <option value="2029">2029</option>
                                                                <option value="2028">2028</option>
                                                                <option value="2027">2027</option>
                                                                <option value="2026">2026</option>
                                                                <option value="2025">2025</option>
                                                                <option value="2024">2024</option>
                                                                <option value="2023">2023</option>
                                                            </select>

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="box_shadow">
                                        <div className="title">
                                            <h3>Upload Documents </h3>
                                        </div>
                                        <div className="box_shadow_pd">
                                            <div className="row">


                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Colored Passport</label>
                                                        <input type="file" onchange="readURL(this, 'blah');" />
                                                    </div>
                                                    <div className="form-group pic">
                                                        <div className="set">
                                                            <img id="blah" src="../img/passport.jpg" alt="your image" />
                                                        </div>
                                                        <label>Colored Passport copy</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Colored photograph</label>
                                                        <input type="file" onchange="readURL(this, 'blah1');" />
                                                    </div>
                                                    <div className="form-group pic">
                                                        <div className="set">
                                                            <img id="blah1" src="../img/dummy-avatar.jpg" alt="your image" />
                                                        </div>
                                                        <label>Colored photograph</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Others</label>
                                                        <input type="file" onchange="readURL(this, 'blah1');" />
                                                    </div>
                                                    <div className="form-group pic">
                                                        <div className="set">
                                                            <img id="blah1" src="../img/dummy-avatar.jpg" alt="your image" />
                                                        </div>
                                                        <label>Colored photograph</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <div className="note">
                                                            <p><b>Note:</b> Upload of passport and photograph are not mandatory to complete the visa application form. You can provide us these documents later also on email: contact@emiratesevisaonline.com or on WhatsApp +91-1234567890</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="btn_d_flex">
                                                    <button type="submit" className="green"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" /></svg> Add More Applications </button>
                                                    <button type="submit" className="red">Submit Application </button>


                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                    <div className="box_shadow">
                                        <div className="title">
                                            <h3>Add More Applicant's Details </h3>
                                        </div>

                                        <div className="box_shadow_pd">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>First name <sup>*</sup></label>
                                                        <input name="first_name" type="text" value="" placeholder="Enter First Name" />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Last name <sup>*</sup></label>
                                                        <input name="Last_name" type="text" value="" placeholder="Enter Last Name" />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Date Of Birth <sup>*</sup></label>
                                                        <input name="Last_name" type="date" value="" />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Email Id</label>
                                                        <input name="Last_name" type="email" value="" placeholder="Enter Email id" />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Whatsapp Number</label>
                                                        <input type="text" id="mobile_code" placeholder="Phone Number" name="name" />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Passport Number</label>
                                                        <input name="first_name" type="text" value="" placeholder="Enter Passport Number" />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Passport Expiry Date</label>

                                                        <div className="date_gap">
                                                            <select id="" name="">
                                                                <option value="">Day</option>
                                                                <option value="01">01</option>
                                                                <option value="02">02</option>
                                                                <option value="03">03</option>
                                                                <option value="04">04</option>
                                                                <option value="05">05</option>
                                                                <option value="06">06</option>
                                                                <option value="07">07</option>
                                                                <option value="08">08</option>
                                                                <option value="09">09</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                                <option value="12">12</option>
                                                                <option value="13">13</option>
                                                                <option value="14">14</option>
                                                                <option value="15">15</option>
                                                                <option value="16">16</option>
                                                                <option value="17">17</option>
                                                                <option value="18">18</option>
                                                                <option value="19">19</option>
                                                                <option value="20">20</option>
                                                                <option value="21">21</option>
                                                                <option value="22">22</option>
                                                                <option value="23">23</option>
                                                                <option value="24">24</option>
                                                                <option value="25">25</option>
                                                                <option value="26">26</option>
                                                                <option value="27">27</option>
                                                                <option value="28">28</option>
                                                                <option value="29">29</option>
                                                                <option value="30">30</option>
                                                                <option value="31">31</option>
                                                            </select>

                                                            <select id="" name="">
                                                                <option value="">Month</option>
                                                                <option value="01">January</option>
                                                                <option value="02">February</option>
                                                                <option value="03">March</option>
                                                                <option value="04">April</option>
                                                                <option value="05">May</option>
                                                                <option value="06">June</option>
                                                                <option value="07">July</option>
                                                                <option value="08">August</option>
                                                                <option value="09">September</option>
                                                                <option value="10">October</option>
                                                                <option value="11">November</option>
                                                                <option value="12">December</option>
                                                            </select>

                                                            <select id="" name="">
                                                                <option value="">Year</option>
                                                                <option value="2053">2053</option>
                                                                <option value="2052">2052</option>
                                                                <option value="2051">2051</option>
                                                                <option value="2050">2050</option>
                                                                <option value="2049">2049</option>
                                                                <option value="2048">2048</option>
                                                                <option value="2047">2047</option>
                                                                <option value="2046">2046</option>
                                                                <option value="2045">2045</option>
                                                                <option value="2044">2044</option>
                                                                <option value="2043">2043</option>
                                                                <option value="2042">2042</option>
                                                                <option value="2041">2041</option>
                                                                <option value="2040">2040</option>
                                                                <option value="2039">2039</option>
                                                                <option value="2038">2038</option>
                                                                <option value="2037">2037</option>
                                                                <option value="2036">2036</option>
                                                                <option value="2035">2035</option>
                                                                <option value="2034">2034</option>
                                                                <option value="2033">2033</option>
                                                                <option value="2032">2032</option>
                                                                <option value="2031">2031</option>
                                                                <option value="2030">2030</option>
                                                                <option value="2029">2029</option>
                                                                <option value="2028">2028</option>
                                                                <option value="2027">2027</option>
                                                                <option value="2026">2026</option>
                                                                <option value="2025">2025</option>
                                                                <option value="2024">2024</option>
                                                                <option value="2023">2023</option>
                                                            </select>

                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label>Arrival Date</label>

                                                        <div className="date_gap">
                                                            <select id="" name="">
                                                                <option value="">Day</option>
                                                                <option value="01">01</option>
                                                                <option value="02">02</option>
                                                                <option value="03">03</option>
                                                                <option value="04">04</option>
                                                                <option value="05">05</option>
                                                                <option value="06">06</option>
                                                                <option value="07">07</option>
                                                                <option value="08">08</option>
                                                                <option value="09">09</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                                <option value="12">12</option>
                                                                <option value="13">13</option>
                                                                <option value="14">14</option>
                                                                <option value="15">15</option>
                                                                <option value="16">16</option>
                                                                <option value="17">17</option>
                                                                <option value="18">18</option>
                                                                <option value="19">19</option>
                                                                <option value="20">20</option>
                                                                <option value="21">21</option>
                                                                <option value="22">22</option>
                                                                <option value="23">23</option>
                                                                <option value="24">24</option>
                                                                <option value="25">25</option>
                                                                <option value="26">26</option>
                                                                <option value="27">27</option>
                                                                <option value="28">28</option>
                                                                <option value="29">29</option>
                                                                <option value="30">30</option>
                                                                <option value="31">31</option>
                                                            </select>

                                                            <select id="" name="">
                                                                <option value="">Month</option>
                                                                <option value="01">January</option>
                                                                <option value="02">February</option>
                                                                <option value="03">March</option>
                                                                <option value="04">April</option>
                                                                <option value="05">May</option>
                                                                <option value="06">June</option>
                                                                <option value="07">July</option>
                                                                <option value="08">August</option>
                                                                <option value="09">September</option>
                                                                <option value="10">October</option>
                                                                <option value="11">November</option>
                                                                <option value="12">December</option>
                                                            </select>

                                                            <select id="" name="">
                                                                <option value="">Year</option>
                                                                <option value="2053">2053</option>
                                                                <option value="2052">2052</option>
                                                                <option value="2051">2051</option>
                                                                <option value="2050">2050</option>
                                                                <option value="2049">2049</option>
                                                                <option value="2048">2048</option>
                                                                <option value="2047">2047</option>
                                                                <option value="2046">2046</option>
                                                                <option value="2045">2045</option>
                                                                <option value="2044">2044</option>
                                                                <option value="2043">2043</option>
                                                                <option value="2042">2042</option>
                                                                <option value="2041">2041</option>
                                                                <option value="2040">2040</option>
                                                                <option value="2039">2039</option>
                                                                <option value="2038">2038</option>
                                                                <option value="2037">2037</option>
                                                                <option value="2036">2036</option>
                                                                <option value="2035">2035</option>
                                                                <option value="2034">2034</option>
                                                                <option value="2033">2033</option>
                                                                <option value="2032">2032</option>
                                                                <option value="2031">2031</option>
                                                                <option value="2030">2030</option>
                                                                <option value="2029">2029</option>
                                                                <option value="2028">2028</option>
                                                                <option value="2027">2027</option>
                                                                <option value="2026">2026</option>
                                                                <option value="2025">2025</option>
                                                                <option value="2024">2024</option>
                                                                <option value="2023">2023</option>
                                                            </select>

                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="btn_d_flex">

                                                        <button type="submit" className="green"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" /></svg> Add More Applications </button>
                                                        <button type="submit" className="red">Submit Application </button>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>

                                </form>
                            </div>
                        </div>


                    </div>

                </div>


            </section>


        </>
    )
};

export default ApplyNow;