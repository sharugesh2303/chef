import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 1. Import this
import App from './App.jsx';
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 👈 2. Wrap your App component */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
