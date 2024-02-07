import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/error/Error";
import App from "./App";
import Home from "./pages/home/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Shop from "./pages/shop/Shop";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Order from "./pages/order/Order";
import { UserProvider } from "./contexts/UserContext";
import { PopUpProvider } from "./contexts/PopUpContext";

import "./index.css";
import "./output.css";
import Category from "./pages/category/Category";
import Item from "./pages/item/Item";
import CreateYourOwn from "./pages/createYourOwn/CreateYourOwn";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs/ContactUs";
import Credits from "./pages/credits/Credits";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout/:step",
        element: <Checkout />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
      },
      {
        path: "/shop/:category",
        element: <Category />,
      },
      {
        path: "/shop/:category/:itemId",
        element: <Item />,
      },
      {
        path: "/shop/:category/:itemId/create-your-own",
        element: <CreateYourOwn />,
      },
      {
        path: "/credits/",
        element: <Credits />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <PopUpProvider>
        <RouterProvider router={router} />
      </PopUpProvider>
    </UserProvider>
  </React.StrictMode>
);
