import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const PaymentFailure = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { search } = useLocation(); 
    const orderId = search?.replace("?","")?.split("=")[1];

    console.log(orderId);

    const updatePaymentDetails = async() => {
        const data = {
            applicationDisplayId: id,
            orderId,
         }
         console.log(data);
         try {
            const res = await axios.post(`https://ymfzdgfyzhm.emiratesevisaonline.com/payment/payment-info`, data)
            console.log(res);
         } catch (error) {
            console.log(error);
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
                    The payment for your Visa application {id} has failed.
                    </h5>
                    <div className="col-md-12 d-flex justify-content-center">
                    <button  className="payment-redirect-btn" id="checkout-button" name="proceedFinal" onClick={() => navigate(`/checkout/${id}`)}>Retry Payment</button>
                    </div>
                  
                    
                </div>
            </div>
        </section>
    )
}

export default PaymentFailure