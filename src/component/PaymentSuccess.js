import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    const orderId = searchParams.get("session_id");
    const paymentId = searchParams.get("payment_id");
    const signature = searchParams.get("signature");


    const updatePaymentDetails = async() => {
        const data = {
            applicationDisplayId: id,
            orderId,
         }
         if(paymentId && signature){
            data.gatewayTransactionId =  paymentId + ':' + signature;
         }
         try {
            const res = await axios.post(`https://ymfzdgfyzhm.emiratesevisaonline.com/payment/payment-info`, data)

        } catch (error) {
           
         }
    }

    useEffect(() => {
        updatePaymentDetails();
    },[])

    return (
        <section className="apply_now_form">
            <div className="container">
                <div className="row">
                    <h5 className="col-md-12 text-center">
                    The payment for your Visa application {id} is successful.
                    </h5>
                    <div className="col-md-12 d-flex justify-content-center">
                    <button  className="payment-redirect-btn" id="checkout-button" name="proceedFinal" onClick={() => navigate(`/track-visa-application/${id}`)}>Track Visa Status</button>
                    </div>
                  
                    
                </div>
            </div>
        </section>
    )
}

export default PaymentSuccess