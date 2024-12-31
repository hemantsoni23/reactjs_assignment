import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CreateProductModal from './CreateProductModal';

const AdminProductTable = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchData = async () => {
    setLoading(true);
    try {
      const accessToken = Cookies.get('accessToken');
      const response = await axios.get(
        `${process.env.REACT_APP_API_ROUTE}/product/all`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        }
      );
      setProduct(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isDeleteModalOpen, isEditModalOpen]);

  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setIsEditModalOpen(true);
  };

  // Filter the product based on filter inputs
  const filteredData = product
    .filter((entry) => entry.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const filteredKeys = product.length > 0
    ? Object.keys(product[0]).filter((key) => key !== '_id' && key !== '__v')
    : [];

  return (
    <div className="p-4 bg-background-light dark:bg-background-dark rounded-lg shadow">
      {/* Filters */}
      <div className="flex justify-between space-x-4 mb-4">
        <CreateProductModal fetchData={fetchData} />
        <div className='flex space-x-4'>
          {/* Search Filter */}
          <div className="flex items-center text-sm bg-background-light dark:bg-background-dark">
            <input
              type="text"
              placeholder="Search by name..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
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
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="min-w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
            <thead>
              <tr>
                {filteredKeys.map((key) => (
                  <th key={key} className="px-4 py-2 border-b border-border-light dark:border-border-dark capitalize text-left text-text-light dark:text-text-dark">
                    {key}
                  </th>
                ))}
                <th className="px-4 py-2 border-b border-border-light dark:border-border-dark capitalize text-left text-text-light dark:text-text-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-muted-light ">
                  {filteredKeys.map((key) => (
                    <td key={key} className="px-4 py-2 border-b border-border-light dark:border-border-dark text-text-light dark:text-text-dark text-left">
                      {row[key]}
                    </td>
                  ))}
                  <td className="px-4 py-2 border-b border-border-light dark:border-border-dark text-left">
                    <button
                      className="text-blue-500 dark:text-blue-300 hover:underline mr-2"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 dark:text-red-300 hover:underline"
                      onClick={() => handleDelete(row)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4 text-muted-light dark:text-muted-dark">No Data Available</div>
        )}
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          row={selectedRow}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isEditModalOpen && (
        <EditModal
          row={selectedRow}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};


const DeleteModal = ({ row, onClose }) => {

  const handleDelete = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      await axios.delete(
        `${process.env.REACT_APP_API_ROUTE}/product/${row._id}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        }
      );
      onClose();
    } catch (err) {
      console.error('Error deleting data:', err);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-background-light dark:bg-background-dark p-6 rounded shadow-lg">
        <p>Are you sure you want to delete this data?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-muted-light dark:bg-muted-dark dark:text-text-light rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const EditModal = ({ row, onClose }) => {
  const [formData, setFormData] = useState({
    name: row.name || '',
    price: row.price || 0,
    category: row.category || '',
    description: row.description || '',
    image: row.image || '',
    stock: row.stock || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(row);
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const accessToken = Cookies.get('accessToken');
      await axios.put(
        `${process.env.REACT_APP_API_ROUTE}/product/${row._id}`, 
        formData, 
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        } 
      );
      onClose();
    } catch (err) {
      console.error('Error updating data:', err);
      setError('Failed to update data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-background-light dark:bg-background-dark py-3 px-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Data</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {['name', 'price', 'description', 'category', 'image', 'stock'].map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium capitalize">{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 text-text-light"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-muted-light dark:bg-muted-dark dark:text-text-light rounded hover:bg-gray-300"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductTable;
