import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBell, FaUserCircle, FaBars, FaTimes, FaCar,
  FaHome, FaRoute, FaMoneyBill, FaQuestionCircle
} from 'react-icons/fa';
import '../styles/InicioConductor.css';
import loopLogo from '../assets/loop.png';
import MapaRuta from './MapaRuta';
import api from '../api/api'; 




function InicioConductor() {
  const [showModal, setShowModal] = useState(false);
  const [showDireccionModal, setShowDireccionModal] = useState(false);
  const [direccion, setDireccion] = useState('');
  const [viajeActivo, setViajeActivo] = useState(false);
  const [viajeData, setViajeData] = useState({
    destino: '',
    horaSalida: 'Ahora',
    asientos: 1,
    precio: 10,
    descripcion: ''
  });

  const navigate = useNavigate();

  // Mostrar modal si no tiene dirección casa
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario && (!usuario.Ruta|| !usuario.Ruta.direccion_casa)) {
      setShowDireccionModal(true);
    }
  }, []);


  const guardarDireccion = async () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!direccion.trim()) return alert("La dirección no puede estar vacía");

  try {
    await api.post('/ruta', {
      usuario_id: usuario.id,
      direccion_casa: direccion
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    usuario.direccion_casa = direccion;
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setShowDireccionModal(false);
  } catch (error) {
    console.error("Error al guardar dirección:", error);
    alert("Ocurrió un error al guardar la dirección.");
  }
};
  

  const toggleModal = () => setShowModal(!showModal);

  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'asientos') {
      const numValue = Number(value);
      if (numValue < 1 || numValue > 3) return;
      setViajeData({ ...viajeData, [name]: numValue });
    } else if (name === 'precio') {
      const intValue = parseInt(value, 10);
      if (isNaN(intValue) || intValue < 1) return;
      setViajeData({ ...viajeData, [name]: intValue });
    } else {
      setViajeData({ ...viajeData, [name]: value });
    }
  };



  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validaciones básicas
  if (viajeData.asientos < 1 || viajeData.asientos > 3) {
    alert('Los asientos deben estar entre 1 y 3.');
    return;
  }

  if (!viajeData.destino) {
    alert('Por favor selecciona un destino.');
    return;
  }

  if (!Number.isInteger(viajeData.precio) || viajeData.precio < 1) {
    alert('El precio debe ser un número entero positivo.');
    return;
  }

  // Obtener usuario y token desde localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");

  if (!usuario || !usuario.id) {
    alert("Usuario no autenticado.");
    return;
  }

  try {
    // Preparar el cuerpo de la petición
    const body = {
      direccion_seleccionada: viajeData.destino === 'Hacia la Universidad'
        ? 'hacia_universidad'
        : 'hacia_casa',
      hora_salida: viajeData.horaSalida.toLowerCase().replace(/\s/g, '_'), // "ahora" o "en_5_minutos"
      asientos_disponibles: viajeData.asientos,
      precio_asiento: viajeData.precio,
      descripcion: viajeData.descripcion,
      conductor_id: usuario.id
    };

    // Enviar solicitud al backend
    const response = await api.post('/viajes', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Éxito
    console.log(' Viaje creado:', response.data);
    alert(' Viaje activado correctamente');

    setViajeActivo(true);
    toggleModal(); // Cierra el modal

  } catch (error) {
    console.error(' Error al crear viaje:', error.response?.data || error.message);
    alert(' Error al crear viaje: ' + (error.response?.data?.error || error.message));
  }
};

  const desactivarViaje = () => {
    setViajeActivo(false);
    setViajeData({
      destino: '',
      horaSalida: 'Ahora',
      asientos: 1,
      precio: 10,
      descripcion: ''
    });
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

      {/* Layout principal */}

      <div className="main-content-container">
        <aside className="sidebar-fixed">
          <nav className="sidebar-nav">
            <button
              className="nav-btn-activar"
              onClick={() => {
                if (viajeActivo) {
                  desactivarViaje();
                } else {
                  toggleModal();
                }
              }}
              style={{ backgroundColor: viajeActivo ? '#FF7177' : '#a1dab4' }}
            >
              <FaCar className="nav-icon" />
              {viajeActivo ? 'Finalizar Viaje' : 'Iniciar Viaje'}
            </button>


            <button className="nav-btn active"><FaHome className="nav-icon" /> Inicio</button>
            <button className="nav-btn"><FaRoute className="nav-icon" /> Mis Viajes</button>
            <button className="nav-btn"><FaMoneyBill className="nav-icon" /> Mis Ganancias</button>
            <button className="nav-btn" onClick={() => navigate('/editarUsuario')}><FaUserCircle className="nav-icon" /> Editar Perfil</button>
            <button className="nav-btn"><FaQuestionCircle className="nav-icon" /> Ayuda</button>
          </nav>
        </aside>


        <main className="content-area-fixed">
          <MapaRuta
            origen={viajeData.destino === 'Hacia la Universidad' ? 'Colonia San Miguel, Tegucigalpa' : 'Ciudad Universitaria, Tegucigalpa'}
            destino={viajeData.destino === 'Hacia la Universidad' ? 'Ciudad Universitaria, Tegucigalpa' : 'Colonia San Miguel, Tegucigalpa'}
          />
        </main>
      </div>

      {/* Modal Activar Viaje */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Loop</h2>
              <h3>¿Hacia Dónde Te Diriges?</h3>
              <button className="close-modal" onClick={toggleModal}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <h4>Activar Viaje</h4>
                <div className="destino-options">
                  <label className="destino-option">
                    <input type="radio"
                      name="destino"
                      value="Hacia la Universidad"
                      onChange={handleInputChange}
                      required
                      checked={viajeData.destino === 'Hacia la Universidad'} />
                    <span>Hacia la Universidad</span>
                  </label>
                  <label className="destino-option">
                    <input type="radio"
                      name="destino"
                      value="Hacia Casa"
                      onChange={handleInputChange}
                      checked={viajeData.destino === 'Hacia Casa'} />
                    <span>Hacia Casa</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <h4>Hora Aproximada de Salida</h4>
                <div className="hora-options">
                  <label className="hora-option">
                    <input type="radio"
                      name="horaSalida"
                      value="Ahora"
                      checked={viajeData.horaSalida === 'Ahora'}
                      onChange={handleInputChange} />
                    <span>Ahora</span>
                  </label>
                  <label className="hora-option">
                    <input type="radio"
                      name="horaSalida"
                      value="En 5 minutos"
                      checked={viajeData.horaSalida === 'En 5 minutos'}
                      onChange={handleInputChange} />
                    <span>En 5 minutos</span>
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Asientos Disponibles</label>
                  <input type="number"
                    name="asientos"
                    value={viajeData.asientos}
                    onChange={handleInputChange}
                    min="1" max="3"
                    className="number-input" />
                </div>
                <div className="form-group">
                  <label>Precio por Asiento (LPS)</label>
                  <input type="number"
                    name="precio"
                    value={viajeData.precio}
                    onChange={handleInputChange}
                    min="1"
                    className="number-input" />
                </div>
              </div>

              <div className="form-group">
                <label>Descripción Opcional</label>
                <textarea
                  name="descripcion"
                  value={viajeData.descripcion}
                  onChange={handleInputChange}
                  className="descripcion-input"
                  placeholder="Ej. Paso por el Estadio"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="confirm-btn">
                  {viajeActivo ? 'Actualizar Viaje' : 'Confirmar y Activar Viaje'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Dirección */}
      {showDireccionModal && (
        <div className="modal-overlay">
          <div className="direccion-modal">

             {/* Botón X para cerrar */}
      <button
        className="close-btn"
        onClick={() => setShowDireccionModal(false)}
      >
        &times;
      </button>
            <img src={loopLogo} alt="Loop Logo" className="direccion-logo" />
            <h2 className="direccion-title">Bienvenido</h2>
            <h4>Crea tu ruta</h4>
            <p className="direccion-subtitle">Ingresa la Dirección de tu Domicilio</p>
            <input
              type="text"
              placeholder="Ejm: Residencial Honduras"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="direccion-input"
            />
            <button className="confirm-btn" onClick={guardarDireccion}>
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InicioConductor;
