import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  const { role, logout } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginSignup = () => {
    navigate('/login');
  };

  return (
    <nav className="fixed flex items-center justify-between p-4 bg-blue-600 text-text-dark w-full top-0 shadow-md z-10">
      {/* Left Section: Logo/Title */}
      <div className="flex items-center space-x-2">
        <span
          className="text-lg font-semibold cursor-pointer"
          onClick={() => navigate('/')}
        >
          Project Catalog
        </span>
      </div>

      {/* Middle Section: Theme Toggle */}
      <ThemeToggle />

      {/* Right Section: Role-based Options or Login/Signup */}
      <div className="flex items-center space-x-4">
        {role && role !== 'undefined' && role !== 'null' ? (
          <>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="font-semibold focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              {role}
            </button>
            {isMenuOpen && (
              <div className="absolute right-4 mt-2 w-40 bg-white text-gray-700 rounded shadow-lg z-20">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={handleLoginSignup}
            className="bg-transparent text-text-dark px-4 py-2 border border-border-light hover:bg-background-dark rounded focus:outline-none focus:ring-2 focus:ring-white"
          >
            Login/Signup
          </button>
        )}
      </div>

      {/* Background overlay for menu */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-25 z-10"
          aria-hidden="true"
        ></div>
      )}
    </nav>
  );
};

export default NavBar;
