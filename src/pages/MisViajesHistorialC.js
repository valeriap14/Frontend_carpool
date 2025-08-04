import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import ImagenPerfil from '../pages/fotoPerfil';
import { FaBell, FaHome, FaRoute, FaUserCircle, FaMoneyBill, FaQuestionCircle } from 'react-icons/fa';
import '../styles/MisViajesHistorialC.css';
import { useNotificaciones } from '../hooks/useNotificaciones';
import SnackbarNotificacion from '../pages/SnackbarNotificacion';

function MisViajesHistorialC() {
  const [viajes, setViajes] = useState([]);
  const [pasajerosPorViaje, setPasajerosPorViaje] = useState({});
  const [notificaciones, setNotificaciones] = useState(0);
  const [snackbar, setSnackbar] = useState(null);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  useNotificaciones(() => {}, setNotificaciones, setSnackbar);

  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const res = await api.get(`/viajes/conductor/finalizados/${usuario.id}`);
        setViajes(res.data.viajes || res.data); 
      } catch (error) {
        console.error("Error al obtener historial:", error);
      }
    };
    obtenerHistorial();
  }, [usuario.id]);

  const verPasajeros = async (viajeId) => {
    try {
      if (pasajerosPorViaje[viajeId]) {
        const nuevoEstado = { ...pasajerosPorViaje };
        delete nuevoEstado[viajeId];
        setPasajerosPorViaje(nuevoEstado);
      } else {
        const res = await api.get(`/viajes/pasajeros-finalizados/${viajeId}`);
        setPasajerosPorViaje(prev => ({
          ...prev,
          [viajeId]: res.data
        }));
      }
    } catch (error) {
      console.error("Error al obtener pasajeros:", error);
    }
  };

  return (
    <div className="inicio-conductor-container">
      <header className="inicio-conductor-header">
        <div className="header-left"><h1 className="logo-text">loop</h1></div>
        <div className="header-right">
          <div className="notification-icon-container">
            <FaBell className="icon-notification" />
            {notificaciones > 0 && (
              <span className="notification-count">{notificaciones}</span>
            )}
          </div>
          <ImagenPerfil id={usuario.id} className="avatar-circle" />
          <button className="logout-btn" onClick={() => navigate('/')}>Cerrar sesión</button>
        </div>
      </header>

      <div className="main-content-container">
        <aside className="sidebar-fixed">
          <nav className="sidebar-nav">
            <button className="nav-btn" onClick={() => navigate('/inicioconductor')}><FaHome className="nav-icon" />Inicio</button>
            <button className="nav-btn" onClick={() => navigate('/misviajesconductor')}> 
              <FaRoute className="nav-icon" /> Mis Viajes
            </button>
            <button className="nav-btn" onClick={() => navigate('/misganancias')}>
              <FaMoneyBill className="nav-icon" /> Mis Ganancias
            </button>
            <button className="nav-btn" onClick={() => navigate('/editarUsuario')}><FaUserCircle className="nav-icon" />Editar Perfil</button>
            <button className="nav-btn"><FaQuestionCircle className="nav-icon" />Ayuda</button>
          </nav>
        </aside>

        <main className="content-area-fixed">
          <h2 className="historial-title">Historial de Viajes como Conductor</h2>
          <div className="historial-list">
            {viajes.length > 0 ? (
              viajes.map(viaje => (
                <div key={viaje.id} className="historial-card">
                  <p><strong>Ruta:</strong> {viaje.origen} → {viaje.destino}</p>
                  <p><strong>Hora:</strong> {viaje.hora_salida}</p>
                  <p><strong>Descripción:</strong> {viaje.descripcion || 'Sin descripción'}</p>
                  <p><strong>Estado:</strong> {viaje.estado}</p>
                  <button className="btn-ver-pasajeros" onClick={() => verPasajeros(viaje.id)}>
                    {pasajerosPorViaje[viaje.id] ? 'Ocultar Pasajeros' : 'Ver Pasajeros'}
                  </button>

                  {pasajerosPorViaje[viaje.id] && (
                    <div className="pasajeros-lista">
                      <p><strong>Pasajeros:</strong></p>
                      <ul>
                        {pasajerosPorViaje[viaje.id].length > 0 ? (
                          pasajerosPorViaje[viaje.id].map(p => (
                            <li key={p.id}>
                              {p.nombre} {p.apellido}
                            </li>
                          ))
                        ) : (
                          <li>No hubo pasajeros.</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No hay viajes anteriores.</p>
            )}
          </div>

          {snackbar && (
            <SnackbarNotificacion
              mensaje={snackbar.mensaje}
              tipo={snackbar.tipo}
              onClose={() => setSnackbar(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default MisViajesHistorialC;
