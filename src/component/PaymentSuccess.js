import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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