import React, { useEffect } from 'react';
import '../styles/SnackbarNotificacion.css';

function SnackbarNotificacion({ mensaje, tipo, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`snackbar ${tipo === 'aceptada' ? 'success' : 'error'}`}>
      {mensaje}
    </div>
  );
}

export default SnackbarNotificacion;
