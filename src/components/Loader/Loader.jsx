import React from 'react';
import './Loader.module.css';

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
