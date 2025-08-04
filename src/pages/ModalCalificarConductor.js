import React, { useState } from 'react';
import '../styles/ModalCalificarPasajeros.css';

const ModalCalificarConductor = ({ conductor, onCerrar, onEnviarCalificacion, viajeId }) => {
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleEnviar = async () => {
    if (!rating || rating === 0) {
      setError('Por favor selecciona una calificación');
      return;
    }

    if (comentario.length > 200) {
      setError('El comentario no puede exceder los 200 caracteres');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await onEnviarCalificacion({ 
        viajeId,
        conductorId: conductor.id, 
        rating, 
        comentario 
      });
    } catch (err) {
      setError('Error al enviar calificación. Por favor intenta nuevamente.');
      console.error('Error al calificar conductor:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (star) => {
    setRating(star);
    setError(''); // Clear error when user interacts
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Calificar Conductor</h2>
          <button 
            className="close-button" 
            onClick={onCerrar}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <div className="card-calificar-pasajero">
          <div className="conductor-info">
            <img 
              src={conductor.fotoPerfil || '/default-profile.png'} 
              alt={conductor.nombre}
              className="conductor-avatar"
              onError={(e) => {
                e.target.src = '/default-profile.png';
              }}
            />
            <div className="conductor-details">
              <span className="conductor-nombre">
                {conductor.nombre} {conductor.apellido}
              </span>
              {conductor.telefono && (
                <span className="conductor-telefono">
                  Tel: {conductor.telefono}
                </span>
              )}
            </div>
          </div>

          <div className="rating-section">
            <p>¿Cómo calificarías tu viaje con {conductor.nombre}?</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`star ${rating >= star ? 'filled' : ''}`}
                  onClick={() => handleRatingChange(star)}
                  style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  title={`${star} estrella${star !== 1 ? 's' : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="rating-labels">
              <span>Malo</span>
              <span>Excelente</span>
            </div>
          </div>

          <div className="comment-section">
            <label htmlFor="comentario">Comentario (opcional):</label>
            <textarea
              id="comentario"
              placeholder="Ej: Fue puntual y maneja con cuidado..."
              className="comentario-input"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              maxLength="200"
              disabled={isSubmitting}
            />
            <small className="char-counter">
              {comentario.length}/200 caracteres
            </small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="buttons-container">
            <button 
              className="enviar-btn" 
              onClick={handleEnviar}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Calificación'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCalificarConductor;