import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Item({ category, image }) {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const items = [
    {
      index : '0001',
    },
    {
      index : '1',
    }
  ];

  return (
    <>
      {itemId}
      <Link to={`/shop/${category}`}>{category}</Link>
      <div className="category-item">
        {items.map((item, index) => (
          <div className="item" key={index}>
            <button onClick={() => navigate(`/shop/${category}/${index + 1}`)}>
              <p>{`${category.charAt(0).toUpperCase() + category.slice(1)} - ${
                index + 1
              }`}</p>
              <img src={image} alt={category} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
