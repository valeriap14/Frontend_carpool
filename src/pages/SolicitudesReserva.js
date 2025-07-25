import { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/SolicitudesReserva.css';

function SolicitudesReserva({ conductorId }) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarSolicitudes = async () => {
    try {
      const res = await api.get(`/reservas/conductor/${conductorId}`);
      const pendientes = res.data.filter(r => !r.estado || r.estado === 'pendiente');
      setSolicitudes(pendientes);
      setLoading(false);
    } catch (error) {
      console.error('Error cargando solicitudes:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarSolicitudes();
    // Opcional: cargar cada cierto tiempo para "actualizar"
    const interval = setInterval(cargarSolicitudes, 30000); // cada 30 seg
    return () => clearInterval(interval);
  }, []);

  const responderSolicitud = async (id, estado) => {
    try {
      await api.put(`/reservas/responder/${id}`, { estado });
      // Refrescar la lista después de responder
      cargarSolicitudes();
    } catch (error) {
      console.error('Error respondiendo solicitud:', error);
    }
  };

  if (loading) return <p>Cargando solicitudes...</p>;

  if (solicitudes.length === 0) return <p>No tienes solicitudes pendientes.</p>;

  return (
    <div className="solicitudes-container">
      <h2>Solicitudes de Reserva</h2>
      {solicitudes.map(solicitud => {
        const pasajero = solicitud.Usuario; 
        return (
          <div key={solicitud.id} className="solicitud-card">
            <img
              src={pasajero.fotoPerfil || '/default-avatar.png'}
              alt={`${pasajero.nombre} ${pasajero.apellido}`}
              className="foto-pasajero"
            />
            <div className="info-pasajero">
              <h3>{pasajero.nombre} {pasajero.apellido}</h3>
              <p>{solicitud.mensaje || 'Solicita unirse a tu viaje'}</p>
            </div>
            <div className="botones-respuesta">
              <button className="btn btn-aceptar" onClick={() => responderSolicitud(solicitud.id, 'aceptada')}>
                Aceptar
              </button>
              <button className="btn btn-rechazar" onClick={() => responderSolicitud(solicitud.id, 'rechazada')}>
                Rechazar
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SolicitudesReserva;
