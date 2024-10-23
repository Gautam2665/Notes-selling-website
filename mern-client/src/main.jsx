import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routers/router.jsx';
import AuthProvider from './contects/AuthProvider.jsx';
import { CategoryProvider } from './context/CategoryContext.jsx'; 
import { CartProvider } from './context/CartContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CategoryProvider> 
        <CartProvider> 
          <RouterProvider router={router}/>
        </CartProvider>
      </CategoryProvider>
    </AuthProvider>
  </React.StrictMode>,
);
