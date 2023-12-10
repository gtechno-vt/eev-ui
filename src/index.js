import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/Home";
import StepsToApplyEmiratesVisa from "./component/StepsToApplyEmiratesVisa";
import EmiratesVisaTypes from "./component/EmiratesVisaTypes";
import TrackVisaApplication from "./component/TrackVisaApplication";
import ApplyNow from "./component/ApplyNow";
import Apply from "./component/Apply";
import TermsAndConditions from "./component/TermsAndConditions";
import PrivacyPolicy from "./component/PrivacyPolicy";
import EmiratesVisaFaqs from "./component/EmiratesVisaFaqs";
import EmiratesVisaBlog from "./component/EmiratesVisaBlog";
import AboutUs from "./component/AboutUs";
import Checkout from "./component/Checkout";
import CustomerReview from "./component/CustomerReview";
import BlogDetail from "./component/BlogDetail";


import Contact from "./component/Contact";
import NoPage from "./component/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="steps-to-apply-emirates-visa" element={<StepsToApplyEmiratesVisa />} />
          <Route path="emirates-visa-types" element={<EmiratesVisaTypes />} />
          <Route path="track-visa-application" element={<TrackVisaApplication />} />
          <Route path="apply-now" element={<ApplyNow />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="emirates-visa-faqs" element={<EmiratesVisaFaqs />} />
          <Route path="emirates-visa-blog" element={<EmiratesVisaBlog />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="apply/:id" element={<Apply />} />
          <Route path="checkout/:id" element={<Checkout />} />
          <Route path="customer-review" element={<CustomerReview />} />
          <Route path="blog" element={<BlogDetail />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);