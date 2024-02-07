import React, { useState, useRef } from "react";
import "./design-overlay.css";
import DragAndResize from "../dragAndResize/DragAndResize";

const DesignOverlay = ({
  backgroundImage,
  overlayImage,
  style,
  overlayImages,
}) => {

  const [size, setSize] = useState({});

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const [offsets, setOffsets] = useState();

  let overlayedImg = '';

  const handleSave = (offsets,sizeValue) => {
    console.log("Save Positions")
    console.log(offsets,sizeValue);
    setOffsets(offsets);
    setSize(sizeValue);
  };

  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    //image area
    let containerElement = containerRef.current;
    let containerRect = containerElement.getBoundingClientRect(); 
    let constrainElement = containerElement.children[1];
    let imgBoundElement = containerElement.children[1].children;
    let imgBoundRect = {};
    let imgRect = {};

    //original position in overlayed image area
    let leftValue = constrainElement.style.left;
    let topValue = constrainElement.style.top;

    //overlayed image's position and url
    let xPos = 0;
    let yPos = 0;
    let imgUrl = "";

    //overlayed images' index
    let childElementIndex = 0;

    //canvas size
    canvas.width = containerRect.width;
    canvas.height = containerRect.height;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image
    const backgroundImageObj = new Image();
    backgroundImageObj.src = backgroundImage;
    context.drawImage(backgroundImageObj, 0, 0, canvas.width, canvas.height);

    //Draw overlayed images
    while (childElementIndex < imgBoundElement.length) {
      //dragged image position
      let transform = imgBoundElement[childElementIndex].style.transform;
      transform = transform.slice(12,transform.length-1);
      let offset = transform.split(",");
      let dx = offset[0].slice(0,offset[0].length-2) / 1;
      let dy = offset[1].slice(1,offset[1].length-2) / 1;

      imgBoundRect = imgBoundElement[childElementIndex].getBoundingClientRect();
      imgRect = imgBoundElement[childElementIndex].lastElementChild.getBoundingClientRect();

      xPos = containerRect.width * leftValue.slice(0, leftValue.length-1) / 100 + dx + (imgBoundRect.width - imgRect.width) / 2;
      yPos = containerRect.height * topValue.slice(0, topValue.length-1) / 100 + dy + (imgBoundRect.height - imgRect.height) / 2;

      imgUrl = imgBoundElement[childElementIndex].lastElementChild.src;
      
      console.log(dx,dy,imgUrl);

      // Draw overlayed image
      const overlayImageObj = new Image();
      overlayImageObj.src = imgUrl;
      context.drawImage(
        overlayImageObj,
        xPos,
        yPos,
        imgRect.width,
        imgRect.height
      );

      childElementIndex ++;
    };

    overlayedImg = canvas.toDataURL('image/png');

    const dataURItoBlob = (overlayedImg) => {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;

        if(overlayedImg.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(overlayedImg.split(',')[1]);
        else
            byteString = unescape(overlayedImg.split(',')[1]);

        // separate out the mime component
        let mimeString = overlayedImg.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        let ia = new Uint8Array(byteString.length);
        for(let i = 0; i < byteString.length; i++)
        {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type: mimeString});
    }

    let blob = dataURItoBlob(overlayedImg);
    let objectURL = URL.createObjectURL(blob);
    console.log("BlobUrl:",objectURL);
    
    let side = containerElement.parentElement.id;
    const para = document.createElement("hidden");
    document.getElementById('overlayedImg').appendChild(para).value = objectURL;
    document.getElementById('overlayedImg').appendChild(para).name = side;
    // You can also draw other elements or text here if needed

    // const a = document.createElement('a');
    // a.download = 'download.png';
    // a.href = canvas.toDataURL('image/png');
    // a.click();
  };

  return (
    <div className="design-overlay-container" ref={containerRef}>
      <img
        className="background-image border rounded-sm bg-zinc-300"
        src={backgroundImage}
        alt="Background"
        draggable="false"
      />
      <div className="design-constrain" style={style} draggable="false">
        {overlayImages &&
          overlayImages.map((image, index) => (
            <DragAndResize key={index} id={index} handleSave={handleSave}>
              <img
                key={index}
                ref={imgRef}
                id={index}
                src={URL.createObjectURL(image)}
                alt="Overlay"
                // id="overlayImage"
                className="overlay-content"
                draggable="false"
              />
            </DragAndResize>
          ))}
      </div>
      <button className="bg-sky-400 text-white text-sm leading-6 font-medium py-1 px-4 rounded-md hover:bg-sky-300 z-0 mt-2" onClick={handleSaveImage}>Save</button>
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default DesignOverlay;