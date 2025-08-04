import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaHome, FaUserCircle, FaRoute, FaMoneyBill, FaQuestionCircle } from 'react-icons/fa';
import api from '../api/api';
import ImagenPerfil from '../pages/fotoPerfil';
import '../styles/MisGanancias.css';
import { useNotificacionesConductor } from '../hooks/useNotificacionesConductor';

const MisGanancias = () => {
  const [ganancias, setGanancias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const nuevasSolicitudes = useNotificacionesConductor();

  useEffect(() => {
    const fetchGanancias = async () => {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (!usuario?.id) return setError('Usuario no autenticado.');

      try {
        const res = await api.get(`/ganancia/conductor/${usuario.id}`);
        setGanancias(res.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar ganancias');
      } finally {
        setCargando(false);
      }
    };

    fetchGanancias();
  }, []);

  const totalGanancias = ganancias.reduce(
    (total, g) => total + parseFloat(g.ganancia_total),
    0
  );

  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="inicio-conductor-container">
      <header className="inicio-conductor-header">
        <div className="header-left">
          <h1 className="logo-text">loop</h1>
        </div>
        <div className="header-right">
          <div className="notificacion-wrapper">
            <FaBell className="icon-notification" />
            {nuevasSolicitudes.length > 0 && (
              <span className="notificacion-count">{nuevasSolicitudes.length}</span>
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
            <button className="nav-btn" onClick={() => navigate('/inicioConductor')}><FaHome className="nav-icon" /> Inicio</button>
            <button className="nav-btn"><FaRoute className="nav-icon" /> Mis Viajes</button>
            <button className="nav-btn active"><FaMoneyBill className="nav-icon" /> Mis Ganancias</button>
            <button className="nav-btn" onClick={() => navigate('/editarUsuario')}><FaUserCircle className="nav-icon" /> Editar Perfil</button>
            <button className="nav-btn"><FaQuestionCircle className="nav-icon" /> Ayuda</button>
          </nav>
        </aside>

        <main className="content-area-fixed">
          <div className="ganancias-container">
            <h2>Mis Ganancias</h2>
            {cargando && <p>Cargando ganancias...</p>}
            {error && <p className="error-text">{error}</p>}
            {!cargando && !error && ganancias.length === 0 && <p>No hay ganancias registradas.</p>}

            {!cargando && !error && ganancias.length > 0 && (
              <table className="ganancias-tabla">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Pasajeros</th>
                    <th>Precio Asiento (LPS)</th>
                    <th>Ganancia del Viaje (LPS)</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {ganancias.map((g, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{g.pasajeros}</td>
                      <td>L{parseFloat(g.precio_asiento).toFixed(2)}</td>
                      <td>L{parseFloat(g.ganancia_total).toFixed(2)}</td>
                      <td>{new Date(g.fecha_registro).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="total-row">
                    <td colSpan="3"><strong>Total Ganado:</strong></td>
                    <td colSpan="2"><strong>L{totalGanancias.toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MisGanancias;
