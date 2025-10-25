import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // 👈 Import the new authentication wrapper
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* 👈 Render the new App component */}
  </React.StrictMode>,
);