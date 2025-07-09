import React, { useState } from 'react';
import '../styles/Viajes.css';

function Viajes() {
  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    fechaSalida: '',
    HoraSalida: '',
    precio: '',
    plazas: '',
    idConductor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // enviar al backend
  };

  const handleCancelar = () => {
    setFormData({
      origen: '',
      destino: '',
      fechaSalida: '',
      HoraSalida: '',
      precio: '',
      plazas: '',
      idConductor: ''
    });
  };

  return (
    <main className='Registro-container'>
      <form className='Registro-form' onSubmit={handleSubmit}>
        <div className='Registro-header'></div>

        <h1>Publica tu Viaje</h1>

        <div className='campo'>
          <label htmlFor='origen'>Origen:</label>
          <input
            id='origen'
            name='origen'
            placeholder='Residencial Plaza'
            value={formData.origen}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor='destino'>Destino:</label>
          <input
            id='destino'
            name='destino'
            placeholder='Ciudad Universitaria'
            value={formData.destino}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor='fechaSalida'>Fecha de Salida:</label>
          <input
            type='date'
            id='fechaSalida'
            name='fechaSalida'
            value={formData.fechaSalida}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor='HoraSalida'>Hora de Salida:</label>
          <input
            type='time'
            id='HoraSalida'
            name='HoraSalida'
            value={formData.HoraSalida}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor='precio'>Precio en Lps:</label>
          <input
            type='number'
            id='precio'
            name='precio'
            placeholder='100'
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor='plazas'>Plazas:</label>
          <input
            type='number'
            id='plazas'
            name='plazas'
            placeholder='Cantidad en números'
            value={formData.plazas}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor='idConductor'>Id de Conductor:</label>
          <input
            id='idConductor'
            name='idConductor'
            placeholder='idConductor'
            value={formData.idConductor}
            onChange={handleChange}
            required
          />
        </div>

        <div className='registro-botones'>
          <button type='submit'>Publicar</button>
          <button type='button' class='Cancelar' onClick={handleCancelar}>Cancelar</button>
         
        </div>
      </form>
    </main>
  );
}

export default Viajes;
