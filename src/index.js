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
import EditApplicantMain from './component/EditApplicantMain';
import EditApplicant from './component/EditApplicant';
import EmiratesVisa from './component/EmiratesVisa';
import ApplyVisa from './component/ApplyVisa';
import ApplyNowVisa from './component/ApplyNowVisa';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';



import Contact from "./component/Contact";
import NoPage from "./component/NoPage";
import PaymentSuccess from "./component/PaymentSuccess";
import PaymentFailure from "./component/PaymentFailure";

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="steps-to-apply-emirates-visa" element={<StepsToApplyEmiratesVisa />} />
          <Route path="emirates-visa-types" element={<EmiratesVisaTypes />} />
          <Route path="track-visa-application" element={<TrackVisaApplication />} />
          {/* <Route path="apply-now" element={<ApplyNow />} /> */}
          <Route path="apply-now" element={<ApplyVisa />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="emirates-visa-faqs" element={<EmiratesVisaFaqs />} />
          <Route path="emirates-visa-blog" element={<EmiratesVisaBlog />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="apply/:id" element={<Apply />} />
          <Route path="checkout/:id" element={<Checkout />} />
          <Route path="customer-review" element={<CustomerReview />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="applicant-main/:id" element={<EditApplicantMain />} />
          <Route path="applicant/:id" element={<EditApplicant />} />
          <Route path="apply-now-visa/:visa" element={<ApplyNowVisa />} />
          <Route path="emirates-visa/:citizen/:travelling" element={<EmiratesVisa />} />
          <Route path="apply-visa/:visa/:citizen/:travelling" element={<ApplyVisa />} />
          <Route path="payment-success/:id" element={<PaymentSuccess />} />
          <Route path="payment-failure/:id" element={<PaymentFailure />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
      <TawkMessengerReact
          propertyId="6537513bf2439e1631e7c188"
          widgetId="1hdg1al57" />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);