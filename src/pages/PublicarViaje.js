import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../api/api';
import '../styles/PublicarViaje.css';

function PublicarViaje() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    origen: '',
    destino: '',
    fecha_salida: '',
    hora_salida: '',
    precio: '',
    plazas_disponibles: '',
    descripcion: '',
    conductor_id: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState([]);
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    cargarViajesDisponibles();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const cargarViajesDisponibles = async () => {
    try {
      const res = await api.get('/viajes/disponibles');
      setViajes(res.data.data);
    } catch (error) {
      console.error('Error al cargar viajes:', error);
    }
  };

  const publicarViaje = async (e) => {
    e.preventDefault();

    const salida = new Date(`${form.fecha_salida}T${form.hora_salida}`);
    if (salida < new Date()) {
      setErrores(['La fecha y hora de salida no pueden ser anteriores a la actual']);
      return;
    }

    try {
      const res = await api.post('/viajes/publicar', form);
      setMensaje(res.data.message);
      setErrores([]);
      setForm({
        origen: '',
        destino: '',
        fecha_salida: '',
        hora_salida: '',
        precio: '',
        plazas_disponibles: '',
        descripcion: '',
        conductor_id: ''
      });
      cargarViajesDisponibles();
    } catch (error) {
      setMensaje('');
      const backendErrors = error.response?.data?.errors || [error.response?.data?.message || 'Error desconocido'];
      setErrores(backendErrors);
    }
  };

  return (
    <div className="publicar-container">
      <button className="btn-regresar" onClick={() => navigate('/InicioConductor')}>
        <FaArrowLeft />
      </button>

      <h2>Publicar un viaje</h2>
      <form onSubmit={publicarViaje} className="publicar-form">
        <input name="origen" placeholder="Origen" value={form.origen} onChange={handleChange} required />
        <input name="destino" placeholder="Destino" value={form.destino} onChange={handleChange} required />
        <input type="date" name="fecha_salida" value={form.fecha_salida} onChange={handleChange} required />
        <input type="time" name="hora_salida" value={form.hora_salida} onChange={handleChange} required />
        <input name="precio" type="number" placeholder="Precio" value={form.precio} onChange={handleChange} required />
        <input name="plazas_disponibles" type="number" placeholder="Plazas disponibles" value={form.plazas_disponibles} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción (opcional)" value={form.descripcion} onChange={handleChange}></textarea>
        <input name="conductor_id" type="number" placeholder="ID del conductor" value={form.conductor_id} onChange={handleChange} required />
        <button type="submit">Publicar</button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {errores.length > 0 && (
        <ul className="errores">
          {errores.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      )}

      <h2>Viajes con plazas disponibles</h2>
      <div className="viajes-lista">
        {viajes.map(viaje => (
          <div key={viaje.id} className="viaje-card">
            <p><strong>Origen:</strong> {viaje.origen}</p>
            <p><strong>Destino:</strong> {viaje.destino}</p>
            <p><strong>Fecha:</strong> {viaje.fecha_salida}</p>
            <p><strong>Hora:</strong> {viaje.hora_salida}</p>
            <p><strong>Precio:</strong> L. {viaje.precio}</p>
            <p><strong>Plazas disponibles:</strong> {viaje.plazas_disponibles}</p>
            {viaje.descripcion && <p><strong>Descripción:</strong> {viaje.descripcion}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PublicarViaje;
