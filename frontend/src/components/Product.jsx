import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
  const { _id, name, price } = product;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div
      className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <img
        src="https://placehold.co/500x400/png"
        alt={name}
        className="w-full h-40 object-contain mb-4"
      />
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate">{name}</h2>
      <p className="text-blue-600 dark:text-blue-400 font-semibold mt-2">₹{price.toFixed(2)}</p>
    </div>
  );
};

export default Product;
