import { useState, useEffect } from "react";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import { useUser } from "../../contexts/UserContext";

const { NODE_ENV, REACT_APP_REACT_APP_PUBLIC_URL, REACT_APP_STRIPE_PK } =
  process.env;

const stripePromise = loadStripe(REACT_APP_STRIPE_PK);

const PaymentForm = ({ email }) => {
  const stripe = useStripe();
  const { clientSecret, paymentIntent } = useUser();
  const elements = useElements();
  const navigate = useNavigate();
  const [messages, setMessages] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages(`${messages} Submitting payment...`);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/5",
      },
    });

    if (error) {
      // handle error
      setMessages(`${messages} ${error.message}`);
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }
    console.log("1- Checkout form use effect");
    // retrievePaymentIntent();
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log(paymentIntent);
      console.log("3- Checkout form use effect");
      switch (paymentIntent.status) {
        case "succeeded":
          console.log("Payment succeeded");
          setMessages("Payment succeeded!");
          // deleteAllFromCart();
          // retrievePaymentIntent(paymentIntent.id);
          break;
        case "processing":
          setMessages("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessages("Your payment was not successful, please try again.");
          break;
        default:
          setMessages("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <div className="bg-gray-100">
      <div className="sr-root w-full max-w-md mx-auto p-8">
        <div className="sr-main bg-white p-8 rounded-lg shadow-md border">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Accept a payment</h1>
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl text-gray-800 mb-4">Contact info</h3>
            <LinkAuthenticationElement
              // Access the email value like so:
              // onChange={(event) => {
              //  setEmail(event.value.email);
              // }}
              //
              // Prefill the email field like so:
              options={{ defaultValues: { email: email } }}
            />

            <h3 className="text-xl text-gray-800 my-4">Shipping address</h3>
            <AddressElement
              options={{ mode: "shipping", allowedCountries: ["UK"] }}

              // Access the address like so:
              // onChange={(event) => {
              //   setAddressState(event.value);
              // }}
            />

            <h3 className="text-xl text-gray-800 my-4">Payment</h3>
            <PaymentElement />
            <hr className="m-2"></hr>
            <div className="flex justify-around items-center gap-4 my-4">
              <button 
                className="flex flex-start bg-green-500 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-green-400 z-0"
                type="submit">
                Pay
              </button>
              <button
                className="flex flex-start bg-blue-500 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-blue-400 z-0"
                onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </form>
          <hr></hr>
          <div id="messages">{messages}</div>
        </div>
      </div>
    </div>
  );
};

// Customize the appearance of Elements using the Appearance API.
const appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#ed5f74",
    borderRadius: "20px",
    fontFamily:
      "--body-font-family: -apple-system, BlinkMacSystemFont, sans-serif",
    colorBackground: "#fafafa",
  },
};

