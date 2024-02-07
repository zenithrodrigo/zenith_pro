import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DesignOverlay from "../../components/designOverlay/DesignOverlay";

import "./create-your-own.css";

import tShirtImageFront from "../../assets/shirt-front-438x570.png";
import tShirtImageBack from "../../assets/shirt-back-438x570.png";
import tShirtImageRight from "../../assets/shirt-right-438.png";
import tShirtImageLeft from "../../assets/shirt-left-438.png";
// import designImg from "../../assets/logo.png";
import hoodieImage from "../../assets/white-hoodie.png";
import { useUser } from "../../contexts/UserContext";

const item = {
  approvedForMarketplace: false,
  business: "655dc6a4899de08a03c26035",
  category: "t-shirts",
  description: "T-shirt",
  img: hoodieImage,
  images: {
    front: tShirtImageFront,
    back: tShirtImageBack,
    right: tShirtImageRight,
    left: tShirtImageLeft,
  },
  name: "T-shirt",
  price: 500,
  quantity: 100,
  _id: "0003",
  styles: {
    front: {
      top: "12%",
      left: "23%",
      width: "53%",
      height: "70%",
    },
    back: { top: "12%", left: "23%", width: "53%", height: "70%" },
    right: { top: "33%", left: "25%", width: "45%", height: "47%" },
    left: { top: "33%", left: "25%", width: "45%", height: "47%" },
  },
};

let designCanvas = {};

const CreateYourOwn = () => {
  const overlayRef = useRef(null);
  const { addToCart } = useUser();
  const navigate = useNavigate();
  // const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState();
  const [backgroundImage, setBackgroundImage] = useState(item.images.front);
  const [style, setStyle] = useState(item.styles.front);
  const [designDetails, setDesignDetails] = useState({
    location: "",
    notes: "",
  });
  const [images, setImages] = useState([]);
  const [side, setSide] = useState("front");
  const [state, setState] = useState({
    front: { designs: [], backgroundImg: item.images.front },
    back: { designs: [], backgroundImg: item.images.back },
    right: { designs: [], backgroundImg: item.images.right },
    left: { designs: [], backgroundImg: item.images.left },
  });
  const [positions, setPositions] = useState([]);

  // const handleProductChange = () => {
  //   // Implement product change logic (e.g., switch to another product)
  //   console.log("Change Product");
  //   navigate("/shop");
  // };

  const handleAddToCart = () => {
    // Implement add to cart logic
    console.log("Add to Cart");
    console.log(uploadedImage);
    console.log(designDetails);
    designCanvas = overlayRef.current.children;
    let childElementIndex = 4;
    while (childElementIndex < designCanvas.length) {
      switch (designCanvas[childElementIndex].name) {
        case 'front':
          item.images.front = designCanvas[childElementIndex].value;
          break;
        case 'back':
          item.images.back = designCanvas[childElementIndex].value;
          break;
        case 'left':
          item.images.left = designCanvas[childElementIndex].value;
          break;
        case 'right':
          item.images.right = designCanvas[childElementIndex].value;
          break;
        default:
      }
      childElementIndex ++;
    }
    addToCart(item);
    navigate("/checkout/1");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesignDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    let inputs = document.getElementById("file_input");
    inputs.value = "";
    setImages((prevImages) => [...prevImages, ...selectedFiles]);

    setState((prevState) => ({
      ...prevState,
      [side]: {
        ...prevState[side],
        designs: [...prevState[side].designs, ...selectedFiles],
      },
    }));
  };

  const removeImage = (index) => {
    let inputs = document.getElementById("file_input");
    inputs.value = "";
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setState((prevState) => {
      const updatedDesigns = [...prevState[side].designs];
      updatedDesigns.splice(index, 1);

      return {
        ...prevState,
        [side]: {
          ...prevState[side],
          designs: updatedDesigns,
        },
      };
    });
  };

  const imagePreview = (
    <div>
      {state[side].designs.map((image, index) => (
        <div key={index} className="flex justify-around items-center m-2">
          <img
            src={URL.createObjectURL(image)}
            alt={`preview-${index}`}
            style={{ width: "70px", height: "auto" }}
          />
          <button className="bg-zinc-500 opacity-75 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-zinc-400 z-0" onClick={() => removeImage(index)}>Remove</button>
        </div>
      ))}
    </div>
  );

  const savePositions = () => {
    // Handle saving positions, e.g., update state or local storage
    console.log("Saved positions:", positions);
  };

  return (
    <div className="create-your-own bg-gradient-to-tr from-lime-600 via-emerald-600 to-teal-800">
      <div id="overlayedImg" className="create-your-own-card text-white rounded-xl shadow-md mt-8 bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg" ref={overlayRef}>
        <h2 className="text-xl font-bold md:text-3xl m-4">Create Your Own</h2>
        <div className="images-preview" draggable="false" id={side}>
          <DesignOverlay
            backgroundImage={backgroundImage}
            overlayImages={state[side].designs}
            style={style}
            savePositions={savePositions}
          />
        </div>
          
        <div className="flex justify-center space-x-2 m-4">
          <button
            className="bg-indigo-600 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-indigo-500 z-0"
            onClick={() => {
              setSide("front");
              setBackgroundImage(item.images.front);
              setStyle(item.styles.front);
            }}
          >
            front
          </button>
          <button
            className="bg-indigo-600 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-indigo-500 z-0"
            onClick={() => {
              setSide("back");
              setBackgroundImage(item.images.back);
              setStyle(item.styles.back);
            }}
          >
            back
          </button>
          <button
            className="bg-indigo-600 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-indigo-500 z-0"
            onClick={() => {
              setSide("left");
              setBackgroundImage(item.images.left);
              setStyle(item.styles.left);
            }}
          >
            left
          </button>
          <button
            className="bg-indigo-600 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-indigo-500 z-0"
            onClick={() => {
              setSide("right");
              setBackgroundImage(item.images.right);
              setStyle(item.styles.right);
            }}
          >
            right
          </button>
        </div>
        
        <div className="step-form">
          <div>
            <input
            id="file_input"
              className="bg-white-600 text-indigo-400 text-sm leading-6 font-medium rounded-md hover:text-green-600"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {imagePreview}
          </div>
          {/* <button>add text</button> */}
          {/* <button>choose from designs</button> */}
          <textarea
            name="notes"
            value={designDetails.notes}
            onChange={handleInputChange}
            placeholder="Add any notes"
            className="bg-zinc-200 w-2/3 mt-4"
          />
          <div className="flex justify-center space-x-4 m-4">
            <button onClick={handleBack} className="bg-blue-600 text-white text-md leading-6 font-medium py-1 px-4 rounded-md hover:bg-blue-500 z-0">
              Back
            </button>
            <button onClick={handleAddToCart} className="bg-blue-600 text-white text-md leading-6 font-medium py-1 px-4 rounded-md hover:bg-blue-500 z-0">
              Add to Cart & Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateYourOwn;
