import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBell, FaUserCircle, FaHome, FaHistory,
  FaStar, FaQuestionCircle, FaSearch
} from 'react-icons/fa';
import api from '../api/api';
import '../styles/InicioPasajero.css';

function InicioPasajero() {
  const [searchParams, setSearchParams] = useState({
    destino: ''
  });

  const [viajesDisponibles, setViajesDisponibles] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Buscar viajes con:', searchParams);
  };

  return (
    <div className="inicio-conductor-container">
      <header className="inicio-conductor-header">
        <div className="header-left">
          <h1 className="logo-text">loop</h1>
        </div>
        <div className="header-right">
          <FaBell className="icon-notification" />
          <FaUserCircle className="icon-profile" />
          <button className="logout-btn" onClick={handleCerrarSesion}>Cerrar sesión</button>
        </div>
      </header>

      <div className="main-content-container">
        <aside className="sidebar-fixed">
          <nav className="sidebar-nav">
            <button className="nav-btn active"><FaHome className="nav-icon" /> Inicio</button>
            <button className="nav-btn"><FaHistory className="nav-icon" /> Viajes Reservados</button>
            <button className="nav-btn"><FaStar className="nav-icon" /> Historial de Viajes</button>
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

            <div className="available-trips-container">
              <h2 className="trips-title">Viajes Disponibles</h2>

              <div className="trips-grid">
                {viajesDisponibles.length > 0 ? (
                  viajesDisponibles.map((viaje) => (
                    <div key={viaje.id} className="trip-card">
                      <div className="trip-header">
                        <img src={viaje.conductor.fotoPerfil || '/default-avatar.png'} alt="Conductor" className="driver-avatar" />
                        <div>
                          <h3 className="driver-name">{viaje.conductor.nombre}</h3>
                          <div className="driver-rating">
                            <span className="rating-number">★ 4.7</span>
                          </div>
                        </div>
                      </div>

                      <p className="trip-route">{viaje.origen} → {viaje.destino}</p>
                      <p className="trip-time">{viaje.hora_salida}</p>
                      <p className="trip-seats">{viaje.asientos_disponibles} asiento{viaje.asientos_disponibles !== 1 ? 's' : ''} disponible{viaje.asientos_disponibles !== 1 ? 's' : ''}</p>
                      <p className="trip-price">L.{viaje.precio_asiento}</p>

                      <button className="reserve-button">Reservar Viaje</button>
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
        </main>
      </div>
    </div>
  );
}

export default InicioPasajero;

