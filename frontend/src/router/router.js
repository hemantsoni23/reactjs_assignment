import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; 
import AdminPanel from '../pages/AdminPanel';
import ProductList from '../pages/ProductList';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ProtectedRoute from '../components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import ProductDescription from '../pages/ProductDescription';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <ProductList /> },
      { path: '/product/:id', element: <ProductDescription /> },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        ),
      },
      { path: 'signup', element: <SignUp /> },
      { path: 'login', element: <Login /> },
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);

export default router;
