import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { BookingFlow } from './components/BookingFlow';
import { AdminPage } from './components/AdminPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-epomg1ffnhcleclg.us.auth0.com"
      clientId="yz2evMTLLaIhcZv51n8KDPYvE7pRyYl4"
      authorizationParams={{
        audience: "https://dev-epomg1ffnhcleclg.us.auth0.com/api/v2/",
        redirect_uri: window.location.origin
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingFlow />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </Auth0Provider>
  </React.StrictMode>
);
