import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROUTE}/product/all`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mt-16 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center justify-between">
        Product Catalog
        <div className="flex space-x-4">
          {/* Search Filter */}
          <div className="flex items-center text-sm bg-background-light dark:bg-background-dark">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border dark:border-border-light border-border-dark rounded px-2 py-1 bg-transparent text-gray-800 dark:text-white"
              style={{ color: 'inherit' }}
            />
          </div>

          {/* Sort Filter */}
          <div className="flex items-center text-sm">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border dark:border-border-light border-border-dark rounded px-2 py-1 bg-transparent text-gray-800 dark:text-white"
            >
              <option value="asc" className='dark:bg-background-dark bg-background-light'>Sort by Price: Low to High</option>
              <option value="desc" className='dark:bg-background-dark bg-background-light'>Sort by Price: High to Low</option>
            </select>
          </div>
        </div>
      </h1>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm rounded ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
