import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const  ReactPayPal = ({paymentMethod,applicationId,serviceType}) =>  {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const navigate = useNavigate();


  const createOrder = async() => {
      try {
        const orderData = {
         applicationId,
             serviceType,
     }
         // Order is created on the server and the order id is returned
         const {data} = await axios.post("https://y2hhbibraxroyw4.emiratesevisaonline.com/payment/PayPal/order",
             orderData
           ,{
            headers: {
             "Content-Type": "application/json",
           },
         })
         return data;
      } catch (error) {
        setError(error.message)
      }
      };

      const onApprove = async(order) => {
        navigate(`/payment-success/${applicationId}?session_id=${order.orderID}`)
          }
 
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: createOrder,
        onApprove: onApprove,
        onError: (err) => {
            setError(err)
            // console.error(err);
          },
      })
      .render(paypalRef.current);
  }, []);

  // if (paid) {
  //   return <div>Payment successful.!</div>;
  // }

  // If any error occurs
  if (error) {
    return <div className='text-red'>Error Occurred in processing payment.! Please try again.</div>;
  }

    return (
        <div ref={paypalRef}>
        
        </div>
    )
}

export default ReactPayPal








// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom"
// import axios from 'axios'

// function PayPalGateway({paymentMethod,applicationId,serviceType}) {
// //   const [paymentOption, setPaymentOption] = useState('paypal');

//   let PayPalButton;
//   useEffect(() => {
//      PayPalButton = window.paypal?.Buttons.driver("react", { React, ReactDOM });

//      window.paypal?.Marks().render('#paypal-marks-container');
//   // Render the PayPal buttons
//   window.paypal?.Buttons().render('#paypal-buttons-container');
  
//   // Hide non-PayPal button by default
//   if(document && document.body && document.body.querySelector('#alternate-button-container')){
//     document.body.querySelector('#alternate-button-container')
//     .style.display = 'none';
//   }
   
//   },[])
    


//     const createOrder = async() => {
//     // Order is created on the server and the order id is returned
//     const orderData = {
//         applicationId,
//             serviceType,
//     }
//     const {data} = await axios.post("https://y2hhbibraxroyw4.emiratesevisaonline.com/payment/PayPal/order",
//       orderData,{
//        headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     console.log(data,"Console.log");
//     return data.data;
//   };
//   const onApprove = async(order) => {
//      // Order is captured on the server and the response is returned to the browser
//      const {data} = await axios.post("https://y2hhbibraxroyw4.emiratesevisaonline.com/payment/payment-info",{orderId: order.orderID,applicationDisplayId:applicationId}, {
//        headers: {
//         "Content-Type": "application/json",
//       },
//     })
//    console.log(data,"djdjdj");
//     return data;
//   };
//   return (
//     <>
    
//     <div> 
//     <div style={{display:'none'}} id="paypal-marks-container"></div>
//       <div id="paypal-buttons-container" style={{display:paymentMethod === "PayPal" ?'block' : 'none'}}></div>
//     </div>







//   {PayPalButton && 
  
// <PayPalButton
//       createOrder={(data) => createOrder(data)}
//       onApprove={(data) => onApprove(data)}
//       />

//       }
//       </>
//   );
// }

// export default PayPalGateway;
