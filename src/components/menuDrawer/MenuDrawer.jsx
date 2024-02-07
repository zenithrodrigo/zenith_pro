import React, { useState } from "react";
import "./menu-drawer.css";
import { Link } from "react-router-dom";

const MenuDrawer = ({ isOpen, onClose }) => {
  return (
    <div className={`menu-drawer ${isOpen ? "open" : ""}`}>
      <div className="overlay" onClick={onClose}></div>
      <div className="drawer-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={onClose}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" onClick={onClose}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/shop" onClick={onClose}>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/contact-us" onClick={onClose}>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MenuDrawer;
