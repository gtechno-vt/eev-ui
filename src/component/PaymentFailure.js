import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PaymentFailure = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <section className="apply_now_form">
            <div className="container">
                <div className="row">
                    <h5 className="col-md-12 text-center">
                        Your Payment Failed.
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