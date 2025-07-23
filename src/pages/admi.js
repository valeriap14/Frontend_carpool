
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaHome, FaHistory, FaStar, FaQuestionCircle } from 'react-icons/fa';
import '../styles/MenuAdmi.css';


function MenuAdmi({ children }){
    const navigate = useNavigate();
    

    const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/');
     };

        return(

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
            <button className="nav-btn active" onClick={() => navigate('/InicioAdmi')}><FaHome className="nav-icon" /> Inicio</button>
            <button className="nav-btn" onClick={() => navigate('/Admi/HistoriaPasajeros')}><FaHistory className="nav-icon" /> Historial pasajeros</button>
            <button className="nav-btn" onClick={() => navigate('/Admi/HistorialConductor')}><FaQuestionCircle className="nav-icon" /> Historial conductores</button>
            <button className="nav-btn" onClick={() => navigate('/Admi/Pasajero')}><FaUserCircle className="nav-icon" /> Pasajero</button>
            <button className="nav-btn" onClick={() => navigate('/Admi/Conductor')}><FaUserCircle className="nav-icon" /> Conductores</button>
            <button className="nav-btn" onClick={() => navigate('/Admi/Usuario')}>< FaStar className="nav-icon"/> Crear usuario</button>
          </nav>
        </aside>

        <div className="contenido-padre">
          {children}
        </div>


        </div> 
         </div>

        );


}
export default MenuAdmi;