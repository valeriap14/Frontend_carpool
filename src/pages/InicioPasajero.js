import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaHome, FaHistory, FaStar, FaQuestionCircle, FaSearch } from 'react-icons/fa';
import '../styles/InicioPasajero.css';

function InicioPasajero() {
  const [searchParams, setSearchParams] = useState({
    destino: '',
    horario: 'Ahora'
  });
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Buscando viajes con:', searchParams);
  };
  
  const viajesDisponibles = [
    {
      id: 1,
      conductor: 'Carlos Mendoza',
      rating: 4.8,
      ruta: 'Col. Palmira → Centro Comercial Multiplaza',
      hora: '7:30 AM',
      asientos: 3,
      precio: 'L.50'
    },
    {
      id: 2,
      conductor: 'Roberto Silva',
      rating: 4.9,
      ruta: 'Residencial El Trapiche → City Mall',
      hora: '9:00 AM',
      asientos: 1,
      precio: 'L.40'
    },
    {
      id: 3,
      conductor: 'María González',
      rating: 4.2,
      ruta: 'UNAH → Mall Premier',
      hora: '8:15 AM',
      asientos: 2,
      precio: 'L.45'
    },
    {
      id: 4,
      conductor: 'Ana López',
      rating: 4.6,
      ruta: 'Col. Kennedy → Aeropuerto Toncontín',
      hora: '10:30 AM',
      asientos: 2,
      precio: 'L.50'
    }
  ];

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
              
              <form onSubmit={handleSearchSubmit} className="search-form">
                <div className="form-row">
                  <div className="form-group">
                    <h2>Destino o Dirección</h2>
                    <input 
                      type="text" 
                      name="destino" 
                      value={searchParams.destino}
                      onChange={handleInputChange}
                      placeholder="A dónde vas?"
                      className="search-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <h2>Rango de Horario</h2>
                    <select 
                      name="horario" 
                      value={searchParams.horario}
                      onChange={handleInputChange}
                      className="time-select"
                    >
                      <option value="Ahora">Ahora</option>
                      <option value="Mañana">Mañana</option>
                      <option value="Tarde">Tarde</option>
                    </select>
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <label className="checkbox-option">
                      <input 
                        type="checkbox" 
                        name="soloDisponibles" 
                        checked={true}
                        onChange={() => {}}
                      />
                      <span>Solo viajes disponibles</span>
                    </label>
                  </div>
                  
                  <button type="submit" className="search-button">
                    <FaSearch className="search-icon" /> Buscar Viajes
                  </button>
                </div>
              </form>
            </div>
            
            <div className="available-trips-container">
              <h2 className="trips-title">Viajes Disponibles</h2>
              
              <div className="trips-grid">
                {viajesDisponibles.map((viaje) => (
                  <div key={viaje.id} className="trip-card">
                    <div className="trip-header">
                      <h3 className="driver-name">{viaje.conductor}</h3>
                      <div className="driver-rating">
                        <span className="rating-number">+{viaje.rating}</span>
                      </div>
                    </div>
                    
                    <p className="trip-route">{viaje.ruta}</p>
                    <p className="trip-time">{viaje.hora}</p>
                    <p className="trip-seats">{viaje.asientos} asiento{viaje.asientos !== 1 ? 's' : ''} disponible{viaje.asientos !== 1 ? 's' : ''}</p>
                    <p className="trip-price">{viaje.precio}</p>
                    
                    <button className="reserve-button">Reservar Viaje</button>
                  </div>
                ))}
              </div>
              
              <div className="footer-info">
                <div className="average-rating">
                  <p>Viajes esta semana <span>12</span></p>
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