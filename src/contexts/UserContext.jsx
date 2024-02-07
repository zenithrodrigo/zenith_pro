import React, { createContext, useContext, useState } from "react";
import { api } from "../apiCalls/api";
/**ONLY in DEV */
import tShirtImage from "../assets/t-shirts.jpeg";
import hoodieImage from "../assets/white-hoodie.png";

const UserContext = createContext();

/**ONLY in DEV */
const items = [
  {
    approvedForMarketplace: false,
    business: "655dc6a4899de08a03c26035",
    category: "t-shirts",
    description: "T-shirt",
    img: tShirtImage,
    name: "T-shirt1",
    price: 500,
    quantity: 100,
    _id: "0001",
  },
  {
    approvedForMarketplace: false,
    business: "655dc6a4899de08a03c26035",
    category: "t-shirts",
    description: "T-shirt",
    img: tShirtImage,
    name: "T-shirt2",
    price: 500,
    quantity: 100,
    _id: "0002",
  },
  {
    approvedForMarketplace: false,
    business: "655dc6a4899de08a03c26035",
    category: "hoodies",
    description: "Hoodie",
    img: hoodieImage,
    name: "Hoodie1",
    price: 500,
    quantity: 100,
    _id: "0003",
  },
  {
    approvedForMarketplace: false,
    business: "655dc6a4899de08a03c26035",
    category: "hoodies",
    description: "Hoodie",
    img: hoodieImage,
    name: "Hoodie2",
    price: 500,
    quantity: 100,
    _id: "0004",
  },
];

