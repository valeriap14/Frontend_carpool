
import React, { useState } from 'react';

import '../styles/CardCalificarPasajero.css';
import { FaStar } from 'react-icons/fa';

const CardCalificarPasajero = ({ pasajero, onEnviar, onCerrar }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comentario, setComentario] = useState('');

  const estrellas = [1, 2, 3, 4, 5];

  const enviarCalificacion = () => {
    if (rating === 0) {
      alert('Por favor selecciona una calificación de estrellas.');
      return;
    }
    onEnviar({
      pasajeroId: pasajero.id,
      rating,
      comentario
    });
    setRating(0);
    setComentario('');
  };

  return (
    <div className="card-calificar-pasajero">
      <button className="cerrar-btn" onClick={onCerrar}>×</button>
      <div className="info-pasajero">
        <img
          src={pasajero.fotoPerfil || '/default-avatar.png'}
          alt={`Foto de ${pasajero.nombre}`}
          className="foto-pasajero"
        />
        <h3 className="nombre-pasajero">{pasajero.nombre}</h3>
      </div>

      <div className="estrellas-container">
        {estrellas.map((estrella) => (
          <FaStar
            key={estrella}
            className="estrella"
            size={30}
            color={(hoverRating || rating) >= estrella ? '#ffc107' : '#e4e5e9'}
            onClick={() => setRating(estrella)}
            onMouseEnter={() => setHoverRating(estrella)}
            onMouseLeave={() => setHoverRating(0)}
            style={{ cursor: 'pointer', marginRight: 5 }}
          />
        ))}
      </div>

      <textarea
        placeholder="Escribe un comentario (opcional)"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        className="comentario-input"
        rows={3}
      />

      <button className="enviar-btn" onClick={enviarCalificacion}>
        Enviar Calificación
      </button>
    </div>
  );
};

export default CardCalificarPasajero;
