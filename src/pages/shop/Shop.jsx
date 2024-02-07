import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./shop.css";

import tShirtImage from "../../assets/t-shirts.jpeg";
import hoodieImage from "../../assets/white-hoodie.png";
import hoodie from "../../assets/hoodies.jpeg";
import { useUser } from "../../contexts/UserContext";

const items = [
  {
    approvedForMarketplace: false,
    business: "0001",
    category: "hoodies",
    description: "Hoodie",
    img: hoodie,
    name: "Hoodie1",
    price: 500,
    quantity: 100,
    _id: "01",
  },
  {
    approvedForMarketplace: false,
    business: "0002",
    category: "hoodies",
    description: "Hoodie",
    img: hoodie,
    name: "Hoodie2",
    price: 500,
    quantity: 100,
    _id: "02",
  },
  {
    approvedForMarketplace: false,
    business: "0003",
    category: "t-shirts",
    description: "T-shirt",
    img: tShirtImage,
    name: "T-shirt1",
    price: 500,
    quantity: 100,
    _id: "03",
  },
  {
    approvedForMarketplace: false,
    business: "0004",
    category: "t-shirts",
    description: "T-shirt",
    img: tShirtImage,
    name: "T-shirt2",
    price: 500,
    quantity: 100,
    _id: "04",
  },
  {
    approvedForMarketplace: false,
    business: "0005",
    category: "hoodies",
    description: "Hoodie",
    img: hoodieImage,
    name: "White Hoodie1",
    price: 500,
    quantity: 100,
    _id: "05",
  },
  {
    approvedForMarketplace: false,
    business: "0006",
    category: "hoodies",
    description: "Hoodie",
    img: hoodieImage,
    name: "White Hoodie2",
    price: 500,
    quantity: 100,
    _id: "06",
  },
];

const Shop = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const isButtonSelected = (category) => {
    return selectedCategory === category ? "selected" : "";
  };

  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
    setSelectedCategory(e.target.value);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="shop">
      <section className="title-section">
        {/* <div className="title-content">
          <h2 className="text-4xl text-violet-500 font-bold">Shop</h2>
        </div> */}
      </section>
      <select onChange={handleChange} className="flex mt-6 ml-4 rounded-md border border-zinc-400 md:hidden">
        <option value="all">All</option>
        <option value="t-shirts">T-Shirts</option>
        <option value="hoodies">Hoodies</option>
      </select>
      <section className="flex justify-space flex-row">
        <div className="hidden basis-1/4 flex-col flex-wrap bg-white border border-slate-400/50 rounded-md items-center mt-4 mr-6 h-3/6 md:basis-1/6 md:flex">
          <h3 className="text-md font-bold m-3 text-slate sm:text-xl">Category Items</h3>
          <button            
            onClick={() => setSelectedCategory("all")}
            className="flex items-center px-2 py-1 bg-zinc-400/50 border border-slate-200/50 hover:bg-zinc-200 w-full focus:bg-slate-200 z-0 md:px-4 py-3"
          >
            All
          </button>
          <button
            className="flex items-center px-2 py-1 bg-zinc-400/50 border border-slate-200/50 hover:bg-zinc-200 w-full focus:bg-slate-200 z-0 md:px-4 py-3"
            onClick={() => setSelectedCategory("t-shirts")}
          >
            T-Shirts
          </button>
          <button
            className="flex items-center px-2 py-1 bg-zinc-400/50 border border-slate-200/50 hover:bg-zinc-200 w-full focus:bg-slate-200 z-0 md:px-4 py-3"
            onClick={() => setSelectedCategory("hoodies")}
          >
            Hoodies
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:basis-5/6">
          {filteredProducts.map((item) => (
            <div className="ml-4 w-11/12 rounded overflow-hidden shadow-lg flex flex-col" key={item._id}>
              <div className="relative">
                <img className="w-full h-40"
                    src={item.img}
                    alt={item.title}/>
                <div
                    className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                </div>
              </div>
              <div className="px-6 py-4 mb-auto">
                  <p className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                    {item.description}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Price: ${item.price}
                  </p>
              </div>
              <div className="px-6 pb-2 flex items-center justify-center items-center bg-gray-100">
                <button className="text-xs bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out z-0" onClick={() =>
                  navigate(`/shop/${item.category}/${item._id}/create-your-own`)
                }>
                    Design your own
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shop;
