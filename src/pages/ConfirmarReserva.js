import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ConfirmarReserva.css'; 

function ConfirmarReserva() {
  const location = useLocation();
  const navigate = useNavigate();
  const viaje = location.state?.viaje;

  if (!viaje) {
    return <p>No se encontró información del viaje.</p>;
  }

    function ConfirmarReserva({ viaje, onClose }) {
    if (!viaje) return null;

    return (
        <div className="reserva-container-overlay">
        <div className="reserva-card">
            <button className="cerrar-overlay-btn" onClick={onClose}>×</button>
            <h2 className="reserva-titulo">Confirmar Reserva</h2>
            ...
        </div>
        </div>
    );
    }


  return (
    <div className="reserva-container">
      <h2 className="reserva-titulo">Confirmar Reserva</h2>

      <div className="reserva-card">
        <div className="reserva-conductor">
          <img src={viaje.conductor.fotoPerfil || '/default-avatar.png'} alt="Conductor" className="conductor-foto" />
          <div className="conductor-info">
            <h3>{viaje.conductor.nombre}</h3>
            <p className="conductor-rating">4.7</p>
            <p className="verificado">Conductor verificado </p>
          </div>
        </div>

        <div className="reserva-detalle">
          <p><strong>Origen:</strong> {viaje.origen}</p>
          <p><strong>Destino:</strong> {viaje.destino}</p>
          <p><strong>Hora de salida:</strong> {viaje.hora_salida}</p>
          <p><strong>Asientos disponibles:</strong> {viaje.asientos_disponibles}</p>
          <p><strong>Precio por persona:</strong> L.{viaje.precio_asiento}</p>
          {viaje.descripcion && (
            <p className="reserva-descripcion">“{viaje.descripcion}”</p>
          )}
        </div>

        <div className="reserva-vehiculo">
          <h4>Información del vehículo</h4>
          <p><strong>Marca y modelo:</strong> {viaje.vehiculo?.marca_modelo || 'Toyota Corolla 2020'}</p>
          <p><strong>Placa:</strong> {viaje.vehiculo?.placa || 'HAA-1234'}</p>
          <p><strong>Color:</strong> {viaje.vehiculo?.color || 'Gris oscuro metálico'}</p>
        </div>

        <button className="confirmar-btn"> Confirmar Reserva</button>
        <p className="reserva-nota">Puedes cancelar sin cargos hasta 30 minutos antes del viaje.</p>
      </div>
    </div>
  );
}

export default ConfirmarReserva;
