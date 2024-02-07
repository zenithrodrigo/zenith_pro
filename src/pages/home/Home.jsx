import React from "react";
import { Link, useNavigate } from "react-router-dom";

import heroImage from "../../assets/hero-image.png";
import tShirtImage from "../../assets/t-shirts.jpeg";
import hoodieImage from "../../assets/hoodies.jpeg";
import mugImage from "../../assets/design-mugs.jpg";
import ideasImage from "../../assets/design-shirt.jpeg";
import designSign from "../../assets/design-sign.jpg";
import aboutUsImage from "../../assets/we-print-front-1920w.jpg";
import stickers from "../../assets/stickers.jpg";
import logo from "../../assets/we-print-logo-1440w.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      {/* Hero/Intro Section */}
      <section className="bg-blue-400 py-24">
          <div className="mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                      <h1 className="text-white font-bold text-5xl leading-tight mb-6"><img src={logo} alt=""
                          /></h1>
                      <p className="text-white text-xl mb-8">Our mission is to provide you with the{" "}
                        <span className="highlight">finest</span> quality products and{" "}
                        <span className="highlight">exceptional</span> services in a timely
                        fashion and at a <span className="highlight">competitive</span>{" "}
                        price.
                      </p>
                      <div className="animate-bounce ">
                        <a href="/shop"
                            className="bg-blue-400 border-2 text-white rounded-full px-7 py-1 mt-5 hover:bg-white hover:text-blue-500">Shop now
                        </a>
                      </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                      <img src={heroImage} alt=""
                          className="w-10/12 rounded-lg shadow-lg"/>
                  </div>
              </div>
          </div>
      </section>

      <section className="description-section my-8">
        <div>
          <p>
            Your <span className="highlight">Ultimate Destination</span> for all
            Printing Needs
          </p>
          <p>
            We highly value and actively seek{" "}
            <span className="highlight">your feedback</span>, as it is crucial
            to our commitment to consistently develop and enhance the{" "}
            <span className="highlight">diverse range</span> of products and
            services we offer, always striving to better accommodate the unique
            needs of our <span className="highlight">esteemed customers</span>.
          </p>
          <p className="animate-pulse font-bold p-5">Since 2010</p>
        </div>
      </section>

      {/* List of Items Section */}
      <section className="items-section bg-zinc-100">
        <p className="text-3xl font-bold text-gray-800 mb-8">Featured Items</p>
        <div className="item-list p-4">          
          <div className="category-item space-y-4">
            <Link to="/shop/t-shirts">T-Shirts</Link>
            <div className="item bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <button
                className="item-button"
                onClick={() => navigate("/shop/tshirts/1")}
              >
                <img src={tShirtImage} alt="Tshirt" className="hover:opacity-75 h-48"/>
                <div className="px-4 py-3">
                    <p className="text-lg font-bold text-black truncate block capitalize">T-Shirt - 1</p>
                    <div className="flex items-center">
                        <div className="ml-auto">
                          <p className="text-lg font-semibold text-black cursor-auto">$500</p>
                        </div>
                    </div>
                </div>
              </button>
            </div>
            <div className="item bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <button
                className="item-button"
                onClick={() => navigate("/shop/tshirts/2")}
              >
                <img src={tShirtImage} alt="Tshirt" className="hover:opacity-75 h-48"/>
                <div className="px-4 py-3">
                    <p className="text-lg font-bold text-black truncate block capitalize">T-Shirt - 2</p>
                    <div className="flex items-center">
                        <div className="ml-auto">
                          <p className="text-lg font-semibold text-black cursor-auto">$500</p>
                        </div>
                    </div>
                </div>
              </button>
            </div>
          </div>
          
          <div className="category-item space-y-4">
            <Link to="/shop/hoodies">Hoodies</Link>
            <div className="item bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <button
                className="item-button"
                onClick={() => navigate("/shop/hoodies/1")}
              >
                <img src={hoodieImage} alt="Hoodie" className="hover:opacity-75 h-48"/>
                <div className="px-4 py-3">
                    <p className="text-lg font-bold text-black truncate block capitalize">Hoodie - 1</p>
                    <div className="flex items-center">
                        <div className="ml-auto">
                          <p className="text-lg font-semibold text-black cursor-auto">$500</p>
                        </div>
                    </div>
                </div>
              </button>
            </div>
            <div className="item bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <button
                className="item-button"
                onClick={() => navigate("/shop/hoodies/2")}
              >
                <img src={hoodieImage} alt="Hoodie" className="hover:opacity-75 h-48"/>
                <div className="px-4 py-3">
                    <p className="text-lg font-bold text-black truncate block capitalize">Hoodie - 2</p>
                    <div className="flex items-center">
                        <div className="ml-auto">
                          <p className="text-lg font-semibold text-black cursor-auto">$500</p>
                        </div>
                    </div>
                </div>
              </button>
            </div>
          </div>

          <div className="category-item space-y-4">
            <Link to="/shop/mugs">Mugs</Link>
            <div className="item bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <button
                className="item-button"
                onClick={() => navigate("/shop/mugs/1")}
              >
                <img src={mugImage} alt="Mug" className="hover:opacity-75 h-48"/>
                <div className="px-4 py-3">
                    <p className="text-lg font-bold text-black truncate block capitalize">Mug - 1</p>
                    <div className="flex items-center">
                        <div className="ml-auto">
                          <p className="text-lg font-semibold text-black cursor-auto">$500</p>
                        </div>
                    </div>
                </div>
              </button>
            </div>
            <div className="item bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <button
                className="item-button"
                onClick={() => navigate("/shop/mugs/2")}
              >
                <img src={mugImage} alt="Mug" className="hover:opacity-75 h-48"/>
                <div className="px-4 py-3">
                    <p className="text-lg font-bold text-black truncate block capitalize">Mug - 2</p>
                    <div className="flex items-center">
                        <div className="ml-auto">
                          <p className="text-lg font-semibold text-black cursor-auto">$500</p>
                        </div>
                    </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* List of Ideas and Designs Section */}
      <section className="ideas-section">
        <div className="ideas-container">
          <div className="ideas-content">
            <div className="image-text-container">
              <div className="img-container flex justify-center">
                <img className="ideas-image" src={stickers} alt="" />
              </div>
              <div className="text-container">
                <h2 className="h1">Clothing</h2>
                <p className="homepage">
                  Choose from a range of wide range garments to customise, we
                  specialise in personal and workwear including t-shirts,
                  hoodies and jumpers, for men, women and kids. You can use our
                  range of great designs or send us your own! Let us put the fun
                  into designing your own garments.
                </p>
                <h2 className="h1">Accessories</h2>
                <p className="homepage">
                  Choose from a range of items to customise including Cups,
                  Phone cases, Key rings and Stickers, great for all your needs,
                  whether its personal, Advertising and Business Branding.
                </p>
              </div>
            </div>
            <div className="image-text-container">
              <div className="text-container">
                <h2 className="h1">Signs</h2>
                <p className="homepage">
                  Choose from a range of Signage Displays, including A Boards,
                  Flat Cut Letter, Sign Trays, 3D Letters and Banners. Great for
                  all your Advertising and Business Branding needs. We also have
                  a committed quotation and Installations team available to see
                  your needs through hassle free!
                </p>
                <h2 className="h1">Stationery</h2>
                <p className="homepage">
                  Choose from a range of Branding Packages, including Business
                  Cards, Leaflets, Booklets, Posters and whole lot more, great
                  for all your Advertising and Business Branding needs. We also
                  have a committed quotation and Installations team available to
                  see your needs through hassle free!
                </p>
              </div>
              <div className="img-container flex justify-center">
                <img
                  className="ideas-image"
                  src={designSign}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <div className="about-us-content" id="about-us">
          <h2 className="text-3xl font-bold mb-2">Our Story</h2>
          <p className="section-description">
            Welcome to WePrint247, where creativity meets craftsmanship. Our
            journey began with a simple idea – to provide a one-of-a-kind
            printing experience for every customer.
          </p>
          <p className="section-description">
            At WePrint247, we believe in the power of self-expression. Whether
            it's personalized apparel, unique accessories, or custom gifts,
            we're here to bring your ideas to life. Our commitment goes beyond
            printing; it's about creating a platform where your imagination
            knows no bounds.
          </p>
          <p className="section-description">
            We take pride in delivering high-quality products with a touch of
            personalization. Our team is dedicated to ensuring that every item
            you receive reflects the passion and creativity you put into it.
          </p>
          <div className="about-us-image-container">
            <img src={aboutUsImage} alt="About Us" className="about-us-image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
