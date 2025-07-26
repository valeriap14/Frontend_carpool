import { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/ConfirmarReserva.css';
import ImagenPerfil from '../pages/fotoPerfil';

function ConfirmarReserva({ viaje, onClose }) {
  const [detalle, setDetalle] = useState(null);
  const [reservaEnviada, setReservaEnviada] = useState(false);

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

  const confirmarReserva = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const pasajero_id = usuario?.id;
      const mensaje = '¡Quiero unirme a tu viaje!';

      await api.post('/reservas/solicitar', {
        pasajero_id,
        viaje_id: viaje.id,
        mensaje
      });

      setReservaEnviada(true);
    } catch (error) {
      console.error('Error al enviar la reserva:', error);
      alert('Error al enviar la solicitud.');
    }
  };

  if (!detalle) return <p className="reserva-titulo">Cargando detalles...</p>;

  const conductor = detalle.Usuario;
  const vehiculo = conductor?.Vehiculo;

  return (
    <div className="reserva-container-overlay">
      <div className="reserva-card">
        <button className="cerrar-overlay-btn" onClick={onClose}>×</button>
        <h2 className="reserva-titulo">Confirmar Reserva</h2>

        <div className="reserva-conductor">
          <ImagenPerfil id={conductor.id} className="conductor-foto" alt={`${conductor.nombre} ${conductor.apellido}`} />

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

        <button className="confirmar-btn" onClick={confirmarReserva}>
          Confirmar Reserva
        </button>

        <p className="reserva-nota">Puedes cancelar sin cargos hasta 30 minutos antes del viaje.</p>
      </div>

      {reservaEnviada && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Solicitud enviada</h2>
            <p>Tu solicitud de reserva ha sido enviada con exito</p>
            <button
              className="btn cerrar-btn"
              onClick={() => {
                setReservaEnviada(false);
                onClose(); 
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmarReserva;
