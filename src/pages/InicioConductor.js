import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaBell, FaUserCircle, FaBars, FaTimes,FaCar, FaHome, FaRoute, FaMoneyBill, FaQuestionCircle} from 'react-icons/fa';
import '../styles/InicioConductor.css';

function InicioConductor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [viajeData, setViajeData] = useState({
    destino: '',
    horaSalida: 'Ahora',
    asientos: 3,
    precio: 45.00,
    descripcion: ''
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleModal = () => setShowModal(!showModal);

  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setViajeData({ ...viajeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Viaje activado:', viajeData);
    toggleModal();
  };

  return (
    <div className="inicio-conductor-container">
      {/* Header */}
      <header className="inicio-conductor-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="logo-text">loop</h1>
        </div>
        <div className="header-right">
          <FaBell className="icon-notification" />
          <FaUserCircle className="icon-profile" />
          <button className="logout-btn" onClick={handleCerrarSesion}>Cerrar sesión</button>
        </div>
      </header>

      {/* Main layout */}
      <div className="main-content-container">
        {sidebarOpen && (
          <aside className="sidebar">
            <nav className="sidebar-nav">
              <button className="nav-btn active"><FaHome className="nav-icon" /> Inicio</button>
              <button className="nav-btn-activar" onClick={toggleModal}><FaCar className="nav-icon" /> Activar Viaje</button>
              <button className="nav-btn"><FaRoute className="nav-icon" /> Mis Viajes</button>
              <button className="nav-btn"><FaMoneyBill className="nav-icon" /> Mis Ganancias</button>
              <button className="nav-btn"  onClick={() => navigate('/editarUsuario')}><FaUserCircle className="nav-icon" /> Editar Perfil</button>
              <button className="nav-btn"><FaQuestionCircle className="nav-icon" /> Ayuda</button>
            </nav>
          </aside>
        )}

        <main className="content-area-fixed">
          {/* Contenido principal */}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Loop</h2>
              <h3>¿Hacia Dónde Te Diriges?</h3>
              <button className="close-modal" onClick={toggleModal}><FaTimes /></button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <h4>Activar Viaje</h4>
                <div className="destino-options">
                  <label className="destino-option">
                    <input type="radio" name="destino" value="Hacia la Universidad" onChange={handleInputChange} required />
                    <span>Hacia la Universidad</span>
                  </label>
                  <label className="destino-option">
                    <input type="radio" name="destino" value="Hacia Casa" onChange={handleInputChange} />
                    <span>Hacia Casa</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <h4>Hora Aproximada de Salida</h4>
                <div className="hora-options">
                  <label className="hora-option">
                    <input type="radio" name="horaSalida" value="Ahora" checked={viajeData.horaSalida === 'Ahora'} onChange={handleInputChange} />
                    <span>Ahora</span>
                  </label>
                  <label className="hora-option">
                    <input type="radio" name="horaSalida" value="En 5 minutos" checked={viajeData.horaSalida === 'En 5 minutos'} onChange={handleInputChange} />
                    <span>En 5 minutos</span>
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Asientos Disponibles</label>
                  <input type="number" name="asientos" value={viajeData.asientos} onChange={handleInputChange} min="1" max="10" className="number-input" />
                </div>
                <div className="form-group">
                  <label>Precio por Asiento (LPS)</label>
                  <input type="number" name="precio" value={viajeData.precio} onChange={handleInputChange} min="1" step="0.01" className="number-input" />
                </div>
              </div>

              <div className="form-group">
                <label>Descripción Opcional</label>
                <textarea name="descripcion" value={viajeData.descripcion} onChange={handleInputChange} placeholder="Ej. Paso por el Estadio" className="descripcion-input" />
              </div>

              <div className="modal-actions">
                <button type="submit" className="confirm-btn">Confirmar y Activar Viaje</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InicioConductor;