export const UserProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("cartdata")) || [];
  const [user, setUser] = useState();
  const [order, setOrder] = useState();
  const [inventoryItems, setInventoryItems] = useState(items);
  const [designs, setDesigns] = useState();
  const [cart, setCart] = useState(initialCart);
  const [totalAmount, setTotalAmount] = useState(0);
  const [saleId, setSaleId] = useState();
  const [transactionId, setTransactionId] = useState();
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState(null);

  const updateUser = async () => {
    try {
      const res = await api.getUser();
      console.log(res);

      // check if there's an user that tried to create a session already
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
      if (accessToken || refreshToken) {
      }
      if (res.data && res.data.user) {
        const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));
        const paymentIntent = JSON.parse(localStorage.getItem("paymentIntent"));
        if (paymentMethod) {
          res.data.user.paymentMethod = paymentMethod;
        }
        if (paymentIntent) {
          res.data.user.paymentIntent = paymentIntent;
        }
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    const res = await api.signOut();
    console.log(res);
    if (res.status === 200) {
      setUser(null);
    }
  };

  const signIn = async (email, password) => {
    const res = await api.signIn(email, password);
    console.log(res);
    if (res.data.user) {
      setUser(res.data.user);
    }
  };

  const signUp = async (email, password, password2) => {
    const res = await api.signUp(email, password, password2);
    console.log(res);
    if (res.data.user) {
      setUser(res.data.user);
    }
  };

  const createGuestSession = async (email) => {
    const res = await api.createGuestSession(email);
    console.log(res);
    if (res.data.user) {
      // localStorage.setItem(
      //   "userId",
      //   JSON.stringify(res.data.user._id)
      // );
      setUser(res.data.user);
    }
  };

  const createPaymentMethod = async (type, card, billingDetails) => {
    const res = await api.createPaymentMethod(type, card, billingDetails);
    console.log(res);
    if (res.data.payment_method) {
      user.paymentMethod = res.data.payment_method;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(res.data.payment_method)
      );
      setUser(user);
      updateUser();
    }
  };

  const createPaymentIntent = async (cart, currency) => {
    const res = await api.createPaymentIntent(cart, currency);
    console.log(res);
    const { data } = res;
    console.log("User context create payment intent");
    console.log(data);

    if (
      data &&
      data.clientSecret &&
      data.saleId &&
      data.transactionId &&
      data.order &&
      data.paymentIntent
    ) {
      console.log(data);
      setClientSecret(data.clientSecret);
      setSaleId(data.saleId);
      setTransactionId(data.transactionId);
      setOrder(data.order);
      setPaymentIntent(data.paymentIntent);
      // user.sale = res.data.sale;
      // user.paymentIntent = res.data.payment_intent;
      // setUser(user);
      // localStorage.setItem(
      //   "paymentIntent",
      //   JSON.stringify(res.data.payment_intent)
      // );
    }
  };

  const confirmPaymentIntent = async (paymentIntent, sale) => {
    const res = await api.confirmPaymentIntent(paymentIntent, sale);
    console.log(res);
    if (res.data.payment_intent && res.data.order) {
      user.paymentIntent = res.data.payment_intent;
      user.order = res.data.order;
      setUser(user);
    }
  };

  const retrievePaymentIntent = async (paymentIntentId) => {
    const res = await api.retrievePaymentIntent(paymentIntentId);
    console.log(res);
  };

  const handleUploadFile = async (file) => {
    const res = await api.uploadFile(file);
    console.log(res);
    if (res.data.file) {
      user.file = res.data.file;
      setUser(user);
    }
  };

  const getInventoryItems = async () => {
    let res = await api.getInventoryItems();
    console.log(res.data);
    if (res.data.inventoryItems) {
      setInventoryItems(res.data.inventoryItems);
    }
  };

  const addToCart = (item) => {
    console.log('new:', item);
    const existingProduct = cart.find(
      (prod) => prod._id.toString() === item._id.toString()
    );
    console.log('existing:', existingProduct);
    if (existingProduct) {
      const updatedCart = cart.map((product) => {
        if (product._id.toString() === item._id.toString()) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        } else {
          return {
            ...product,
            name: item.name,
          };
        }
        // return product;
      });
      localStorage.setItem("cartdata", JSON.stringify(updatedCart));
      setCart(updatedCart);
    } else {
      // const product = inventoryItems.find(
      //   (prod) => prod._id.toString() === item._id.toString()
      // );
      const product = item;
      console.log('updated:', product);
      if (product) {
        let updatedCart = [...cart, { ...product, quantity: 1 }];
        console.log('updated:', updatedCart);
        localStorage.setItem("cartdata", JSON.stringify(updatedCart));
        setCart(updatedCart);
      }
    }
    calculateTotalAmount();
  };

  const deleteAllFromCart = () => {
    setCart([]);
    localStorage.removeItem("cartdata");
    calculateTotalAmount();
  };

  const deleteOneFromCart = (deletedItem) => {
    const cart = JSON.parse(localStorage.getItem("cartdata"));
    const filteredCart = cart.filter((item) => item._id !== deletedItem._id);
    localStorage.setItem("cartdata", JSON.stringify(filteredCart));
    setCart(filteredCart);
    calculateTotalAmount();
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;

    for (const item of cart) {
      if (item.price !== undefined && item.quantity !== undefined) {
        totalAmount += item.price * item.quantity;
      }
    }
    totalAmount = totalAmount / 100;
    setTotalAmount(totalAmount);
  };

  const fetchOrderDetails = async (orderId) => {
    const res = await api.fetchOrderDetails(orderId);
    console.log(res);
    if (res.data.order) {
      localStorage.setItem("order", JSON.stringify(res.data.order));
      setOrder(res.data.order);
    }
  };

  return (
    <UserContext.Provider
      value={{
        updateUser,
        user,
        signOut,
        signIn,
        signUp,
        createGuestSession,
        createPaymentMethod,
        createPaymentIntent,
        confirmPaymentIntent,
        handleUploadFile,
        getInventoryItems,
        inventoryItems,
        addToCart,
        cart,
        deleteAllFromCart,
        deleteOneFromCart,
        setUser,
        calculateTotalAmount,
        totalAmount,
        fetchOrderDetails,
        order,
        designs,
        saleId,
        transactionId,
        clientSecret,
        retrievePaymentIntent,
        paymentIntent,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
