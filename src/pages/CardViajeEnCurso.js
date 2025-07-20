import React from 'react';
import '../styles/CardViajeEnCurso.css';

const CardViajeEnCurso = ({
  origen,
  destino,
  horaSalida,
  asientosDisponibles,
  precio,
  descripcion
}) => {
  return (
    <div className="card-viaje">
      <h3>Viaje en Curso</h3>
      <div className="viaje-info">
        <p><strong>Origen:</strong> {origen}</p>
        <p><strong>Destino:</strong> {destino}</p>
        <p><strong>Hora de salida:</strong> {horaSalida}</p>
        <p><strong>Asientos disponibles:</strong> {asientosDisponibles}</p>
        <p><strong>Precio por asiento:</strong> L{precio}</p>
        {descripcion && <p><strong>Detalles:</strong> {descripcion}</p>}
      </div>
    </div>
  );
};

export default CardViajeEnCurso;