import React, { useEffect, useState } from 'react';
import '../styles/ModalCalificarPasajeros.css';

const ModalCalificarPasajeros = ({ pasajeros, onCerrar, onEnviarCalificacion, viajeId }) => {
  console.log('Pasajeros recibidos en modal:', pasajeros);

  const [calificaciones, setCalificaciones] = useState({});

  useEffect(() => {
    const initialCalificaciones = pasajeros.reduce((acc, p) => {
      acc[p.id] = { rating: 0, comentario: '' };
      return acc;
    }, {});
    setCalificaciones(initialCalificaciones);
  }, [pasajeros]);

  const handleRatingChange = (pasajeroId, rating) => {
    setCalificaciones(prev => ({
      ...prev,
      [pasajeroId]: {
        ...prev[pasajeroId],
        rating,
      },
    }));
  };

  const handleComentarioChange = (pasajeroId, comentario) => {
    setCalificaciones(prev => ({
      ...prev,
      [pasajeroId]: {
        ...prev[pasajeroId],
        comentario,
      },
    }));
  };

  const handleEnviar = (pasajeroId) => {
    const { rating, comentario } = calificaciones[pasajeroId] || {};
    if (!rating || rating === 0) {
      alert('Por favor selecciona una calificación para continuar.');
      return;
    }
    onEnviarCalificacion({ viajeId, pasajeroId, rating, comentario });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Calificar Pasajeros</h2>
          <button className="close-button" onClick={onCerrar}>×</button>
        </div>

        <div className="pasajeros-list">
          {pasajeros.map(p => (
            <div key={p.id} className="card-calificar-pasajero">
              <div className="pasajero-info">
                <img src={p.fotoPerfil || '/default-profile.png'} alt={p.nombre} />
                <span className="pasajero-nombre">{p.nombre} {p.apellido}</span>
              </div>

              <div className="stars">
                {[1, 2, 3, 4, 5].map(starValue => (
                  <span
                    key={starValue}
                    className={`star ${calificaciones[p.id]?.rating >= starValue ? 'filled' : ''}`}
                    onClick={() => handleRatingChange(p.id, starValue)}
                    style={{ cursor: 'pointer' }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                placeholder="Escribe un comentario (opcional)..."
                className="comentario-input"
                value={calificaciones[p.id]?.comentario || ''}
                onChange={(e) => handleComentarioChange(p.id, e.target.value)}
              />

              <div className="buttons-container">
                <button
                  className="enviar-btn"
                  onClick={() => handleEnviar(p.id)}
                >
                  Enviar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalCalificarPasajeros;
