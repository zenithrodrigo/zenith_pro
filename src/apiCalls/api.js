import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const { NODE_ENV, REACT_APP_API_URL, REACT_APP_BUSINESS_API_KEY } = process.env;

const BUSINESS_API_KEY =
  NODE_ENV === "production"
    ? REACT_APP_BUSINESS_API_KEY
    : "HIDp6O7SMeeeIVIDaRggcSBvKcgSbDxU";

const API_URL =
  NODE_ENV === "production"
    ? REACT_APP_API_URL
    : "http://localhost:5001/api/v1/";

export const api = {
  // configStripe: async () => {
  //   let res = axios.get(`${API_URL}plugin/stripe/config`);
  //   console.log(res);
  //   const { publishableKey } = await res.json();
  //   return loadStripe(publishableKey);
  // },
  signUp: async (email, password, password2) => {
    try {
      let res = await axios.post(`${API_URL}auth/sign-up`, {
        email,
        password,
        password2,
      });
      console.log(res);
      return res;
    } catch (error) {
      return error;
    }
  },

  signIn: async (email, password) => {
    try {
      let res = await axios.post(
        `${API_URL}auth/sign-in`,
        {
          email,
          password,
          expiresIn: 3.154e10,
        },
        { withCredentials: true, credentials: "include" }
      );
      console.log(res);
      return res;
    } catch (error) {
      return error;
    }
  },

  getUser: async () => {
    try {
      let res = await axios.get(`${API_URL}auth/session`, {
        withCredentials: true,
        credentials: "include",
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  signOut: async () => {
    try {
      let res = await axios.get(`${API_URL}auth/sign-out`, {
        withCredentials: true,
        credentials: "include",
      });
      console.log(res);
      return res;
      // getUserSession();
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  createGuestSession: async (email) => {
    try {
      let res = await axios.post(
        `${API_URL}auth/create-guest-session`,
        {
          email,
        },
        { withCredentials: true, credentials: "include" }
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  createPaymentMethod: async (type, card, billingDetails) => {
    try {
      let res = await axios.post(
        `${API_URL}plugin/stripe/create-payment-method`,
        {
          type,
          card,
          billingDetails,
        },
        { withCredentials: true, credentials: "include" }
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log(error.response.data.error);
      console.log(error.response.data.message);
      console.log("Response headers:", error.response.headers);
      return error;
    }
  },

  createPaymentIntent: async (cart, currency) => {
    try {
      const res = await axios.post(
        `${API_URL}plugin/stripe/create-payment-intent`,
        {
          items: cart,
          currency,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "business-api-key": BUSINESS_API_KEY,
          },
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(res);
      console.log("Api create payment intent");
      return res;
    } catch (error) {
      return error;
    }
  },

  confirmPaymentIntent: async (paymentIntent, sale) => {
    try {
      console.log(paymentIntent);
      let res = await axios.post(
        `${API_URL}plugin/stripe/confirm-payment-intent`,
        {
          paymentIntent: paymentIntent.id,
          saleId: sale._id,
        },
        { withCredentials: true, credentials: "include" }
      );
      console.log(res);
      return res;
    } catch (error) {
      return error;
    }
  },

  retrievePaymentIntent: async (paymentIntentId) => {
    try {
      const res = await axios.post(
        `${API_URL}plugin/stripe/confirm-payment-intent`,
        { paymentIntentId },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);

      const res = await axios.post(`${API_URL}upload-file`, formData, {
        withCredentials: true,
        credentials: "include",
      });
      console.log(res);
      return res;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  },

  getInventoryItems: async () => {
    try {
      console.log(BUSINESS_API_KEY);
      let res = await axios.get(`${API_URL}all-inventory`, {
        headers: {
          "Content-Type": "application/json",
          "business-api-key": BUSINESS_API_KEY,
        },
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchOrderDetails: async (orderId) => {
    try {
      const res = await axios.get(`${API_URL}orders/${orderId}`);
      console.log(res);
      return res;
    } catch (error) {
      // Handle error
      console.error("Error fetching order details:", error);
      return error;
    }
  },
};
