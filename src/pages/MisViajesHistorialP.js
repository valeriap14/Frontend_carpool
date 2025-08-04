import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaHome, FaUserCircle, FaRoute, FaQuestionCircle } from 'react-icons/fa';
import api from '../api/api';
import ImagenPerfil from '../pages/fotoPerfil';
import '../styles/MisGanancias.css';  // Mismo CSS para mantener estilos iguales
import { useNotificacionesConductor } from '../hooks/useNotificacionesConductor';
import SnackbarNotificacion from '../pages/SnackbarNotificacion';

const MisViajesHistorialP = () => {
  const [viajes, setViajes] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const [notificaciones, setNotificaciones] = useState(0);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  
  // Aquí puedes usar el hook de notificaciones que uses, por ejemplo:
  const nuevasNotificaciones = useNotificacionesConductor(); 
  // O si quieres el tuyo, igual lo usas y ajustas el setNotificaciones para mostrar contador

  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const res = await api.get(`/viajePasajero/pasajero/finalizados/${usuario.id}`);
        setViajes(res.data.viajes || []);
      } catch (error) {
        console.error("Error al obtener historial del pasajero:", error);
        setSnackbar({ mensaje: "Error cargando historial", tipo: "error" });
      }
    };
    obtenerHistorial();
  }, [usuario.id]);

  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="inicio-conductor-container"> {/* Mismo container para estilos sidebar */}
      <header className="inicio-conductor-header"> {/* Mismo header */}
        <div className="header-left">
          <h1 className="logo-text">loop</h1>
        </div>
        <div className="header-right">
          <div className="notificacion-wrapper">
            <FaBell className="icon-notification" />
            {(nuevasNotificaciones.length || notificaciones) > 0 && (
              <span className="notificacion-count">
                {nuevasNotificaciones.length || notificaciones}
              </span>
            )}
          </div>
          <ImagenPerfil
            id={usuario?.id}
            alt="Foto del usuario"
            className="avatar-circle"
          />
          <button className="logout-btn" onClick={handleCerrarSesion}>Cerrar sesión</button>
        </div>
      </header>

      <div className="main-content-container">
        <aside className="sidebar-fixed">
          <nav className="sidebar-nav">
            <button className="nav-btn" onClick={() => navigate('/iniciopasajero')}>
              <FaHome className="nav-icon" /> Inicio
            </button>
            <button className="nav-btn active">
              <FaRoute className="nav-icon" /> Mis Viajes
            </button>
            <button className="nav-btn" onClick={() => navigate('/editarUsuario')}>
              <FaUserCircle className="nav-icon" /> Editar Perfil
            </button>
            <button className="nav-btn">
              <FaQuestionCircle className="nav-icon" /> Ayuda
            </button>
          </nav>
        </aside>

        <main className="content-area-fixed">
          <div className="ganancias-container" style={{ maxWidth: '800px' }}> 
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Historial de Viajes</h2>
            {viajes.length === 0 && <p>No has realizado viajes aún.</p>}
            {viajes.length > 0 && (
              <div>
                {viajes.map((viaje) => (
                  <div key={viaje.id} className="historial-card" style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '1.25rem 1.5rem',
                    border: '1px solid #d1d5db',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                    marginBottom: '1rem'
                  }}>
                    <p><strong>Ruta:</strong> {viaje.origen} → {viaje.destino}</p>
                    <p><strong>Hora:</strong> {viaje.hora_salida}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                      <p><strong>Conductor:</strong> {viaje.conductor?.nombre} {viaje.conductor?.apellido}</p>
                      <ImagenPerfil
                        id={viaje.conductor?.id}
                        alt="Foto del conductor"
                        className="avatar-circle"
                        style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #3498db' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
};

export default MisViajesHistorialP;
