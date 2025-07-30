// src/components/Toast.js
import React, { useEffect } from 'react';
import '../styles/toast.css';


const Toast = ({ mensaje, onClose, duracion = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duracion);

    return () => clearTimeout(timer);
  }, [duracion, onClose]);

  return (
    <div className="toast-container">
      <div className="toast">
        <span>{mensaje}</span>
        <button className="toast-close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Toast;
