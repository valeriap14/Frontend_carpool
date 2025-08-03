
import React, { useState } from 'react';
import '../styles/cardCalificacion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const CardCalificacion = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Por favor selecciona una calificación.');
      return;
    }

    if (onSubmit) {
      onSubmit({ rating, comment });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="rate-card">
        <h2>Tu viaje ha sido finalizado</h2>
        <p className="subtitulo">Califica tu conductor</p>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={solidStar}
              className={`star ${star <= (hover || rating) ? 'active' : ''}`}
              onClick={() => setRating(star)} 
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>

        <textarea
          placeholder="Escribe un comentario (opcional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={handleSubmit}>Enviar calificación</button>
      </div>
    </div>
  );
};

export default CardCalificacion;
