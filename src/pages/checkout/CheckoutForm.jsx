import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function CheckoutForm({ email, paymentIntentId, clientSecret }) {
  const { retrievePaymentIntent } = useUser();
  const { step } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { deleteAllFromCart } = useUser();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState();
  const [state, setState] = useState();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    console.log("1- Checkout form use effect");

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "payment_intent_client_secret"
    // );

    if (!clientSecret) {
      console.log("There's no clientSecret");
      return;
    }
    console.log("2- Checkout form use effect");
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log(paymentIntent);
      console.log("3- Checkout form use effect");
      switch (paymentIntent.status) {
        case "succeeded":
          console.log("Payment succeeded");
          setMessage("Payment succeeded!");
          deleteAllFromCart();
          retrievePaymentIntent(paymentIntent.id);
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/checkout/5",
        receipt_email: email,
      },
    });

    console.log("After confirm payment intent");

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const handleNextStep = async () => {
    navigate("/checkout/4");
  };

  const handleAddress = (addr) => {
    console.log(addr);
    setAddress(addr);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
      {step == 3 && (
        <>
          <AddressElement
            options={{ mode: "shipping" }}
            onChange={(event) => {
              if (event.complete) {
                // Extract potentially complete address
                const address = event.value.address;
                handleAddress(address);
                setCompleted(true);
              }
            }}
          />
          {completed && (
            <button onClick={handleNextStep} type="button">
              Next
            </button>
          )}
        </>
      )}
      {step == 4 && (
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
              {isLoading ? (
                <div id="loading-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">

                  <svg className="animate-spin h-8 w-8 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                  </svg>
              
                  <span className="text-white text-3xl font-bold">Loading...</span>
              
              </div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
        </form>
      )}
    </>
  );
}
