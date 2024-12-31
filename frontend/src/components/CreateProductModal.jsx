import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateProductModal = ({fetchData}) => {
  const [createModal, setCreateModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: 0, description: '', category: '', image: '', stock: 0 });
  const [error, setError] = useState('');
  const accessToken = Cookies.get('accessToken');

  const handleOpenModal = () => {
    setCreateModal(true);
  };

  const handleCloseModal = () => {
    setCreateModal(false);
    setFormData({ name: '', price: 0, description: '', category: '', image: '', stock: 0 });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateData = async () => {
    const { name, price, description, category, image, stock } = formData;

    if (!name || !price || !description || !category || !image || !stock) {
      setError('All fields are required!');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_ROUTE}/product`, { name, price, description, category, image, stock }, {
        headers: { 'Content-Type': 'application/json', Authorization: accessToken ? `Bearer ${accessToken}` : '', },
      });

      alert('Data created successfully!');
      fetchData(); 
      handleCloseModal();
    } catch (error) {
      console.error('Error creating data:', error);
      setError('Failed to create data. Please try again.');
    }
  };

  return (
    <>
      <button
        className="p-3 bg-green-500 hover:bg-green-600 rounded-md text-white"
        onClick={handleOpenModal}
      >
        Create Product
      </button>
      {createModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-semibold mb-4">Create New Product</h2>
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
            <form>
              {['name', 'price', 'description', 'category', 'image', 'stock'].map((field, idx) => (
                <div className="mb-4" key={idx}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium mb-1 capitalize"
                  >
                    {field}
                  </label>
                  {field === 'description' ? (
                    <textarea
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                    />
                  ) : (
                    <input
                      type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                    />
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleCreateData}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition-all w-full mb-2"
              >
                Create Product
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition-all w-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProductModal;
