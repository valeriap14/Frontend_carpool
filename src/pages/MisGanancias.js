import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/MisGanancias.css';

const MisGanancias = () => {
  const [ganancias, setGanancias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

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

  if (cargando) return <p>Cargando ganancias...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (ganancias.length === 0) return <p>No hay ganancias registradas.</p>;

  return (
    <div className="ganancias-container">
      <h2>Mis Ganancias</h2>
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
    </div>
  );
};

export default MisGanancias;
