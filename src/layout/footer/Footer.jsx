import React from "react";
/**
 * Import icons from
 * https://react-icons.github.io/react-icons/
 */
import "./footer.css";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-300 py-8 w-full text-center bottom-0 inset-x-0">
      <div className="flex justify-around justify-center items-center flex-col md:flex-row space-y-4">
        <div className="flex flex-col space-y-4">
          <p className="text-xl font-bold">Social Links</p>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <img src="/path/to/facebook-icon.png" alt="Facebook" /> */}
            Facebook
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <img src="/path/to/twitter-icon.png" alt="Twitter" /> */}
            Twitter
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <img src="/path/to/instagram-icon.png" alt="Instagram" /> */}
            Instagram
          </a>
        </div>
        <a href="https://werewolf.solutions" className="flex flex-row space-x-4">
          <h2 className="text-xl font-bold">Powered By</h2> 
          <img className="ws-icon mt-1" src={logo} alt=""/>
        </a>
        <div className="contact-info">
          <p className="text-xl font-bold">Contact Info</p>
          <div className="contact-item">
            <span>Email:</span>
            <a href="mailto:info@example.com">info@example.com</a>
          </div>
          <div className="contact-item">
            <span>Phone:</span>
            <a href="tel:+1234567890">+1 (234) 567-890</a>
          </div>
          <div className="contact-item">
            <span>Address:</span>
            <p>
              123 Street Name, City,
              <br />
              Country, Zip Code
            </p>
            <a
              href="https://www.google.com/maps?q=123+Street+Name,+City"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Map
            </a>
          </div>
          <Link to="/credits">Credits</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
