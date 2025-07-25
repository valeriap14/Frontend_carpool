import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaBell, FaUserCircle, FaCar,FaHome, FaRoute, FaMoneyBill, FaQuestionCircle} from 'react-icons/fa';
import '../styles/InicioConductor.css';
import loopLogo from '../assets/loop.png';
import MapaRuta from './MapaRuta';
import api from '../api/api';   
import CardViajeEnCurso from '../pages/CardViajeEnCurso';
import SolicitudesReserva from './SolicitudesReserva';

function InicioConductor() {
  const [showModal, setShowModal] = useState(false);
  const [showDireccionModal, setShowDireccionModal] = useState(false);
  const [direccion, setDireccion] = useState('');
  const [viajeActivo, setViajeActivo] = useState(false);
  const [viajeData, setViajeData] = useState({
    destino: '',
    horaSalida: 'Ahora',
    asientos: 1,
    precio: '10',
    descripcion: ''
  });
  const [errors, setErrors] = useState({}); 
  const [datosViajeActual, setDatosViajeActual] = useState(null); 

  const navigate = useNavigate();

  const sincronizarViajeActivo = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario?.id) {
      setViajeActivo(false);
      setDatosViajeActual(null);
      localStorage.removeItem("viaje_id");
      return;
    }

    try {
      const response = await api.get(`/viajes/activo/${usuario.id}`);
      if (response.data?.viaje) {
        setViajeActivo(true);
        setDatosViajeActual(response.data.viaje);
        localStorage.setItem("viaje_id", response.data.viaje.id);
      } else {
        setViajeActivo(false);
        setDatosViajeActual(null);
        localStorage.removeItem("viaje_id");
      }
    } catch (error) {
      console.error("Error al sincronizar viaje activo:", error);
      setViajeActivo(false);
      setDatosViajeActual(null);
      localStorage.removeItem("viaje_id");
    }
  };

  useEffect(() => {
    sincronizarViajeActivo();

    const obtenerRutaUsuario = async () => {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const token = localStorage.getItem("token");

      try {
        const response = await api.get(`/ruta/usuario/${usuario.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.data || !response.data.direccion_casa?.trim()) {
          setShowDireccionModal(true);
        } else {
          setShowDireccionModal(false);
        }

      } catch (error) {
        console.error("Error al verificar dirección:", error);
        setShowDireccionModal(true);
      }
    };
    obtenerRutaUsuario();
  }, []);

  const verificarViajeActivo = async () => {
    await sincronizarViajeActivo();
    if (viajeActivo) {
      alert('Ya tienes un viaje activo. Por favor finalízalo antes de crear uno nuevo.');
      return true;
    }
    return false;
  };

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

      setShowDireccionModal(false);
    } catch (error) {
      console.error("Error al guardar dirección:", error);
      alert("Ocurrió un error al guardar la dirección.");
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setErrors({}); 
  };

  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setErrors(prev => ({ ...prev, [name]: '' }));

    if (name === 'asientos') {
      const numValue = Number(value);
      if (numValue < 1 || numValue > 3) return;
      setViajeData({ ...viajeData, [name]: numValue });
    } else if (name === 'precio') {
      if (value === '' || /^[0-9]+$/.test(value)) {
        setViajeData({ ...viajeData, [name]: value });
      }
    } else {
      setViajeData({ ...viajeData, [name]: value });
    }
  };

  const validarFormulario = () => {
    let nuevosErrores = {};

    if (!viajeData.destino) {
      nuevosErrores.destino = 'Por favor selecciona un destino.';
    }

    if (viajeData.asientos < 1 || viajeData.asientos > 3) {
      nuevosErrores.asientos = 'Los asientos deben estar entre 1 y 3.';
    }

    const precioEntero = parseInt(viajeData.precio, 10);
    if (isNaN(precioEntero) || precioEntero < 10 || precioEntero > 500) {
      nuevosErrores.precio = 'La tarifa debe ser entre 10 y 500 LPS.';
    }

    setErrors(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tieneViajeActivo = await verificarViajeActivo();
    if (tieneViajeActivo) return;

    if (!validarFormulario()) {
      return; 
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");

    if (!usuario || !usuario.id) {
      alert("Usuario no autenticado.");
      return;
    }

    try {
      const body = {
        direccion_seleccionada: viajeData.destino === 'Hacia la Universidad'
          ? 'hacia_universidad'
          : 'hacia_casa',
        hora_salida: viajeData.horaSalida.toLowerCase().replace(/\s/g, '_'),
        asientos_disponibles: viajeData.asientos,
        precio_asiento: parseInt(viajeData.precio, 10),
        descripcion: viajeData.descripcion,
        conductor_id: usuario.id
      };

      const response = await api.post('/viajes', body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const id = response.data.viaje.id;
      localStorage.setItem("viaje_id", id);
      setViajeActivo(true);
      setDatosViajeActual(response.data.viaje); 
      toggleModal();
      alert('Viaje activado correctamente');
    } catch (error) {
      console.error('Error al crear viaje:', error.response?.data || error.message);
      alert('Error al crear viaje: ' + (error.response?.data?.error || error.message));
    }
  };

  const finalizarViaje = async () => {
    try {
      const token = localStorage.getItem("token");
      const viajeId = localStorage.getItem("viaje_id");

      if (!viajeId) {
        alert("ID del viaje no encontrado.");
        return;
      }

      await api.put(`/viajes/finalizar/${viajeId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setViajeActivo(false);
      setViajeData({
        destino: '',
        horaSalida: 'Ahora',
        asientos: 1,
        precio: '10',
        descripcion: ''
      });
      setDatosViajeActual(null); 
      localStorage.removeItem("viaje_id");
      alert('Viaje finalizado correctamente');
    } catch (error) {
      console.error('Error al finalizar viaje:', error.response?.data || error.message);
      alert('Error al finalizar viaje: ' + (error.response?.data?.error || error.message));
    }
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
            <button
              className="nav-btn-activar"
              onClick={() => {
                if (viajeActivo) {
                  finalizarViaje();
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
          {datosViajeActual && (
            <MapaRuta
              origen={datosViajeActual.origen}
              destino={datosViajeActual.destino}
            />
          )}

          {viajeActivo && datosViajeActual && (
            <>
              <CardViajeEnCurso 
                origen={datosViajeActual.origen}
                destino={datosViajeActual.destino}
                horaSalida={datosViajeActual.hora_salida}
                asientosDisponibles={datosViajeActual.asientos_disponibles}
                precio={datosViajeActual.precio_asiento}
                descripcion={datosViajeActual.descripcion}
              />

              <SolicitudesReserva conductorId={JSON.parse(localStorage.getItem('usuario')).id} />
            </>
          )}
        </main>

      </div>

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
                {errors.destino && <p className="error-message">{errors.destino}</p>}
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
                  <select
                    name="asientos"
                    value={viajeData.asientos}
                    onChange={handleInputChange}
                    className="number-input"
                    required
                  >
                    <option value={1}>1 </option>
                    <option value={2}>2 </option>
                    <option value={3}>3 </option>
                  </select>
                  {errors.asientos && <p className="error-message">{errors.asientos}</p>}
                </div>
                <div className="form-group">
                  <label>Precio por Asiento (LPS)</label>
                  <input type="text"
                    name="precio"
                    value={viajeData.precio}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "ArrowLeft" &&
                        e.key !== "ArrowRight" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className="number-input"
                    placeholder="10 - 500 LPS"
                    inputMode="numeric" 
                  />
                  {errors.precio && <p className="error-message">{errors.precio}</p>}
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

      {showDireccionModal && (
        <div className="modal-overlay">
          <div className="direccion-modal">
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
