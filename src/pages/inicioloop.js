import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaBars, FaTimes, FaSearch, FaCarSide, FaRoad } from 'react-icons/fa';
import '../styles/inicioloop.css';
import loopLogo from '../assets/loop.png'; 

function InicioLoop() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="inicio-loop-container">
      <header className="inicio-loop-header">
        <div className="inicio-loop-logo-container">
          <button className="inicio-loop-menu-btn" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <span className="inicio-loop-logo-text">loop</span>
        </div>

        <div className="inicio-loop-acciones-header">
          <FaBell className="inicio-loop-icono-notificacion" />
          <FaUserCircle className="inicio-loop-icono-usuario" />
          <button className="inicio-loop-cerrar-sesion" onClick={handleCerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="inicio-loop-contenido-principal">
        {sidebarOpen && (
          <aside className="inicio-loop-sidebar">
            <button className="inicio-loop-nav-item" onClick={() => navigate('/Viajes')}>
              <FaCarSide /> Publicar Viaje
            </button>
            <button className="inicio-loop-nav-item" onClick={() => navigate('/mis-viajes')}>
              <FaRoad /> Mis Viajes
            </button>
          </aside>
        )}

        <main className="inicio-loop-main-content">
          <div className="inicio-loop-buscador-container">
            <input
              type="text"
              placeholder="Buscar viajes..."
              className="inicio-loop-input-busqueda"
            />
            <FaSearch className="inicio-loop-icono-busqueda" />
          </div>

          <div className="inicio-loop-contenido-central">
            <img
              src={loopLogo}
              alt="Loop Logo"
              className="inicio-loop-imagen-central"
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default InicioLoop;
