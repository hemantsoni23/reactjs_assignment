import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDescription = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROUTE}/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-20">Loading product details...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <img
          src="https://placehold.co/400x400/png"
          alt={product.name}
          className="w-1/2 h-auto object-contain mb-4 rounded-lg shadow-lg"
        />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">{product.name}</h1>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Description</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
        <p className="text-lg font-semibold text-green-600 dark:text-green-400">
          In Stock: {product.stock}
        </p>
      </div>
    </div>
  );
};

export default ProjectDescription;
