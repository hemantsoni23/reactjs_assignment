# Product Catalog Application

## Overview

This is a full-stack Product Catalog Application that allows users to browse, search, and sort products. It also includes a product details page and supports features like dark/light mode, pagination, and optional CRUD operations with authentication.

---

## Features

### **Homepage (Product Listing)**
- **Responsive Grid Layout:** Products are displayed in a user-friendly grid layout.
- **Product Card Details:** Each product card shows:
  - Product Name
  - Price
  - Short Description
  - Image (placeholder used)
- **Search Functionality:** A search bar to filter products by name.
- **Sort by Price:** Dropdown to sort products by price (ascending/descending).

### **Product Details Page**
- Displays detailed information for a selected product, including:
  - Full Description
  - Product Image
  - Price
  - Stock Availability
- Fetches product details dynamically from the MongoDB database.

### **CRUD Operations (Optional)**
- **Add New Product:** Form to create a new product.
- **Edit Product:** Update existing product details.
- **Delete Product:** Remove a product from the catalog.
- **Authentication:** JWT-based authentication to restrict access to CRUD operations.

### **Bonus Features**
- **Pagination:** Paginate the product list for better usability.
- **Dark/Light Mode Toggle:** User can switch between themes.
- **Validation:** Proper validation and error handling for all form inputs.

---

## Technologies Used

### **Frontend**
- React.js
- TailwindCSS for styling
- Axios for API calls

### **Backend**
- Node.js with Express.js
- MongoDB / MongoDB Atlas (Free Tier)

### **Deployment**
- Frontend: [Vercel](https://reactjs-assignment-frontend.vercel.app/)
- Backend: [Vercel](https://reactjs-assignment-backend.vercel.app/)

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/hemantsoni23/reactjs_assignment.git
   cd reactjs-assignment
   ```

2. **Backend Setup**
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend directory and add the following:
     ```
     MONGODB_CONNECTION_STR=<your-mongodb-atlas-connection-string>
     JWT_SECRET=<your-jwt-secret>
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**
   - Navigate to the `frontend` directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the frontend directory and add the following:
     ```
     REACT_APP_API_ROUTE=<your-backend-api-url>
     ```
   - Start the frontend server:
     ```bash
     npm run dev
     ```

---

## Deployed Links

- **Frontend:** [Deployed Frontend URL](https://reactjs-assignment-frontend.vercel.app/)
- **Backend:** [Deployed Backend URL](https://reactjs-assignment-backend.vercel.app/)

---

## Features Demonstration

### **1. Product Listing**

### **2. Product Details Page**

### **3. Dark/Light Mode Toggle**

---