const Checkout = () => {
  const { step } = useParams();
  const {
    user,
    updateUser,
    signOut,
    createGuestSession,
    createPaymentMethod,
    createPaymentIntent,
    clientSecret,
    confirmPaymentIntent,
    handleUploadFile,
    deleteAllFromCart,
    deleteOneFromCart,
    cart,
    setUser,
    totalAmount,
    saleId,
    order,
    transactionId,
    paymentIntent,
  } = useUser();
  const navigate = useNavigate();
  const [state, setState] = useState({
    type: "card",
    email: "client@email.com",
    cardNumber: "4242424242424242",
    expMonth: 1,
    expYear: 2033,
    cvc: "314",
    line: "line",
    city: "city",
    country: "UK",
    postcode: "l123bw",
  });

  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
    setState({ ...state, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    console.log(`Use effect checkout step - ${step}`);
    console.log(paymentIntent);
    console.log(order);
  }, []);

  if (clientSecret && step == 3) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
        <PaymentForm email={state.email} />
      </Elements>
    );
  } else if (step == 2) {
    return (
      <div className="bg-gray-100">
        <div className="w-full max-w-3xl mx-auto p-8">
          <div className="bg-white p-8 rounded-lg shadow-md border">
            <div className="space-y-2">
              <p>Email: <span className="text-sky-500">{user.email}</span></p>
              <p className="mb-4">Total Cart: <span className="text-sky-500">£ {totalAmount.toFixed(2)}</span></p>
              <Link to={"/cart"} className="bg-white-500 border border-green-500 rounded-lg text-green-500 px-3 hover:text-blue-400 hover:border-blue-400 z-0">
                Edit cart
              </Link>
            </div>
            <form
              className="form space-y-4 m-4"
              onSubmit={async (e) => {
                e.preventDefault();                
                navigate("/checkout/3");
                deleteAllFromCart();
              }}
            >
              {cart &&
                cart.map((item,index) => (
                  <div key={index}>
                    <div>
                      <p>
                        {item.name} - <span className="text-sky-500">£{(Number(item.price) / 100).toFixed(2)}</span>
                      </p>
                      <p>Quantity: <span className="text-sky-500">{item.quantity}</span></p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center flex-row space-x-8 m-4 p-2 border border-zinc-400 rounded-md">
                      {/* <img
                        src={PUBLIC_URL + item.img}
                        className="item-img"
                        alt=""
                      ></img> */}
                      <div className="flex flex-col justify-center items-center w-28">
                        <img src={item.images.front} alt=""></img>
                        <p>Front</p>
                      </div>
                      <div className="flex flex-col justify-center items-center w-28">
                        <img src={item.images.back} alt=""></img>
                        <p>Back</p>
                      </div>  
                      <div className="flex flex-col justify-center items-center w-28">
                        <img src={item.images.left} alt=""></img>
                        <p>Left</p>
                      </div>  
                      <div className="flex flex-col justify-center items-center w-28">
                        <img src={item.images.right} alt=""></img>
                        <p>Right</p>
                      </div> 
                    </div>
                  </div>
                ))}
              <button
                type="submit"
                className="bg-green-500 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-green-400 z-0"
              >
                Confirm Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    );
    } else if (!clientSecret && step == 1) {
    return (
      <>
        {!user && (
        <div className="bg-gray-100">
          <div className="w-full max-w-md mx-auto p-8">
            <div className="bg-white p-8 rounded-lg shadow-md border">
            {/* <div className="flex justify-around flex-col bg-white p-8 rounded-lg shadow-md border"> */}
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h1>
              <div className="flex flex-col justify-center items-center p-6 bg-slate-50/40 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700">Please enter your Email</h2>
                <form
                  className="flex flex-col justify-center items-center"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    createGuestSession(state.email);
                  }}
                >
                  <input
                    className="w-48 sm:w-72"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                    type="email"
                    value={state.email}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-green-400 z-0"
                  >
                    Next
                  </button>
                </form>
              </div>
              <h2 className="text-sm font-semibold text-gray-700 m-4">- OR -</h2>
              <div className="flex justify-center items-center mx-8 bg-slate-50/40 rounded-xl">
                <Link
                  to={"/sign-in"}
                  className="text-md p-4 text-blue-500 hover:text-green-500"
                >
                  sign in / up
                </Link>
              </div>
            </div>
          </div>
        </div>
        )}
        {user && (
        <div className="bg-gray-100">
          <div className="w-full max-w-md mx-auto p-8">
            <div className="bg-white p-8 rounded-lg shadow-md border">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h1>
              <p className="m-8">
                Please make sure this is the right email:{" "}
                <span className="text-focus text-sky-500">{user.email}</span>
              </p>
              <div className="flex flex-col justify-center items-center m-8 sm:flex-row sm:gap-4">
                <button
                  className="bg-green-500 text-white text-sm leading-6 font-medium py-1 px-4 mt-4 rounded-md hover:bg-green-400 z-0"
                  onClick={async () => {
                    let currency = "gbp";
                    createPaymentIntent(cart, currency);
                    navigate("/checkout/2");
                  }}
                >
                  Yes, next
                </button>
                <button className="bg-blue-500 text-white text-sm leading-6 font-medium py-1 px-4 mt-4 rounded-md hover:bg-blue-400 z-0" onClick={signOut}>
                  Change email
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
      </>
    );
  } else if (step == 5) {
    return (
      <div className="bg-gray-100 h-96 flex justify-center items-center">
        <div className="w-full max-w-md mx-auto p-8">
          <div className="bg-white p-8 rounded-lg shadow-md border">
            <p className="text-xl font-bold text-gray-800 mb-4">Thank you for your purchase.</p>
            <p>
              Keep an eye on the order {" =>"}
              {/* <Link to={`/order/${user.order._id}`}>here</Link> */}
              <Link
                className="bg-white-500 border-2 border-blue-500 rounded-lg text-blue-500 px-3 ml-4 hover:text-green-400 hover:border-green-400"
                to={`/order/0001`}
              >
                here
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
      </div>
    );
  }
};

export default Checkout;

// import React, { useEffect, useState } from "react";
// import { useUser } from "../../contexts/UserContext";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";

// import CheckoutForm from "./CheckoutForm";
// import { loadStripe } from "@stripe/stripe-js";

// const { NODE_ENV, REACT_APP_REACT_APP_PUBLIC_URL, REACT_APP_STRIPE_PK } =
//   process.env;

// const stripePromise = loadStripe(REACT_APP_STRIPE_PK);

// const PUBLIC_URL =
//   NODE_ENV === "production"
//     ? REACT_APP_REACT_APP_PUBLIC_URL
//     : "http://localhost:5000/";

