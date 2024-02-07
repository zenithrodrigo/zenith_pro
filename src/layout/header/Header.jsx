import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaShoppingCart } from "react-icons/fa"; // Assuming you have icons for the menu and cart

import logo from "../../assets/we-print-badge-140w.png";
import { useUser } from "../../contexts/UserContext";
import MenuDrawer from "../../components/menuDrawer/MenuDrawer";

const Header = () => {
  const { user, signOut, cart, totalAmount, calculateTotalAmount } = useUser();
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function calculateTotalQuantity(cart) {
    let totalQuantity = 0;

    // Iterate through each item in the cart
    for (let i = 0; i < cart.length; i++) {
      // Add the quantity of each item to the total
      totalQuantity += cart[i].quantity;
    }

    setTotalQuantity(totalQuantity);
  }

  useEffect(() => {
    calculateTotalQuantity(cart);
    calculateTotalAmount();
  }, [cart]);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="left">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="logo"
            onDragStart={(e) => e.preventDefault()}
          />
        </Link>
        <button className="profile-button" onClick={openMenu}>
          <FaBars />
        </button>
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
      <div className="right">
        <Link to="/" className="home-button focus:bg-zinc-300">
          Home
        </Link>
        <Link to="/about-us" className="aboutus-button focus:bg-zinc-300">
          About us
        </Link>
        <Link to="/shop" className="shop-button focus:bg-zinc-300">
          Shop
        </Link>
        <Link to="/contact-us" className="contactus-button focus:bg-zinc-300">
          Contact us
        </Link>
        {/* <Link to="/sign-in" className="signin-button">
          Sign in
        </Link>
        <Link to="/sign-up" className="signup-button">
          Sign up
        </Link> */}
        
        <Link to="/cart" className="cart-button focus:text-green-400">
          <CartIcon totalQuantity={totalQuantity} />
          {/* <span className="bg-indigo-300 rounded-full text-sm">{totalAmount !== 0 && "£ " + totalAmount.toFixed(2)}</span> */}
        </Link>
      </div>     
    </header>
  );
};

export default Header;

const CartIcon = ({ totalQuantity }) => {
  return (
    <div className="flex">
      <FaShoppingCart className="info-icon" />
      {totalQuantity > 0 && <div className="px-1 bg-teal-500 rounded-full text-center text-white text-sm absolute top-5 end-4">
      {totalQuantity}
        <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full" ></div>
    </div>}
    </div>
  );
};
