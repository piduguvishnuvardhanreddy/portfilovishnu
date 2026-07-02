import React from 'react';
import './index.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner">
        <div className="spinner-ring ring-1"></div>
        <div className="spinner-ring ring-2"></div>
        <div className="spinner-center"></div>
      </div>
    </div>
  );
};

export default Loader;