// export default function Checkout() {
//   const {
//     user,
//     updateUser,
//     signOut,
//     createGuestSession,
//     createPaymentMethod,
//     createPaymentIntent,
//     confirmPaymentIntent,
//     handleUploadFile,
//     deleteAllFromCart,
//     deleteOneFromCart,
//     cart,
//     setUser,
//     totalAmount,
//     clientSecret,
//     saleId,
//     order,
//     transactionId,
//   } = useUser();
//   const { step } = useParams();
//   const navigate = useNavigate();

//   const [state, setState] = useState({
//     type: "card",
//     email: "client@email.com",
//     cardNumber: "4242424242424242",
//     expMonth: 1,
//     expYear: 2033,
//     cvc: "314",
//     line: "line",
//     city: "city",
//     country: "UK",
//     postcode: "l123bw",
//   });
//   const [sale, setSale] = useState();
//   const [file, setFile] = useState();
//   const [img, setImg] = useState();

//   const handleChange = (e) => {
//     console.log(e.target.id, e.target.value);
//     setState({ ...state, [e.target.id]: e.target.value });
//   };

//   const appearance = {
//     theme: "stripe",
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <div className="wrap-card">
//       <h1 className="text-3xl font-bold m-8">Checkout</h1>
//       <button
//         className="flex flex-start bg-blue-500 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-blue-400 z-0"
//         onClick={() => navigate(-1)}
//       >
//         Back
//       </button>
//       {(step == 1 || !user) && step != 5 && (
//         <>
//           {!user && (
//             <div>
//               <div className="flex justify-around flex-col md:flex-row">
//                 <div className="flex flex-col justify-center items-center p-6 bg-slate-50/40 rounded-lg">
//                   <p className="flex justify-start text-xl font-bold m-4">
//                     Please enter your Email
//                   </p>
//                   <form
//                     className="flex flex-col justify-center items-center space-y-6"
//                     onSubmit={async (e) => {
//                       e.preventDefault();
//                       createGuestSession(state.email);
//                     }}
//                   >
//                     <input
//                       className="w-72"
//                       id="email"
//                       placeholder="Email"
//                       onChange={handleChange}
//                       type="email"
//                       value={state.email}
//                       required
//                     />
//                     <button
//                       type="submit"
//                       className="bg-green-500 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-green-400 z-0"
//                     >
//                       Next
//                     </button>
//                   </form>
//                 </div>
//                 <p className="flex justify-center items-center m-8 text-xl font-bold">
//                   OR
//                 </p>
//                 <div className="flex justify-center items-center mx-8 p-16 bg-slate-50/40 rounded-xl">
//                   <Link
//                     to={"/sign-in"}
//                     className="text-xl text-blue-500 hover:text-green-500"
//                   >
//                     sign in / up
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           )}
//           {user && (
//             <div>
//               <p>
//                 Please make sure this is the right email:{" "}
//                 <span className="text-focus">{user.email}</span>
//               </p>
//               <button
//                 className="bg-green-500 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-green-400 z-0"
//                 onClick={async () => {
//                   let currency = "gbp";
//                   createPaymentIntent(cart, currency);
//                   navigate("/checkout/2");
//                 }}
//               >
//                 Yes, next
//               </button>
//               <button className="" onClick={signOut}>
//                 Change email
//               </button>
//             </div>
//           )}
//         </>
//       )}
//       {step == 2 && user && cart && (
//         <div>
//           <div>
//             <p>Email: {user.email}</p>
//             <p>Total Cart: £ {totalAmount.toFixed(2)}</p>
//             <Link to={"/cart"} className="button">
//               Edit cart
//             </Link>
//           </div>
//           <form
//             className="form"
//             onSubmit={async (e) => {
//               e.preventDefault();
//               navigate("/checkout/3");
//             }}
//           >
//             {cart &&
//               cart.map((item) => (
//                 <div>
//                   <div>
//                     <p>
//                       {item.name} - £{(Number(item.price) / 100).toFixed(2)}
//                     </p>
//                     <p>Quantity: {item.quantity}</p>
//                   </div>
//                   <div>
//                     <img src={PUBLIC_URL + item.img} className="item-img"></img>
//                   </div>
//                 </div>
//               ))}
//             <button
//               type="submit"
//               className="bg-green-500 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-green-400 z-0"
//             >
//               Confirm Cart
//             </button>
//           </form>
//         </div>
//       )}
//       {clientSecret && step != 1 && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm clientSecret={clientSecret} />
//         </Elements>
//       )}
//       {step == 5 && (
//         <div className="space-y-4 m-14">
//           <p className="font-bold">Thank you for your purchase.</p>
//           <p>
//             Keep an eye on the order {" = >"}
//             {/* <Link to={`/order/${user.order._id}`}>here</Link> */}
//             <Link
//               className="bg-white-500 border-2 border-blue-500 rounded-lg text-blue-500 px-3 ml-4 hover:text-green-400 hover:border-green-400"
//               to={`/order/0001`}
//             >
//               here
//             </Link>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
