import '../styles/Inicio.css';
import { useNavigate } from 'react-router-dom';
import loopLogo from '../assets/loop-logo.png';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">loop</div>
          <nav className="nav-desktop">
            <a href="#" className="nav-link" onClick={() => navigate('/')}>
              Inicio
            </a>
            <a href="#" className="nav-link">
              Sobre nosotros
            </a>
            <a href="#" className="nav-link" onClick={() => navigate('/login')}>
              Iniciar Sesión
            </a>
            <a href="#" className="nav-link" onClick={() => navigate('/registrarusuario')}>
              Registro
            </a>
          </nav>
          <button className="menu-button">
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-grid">
          {/* Left Side - Welcome Section */}
          <div className="welcome-section">
            <div className="logo-container">
              {loopLogo ? (
                <img
                  src={loopLogo || "/placeholder.svg"}
                  alt="Loop Logo"
                  className="loop-logo-img"
                />
              ) : (
                <div className="loop-logo">
                  <span className="logo-text">l</span>
                  <div className="logo-circle circle-1"></div>
                  <div className="logo-circle circle-2"></div>
                  <span className="logo-text">p</span>
                </div>
              )}
            </div>

            <h1 className="welcome-title">BIENVENIDO</h1>

            <div className="button-container">
              <button
                className="btn btn-login"
                onClick={() => navigate('/login')}
              >
                Iniciar sesión
              </button>
            </div>

            <p className="register-text">¿No tienes una cuenta?</p>

            <button
              className="btn btn-register"
              onClick={() => navigate('/registrarusuario')}
            >
              Registrarse
            </button>
          </div>

          {/* Right Side - Mobile Mockups */}
          <div className="mockups-container">
            {/* New Left Phone */}
            <div className="phone phone-0">
              <div className="phone-notch"></div>
              <div className="phone-content">
                <div className="location-icon">
                  <div className="pin"></div>
                </div>
                <h2 className="phone-text">
                  Cada Trayecto<br />
                  una conexión<br />
                  segura
                </h2>
              </div>
            </div>

            {/* First Phone */}
            <div className="phone phone-1">
              <div className="phone-notch"></div>
              <div className="phone-content">
                <div className="location-icon">
                  <div className="pin"></div>
                </div>
                <h2 className="phone-text">
                  Comienza a<br />
                  navegar<br />
                  seguro
                </h2>
              </div>
            </div>

            {/* Second Phone */}
            <div className="phone phone-2">
              <div className="phone-notch phone-notch-small"></div>
              <div className="phone-content">
                <div className="location-icon location-icon-small">
                  <div className="pin pin-small"></div>
                </div>
                <h2 className="phone-text phone-text-small">
                  Conecta entre<br />
                  estudiantes
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
