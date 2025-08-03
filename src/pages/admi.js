
import { useNavigate , useLocation} from 'react-router-dom';
import {  FaUserCircle, FaHome,  FaStar, FaQuestionCircle } from 'react-icons/fa';
import '../styles/MenuAdmi.css';


function MenuAdmi({ children }){
    const navigate = useNavigate();
     const location = useLocation();
    
    const activo = (path) => location.pathname === path;

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
         
          <button className="logout-btn" onClick={handleCerrarSesion}>Cerrar sesión</button>
        </div>
      </header>

      <div className="main-content-container">
        <aside className="sidebar-fixed">
          <nav className="sidebar-nav">
            <button className={`nav-btn ${activo('/InicioAdmi') ? 'active' : ''}`} 
            onClick={() => navigate('/InicioAdmi')}>
              <FaHome className="nav-icon" /> Inicio</button>

            <button className={`nav-btn ${activo('/Admi/HistorialViajes') ? 'active' : ''}`}
            onClick={() => navigate('/Admi/HistorialViajes')}>
              <FaQuestionCircle className="nav-icon" /> Viajes General </button>

            <button className={`nav-btn ${activo('/Admi/UsuariosInactivos') ? 'active' : ''}`}
            onClick={() => navigate('/Admi/UsuariosInactivos')}>
              <FaStar className="nav-icon" /> Usuarios Inactivos</button>

            <button className={`nav-btn ${activo('/Admi/Pasajero') ? 'active' : ''}`} 
             onClick={() => navigate('/Admi/Pasajero')}>
              <FaUserCircle className="nav-icon" /> Pasajero</button>

            <button className={`nav-btn ${activo('/Admi/Conductor') ? 'active' : ''}`} 
            onClick={() => navigate('/Admi/Conductor')}>
              <FaUserCircle className="nav-icon" /> Conductores</button>

            <button className={`nav-btn ${activo('/Admi/HistorialReserva') ? 'active' : ''}`}  
            onClick={() => navigate('/Admi/HistorialReserva')}>
              < FaStar className="nav-icon"/> Reserva</button>
              
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