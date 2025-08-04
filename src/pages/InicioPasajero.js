import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaHome, FaRoute, FaQuestionCircle, FaSearch } from 'react-icons/fa';
import api from '../api/api';
import '../styles/InicioPasajero.css';
import ConfirmarReserva from '../pages/ConfirmarReserva';
import ImagenPerfil from '../pages/fotoPerfil';
import { useNotificaciones } from '../hooks/useNotificaciones';
import SnackbarNotificacion from '../pages/SnackbarNotificacion';
import ViajeAceptadoCard from '../pages/ViajeAceptadoCard';
import ModalCalificarConductor from '../pages/ModalCalificarConductor';

function InicioPasajero() {
  const [searchParams, setSearchParams] = useState({ destino: '' });
  const [viajesDisponibles, setViajesDisponibles] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [viajeAceptado, setViajeAceptado] = useState(null);
  const [notificaciones, setNotificaciones] = useState(0);
  const [snackbar, setSnackbar] = useState(null);
  const [mostrarModalCalificacion, setMostrarModalCalificacion] = useState(false);
  const [viajeParaCalificar, setViajeParaCalificar] = useState(null);

  const navigate = useNavigate();
  useNotificaciones(setViajeAceptado, setNotificaciones, setSnackbar);

  useEffect(() => {
  const obtenerViajes = async () => {
    try {
      const res = await api.get('/viajes/disponibles');
      if (Array.isArray(res.data.viajes)) {
        setViajesDisponibles(res.data.viajes);
      } else {
        setViajesDisponibles([]);
      }
    } catch (error) {
      console.error('Error al cargar viajes:', error);
      setViajesDisponibles([]);
    }
  };

  obtenerViajes();

  const interval = setInterval(obtenerViajes, 10000);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  console.log("Usuario:", usuario);

  const obtenerViajeAceptado = async () => {
    if (usuario?.id) {
      try {
        const res = await api.get(`/viajePasajero/pasajero/${usuario.id}/viaje-aceptado`);
        setViajeAceptado(res.data);
        console.log("Viaje Aceptado:", res.data);
      } catch (err) {
        console.error("Error al cargar viaje aceptado:", err);
        setViajeAceptado(null);
      }
    }
  };

  obtenerViajeAceptado();

  const intervalo = setInterval(obtenerViajeAceptado, 10000);

  return () => {
    clearInterval(interval);
    clearInterval(intervalo);
  };
}, []);


  const usuario = JSON.parse(localStorage.getItem("usuario"));

  console.log("Usuario:", usuario);

  const obtenerUltimoViajeFinalizado = async () => {
    if (usuario?.id) {
      try {
        const res = await api.get(`/pasajero/viaje-finalizado/${usuario.id}`);
        if (res.data && res.data.viaje) {
          const viaje = res.data.viaje;
          const calificacion = await verificarCalificacion(viaje.id, usuario.id, viaje.conductor.id, 'conductor');
          if (!calificacion.existe) {
            setViajeParaCalificar(viaje);
            setMostrarModalCalificacion(true);
          }
        }
      } catch (error) {
        console.error("Error al obtener el último viaje finalizado:", error);
      }
    }
  };

  useEffect(() => {
    obtenerUltimoViajeFinalizado();

    const intervalo = setInterval(obtenerUltimoViajeFinalizado, 10000);
    return () => clearInterval(intervalo);
  }, [usuario]);

  const verificarCalificacion = async (viajeId, calificadorId, calificadoId, tipo) => {
    try {
      const res = await api.get(`/verificar/${viajeId}/${calificadorId}/${calificadoId}/${tipo}`);
      return res.data;
    } catch (err) {
      console.error("Error al verificar la calificación:", err);
      return { existe: false, calificado: false };
    }
  };

  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const destino = searchParams.destino.trim();
    if (!destino) return;

    try {
      const res = await api.get(`/viajePasajero/buscar?q=${destino}`);
      setViajesDisponibles(res.data);
    } catch (error) {
      console.error('Error al buscar viajes:', error);
      setViajesDisponibles([]);
    }
  };

  const enviarCalificacion = async ({ viajeId, conductorId, rating, comentario }) => {
    try {
      await api.post('/calificacion', {
        viajeId,
        conductorId,
        calificadorId: JSON.parse(localStorage.getItem("usuario")).id,
        rating,
        comentario,
      });
      setMostrarModalCalificacion(false);
    } catch (error) {
      console.error("Error al enviar la calificación:", error);
    }
  };

  return (
    <div className="inicio-conductor-container">
      <header className="inicio-conductor-header">
        <div className="header-left">
          <h1 className="logo-text">loop</h1>
        </div>
        <div className="header-right">
          <div className="notification-icon-container">
            <FaBell className="icon-notification" />
            {notificaciones > 0 && (
              <span className="notification-count">{notificaciones}</span>
            )}
          </div>
          <ImagenPerfil
            id={JSON.parse(localStorage.getItem('usuario'))?.id}
            alt="Foto del conductor"
            className="avatar-circle"
          />
          <button className="logout-btn" onClick={handleCerrarSesion}>Cerrar sesión</button>
        </div>
      </header>

      <div className="main-content-container">
        <aside className="sidebar-fixed">
          <nav className="sidebar-nav">
            <button className="nav-btn active"><FaHome className="nav-icon" /> Inicio</button>
            <button className="nav-btn" onClick={() => navigate('/misviajespasajero')}>
              <FaRoute className="nav-icon" /> Mis Viajes
            </button>
            <button className="nav-btn" onClick={() => navigate('/editarUsuario')}><FaUserCircle className="nav-icon" /> Editar Perfil</button>
            <button className="nav-btn"><FaQuestionCircle className="nav-icon" /> Ayuda</button>
          </nav>
        </aside>

        <main className="content-area-fixed">
          <div className="pasajero-content">
            <div className="search-container">
              <h1 className="search-title">Buscar Viajes</h1>

              <form onSubmit={handleSearchSubmit} className="search-form-modern">
                <div className="search-bar-contenedor">
                  <div className="search-bar-wrapper">
                    <FaSearch className="search-bar-icon" />
                    <input
                      type="text"
                      name="destino"
                      value={searchParams.destino}
                      onChange={handleInputChange}
                      placeholder="¿A dónde vas?"
                      className="search-bar-input"
                    />
                  </div>
                  <button type="submit" className="search-bar-button-texto">Buscar</button>
                </div>
              </form>
            </div>

            {viajeAceptado && (
              <div className="viaje-en-curso-container">
                <ViajeAceptadoCard viaje={viajeAceptado} />
              </div>
            )}

            <div className="available-trips-container">
              <h2 className="trips-title">Viajes Disponibles</h2>

              <div className="trips-grid">
                {viajesDisponibles.length > 0 ? (
                  viajesDisponibles.map((viaje) => (
                    <div key={viaje.id} className="trip-card">
                      <div className="trip-header">
                        <div className="driver-info">
                          <ImagenPerfil id={viaje.conductor.id} className="driver-avatar" alt="Foto del conductor" />
                          <div className="driver-details">
                            <h3 className="driver-name">{viaje.conductor.nombre}</h3>
                            <div className="driver-rating">
                              <span className="rating-number">★ 4.7</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="trip-route">{viaje.origen} → {viaje.destino}</p>
                      <p className="trip-time">{viaje.hora_salida}</p>
                      <p className="trip-seats">
                        {viaje.asientos_disponibles} asiento{viaje.asientos_disponibles !== 1 ? 's' : ''} disponible{viaje.asientos_disponibles !== 1 ? 's' : ''}
                      </p>
                      <p className="trip-price">L.{viaje.precio_asiento}</p>

                      <button className="reserve-button" onClick={() => setReservaSeleccionada(viaje)}>
                        Reservar Viaje
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No hay viajes activos en este momento.</p>
                )}
              </div>

              <div className="footer-info">
                <div className="average-rating">
                  <p>Viajes esta semana <span>{viajesDisponibles.length}</span></p>
                  <p>Calificación promedio <span>4.7</span></p>
                </div>

                <div className="safety-tip">
                  <p>Consejo de Seguridad</p>
                  <p className="tip-text">Verifica siempre la placa del vehículo antes de abordar</p>
                </div>
              </div>
            </div>
          </div>

          {reservaSeleccionada && (
            <div className="confirmar-reserva-overlay">
              <ConfirmarReserva viaje={reservaSeleccionada} onClose={() => setReservaSeleccionada(null)} />
            </div>
          )}

          {mostrarModalCalificacion && viajeParaCalificar && (
            <ModalCalificarConductor
              conductor={viajeParaCalificar.conductor}
              onCerrar={() => setMostrarModalCalificacion(false)}
              onEnviarCalificacion={enviarCalificacion}
              viajeId={viajeParaCalificar.id}
            />
          )}

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

export default InicioPasajero;
