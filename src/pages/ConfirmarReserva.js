import { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/ConfirmarReserva.css';

function ConfirmarReserva({ viaje, onClose }) {
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
  const obtenerDetalle = async () => {
    try {
      const res = await api.get(`/viajePasajero/detalle/${viaje.id}`);
      console.log('Detalle viaje:', res.data);
      setDetalle(res.data.viaje);
    } catch (error) {
      console.error('Error al obtener el detalle del viaje:', error);
    }
  };

  if (viaje?.id) {
    obtenerDetalle();
  }
}, [viaje]);


  if (!detalle) return <p className="reserva-titulo">Cargando detalles...</p>;

  const conductor = detalle.Usuario;
  const vehiculo = conductor?.Vehiculo;

  return (
    <div className="reserva-container-overlay">
      <div className="reserva-card">
        <button className="cerrar-overlay-btn" onClick={onClose}>×</button>
        <h2 className="reserva-titulo">Confirmar Reserva</h2>

        <div className="reserva-conductor">
          <img src={conductor.fotoPerfil || '/default-avatar.png'} alt="Conductor" className="conductor-foto" />
          <div className="conductor-info">
            <h3>{conductor.nombre} {conductor.apellido}</h3>
            <p className="conductor-rating">4.7</p>
            <p className="verificado">Conductor verificado</p>
          </div>
        </div>

        <div className="reserva-detalle">
          <p><strong>Origen:</strong> {detalle.origen}</p>
          <p><strong>Destino:</strong> {detalle.destino}</p>
          <p><strong>Hora de salida:</strong> {detalle.hora_salida}</p>
          <p><strong>Asientos disponibles:</strong> {detalle.asientos_disponibles}</p>
          <p><strong>Precio por persona:</strong> L.{detalle.precio_asiento}</p>
          {detalle.descripcion && (
            <p className="reserva-descripcion">“{detalle.descripcion}”</p>
          )}
        </div>

        <div className="reserva-vehiculo">
          <h4>Información del vehículo</h4>
          <p><strong>Marca y modelo:</strong> {vehiculo?.marca} {vehiculo?.modelo}</p>
          <p><strong>Placa:</strong> {vehiculo?.placa}</p>
          <p><strong>Color:</strong> {vehiculo?.color}</p>
        </div>

        <button className="confirmar-btn"> Confirmar Reserva</button>
        <p className="reserva-nota">Puedes cancelar sin cargos hasta 30 minutos antes del viaje.</p>
      </div>
    </div>
  );
}

export default ConfirmarReserva;
