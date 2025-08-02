import ImagenPerfil from '../pages/fotoPerfil';
import '../styles/ViajeAceptadoCard.css';

const ViajeAceptadoCard = ({ viaje }) => {
  if (!viaje) return null;

  return (
    <div className="trip-card active-trip">
      <h3 FaRout className="titulo-viaje">Viaje en curso</h3>

      <div className="perfil-conductor-info">
            <ImagenPerfil
                id={viaje.conductor?.id}
                alt="Foto del conductor"
                className="avatar-conductor"
            />
            <span className="nombre-conductor">
                {viaje.conductor?.nombre} {viaje.conductor?.apellido}
            </span>
     </div>


      <p><strong>Ruta:</strong> {viaje.origen} → {viaje.destino}</p>
      <p><strong>Hora de salida:</strong> {viaje.hora_salida}</p>
      <p><strong>Precio:</strong> L.{viaje.precio_asiento}</p>
      <p><strong>Teléfono:</strong> {viaje.conductor?.telefono || 'No disponible'}</p>

      {viaje.conductor?.Vehiculo && (
        <div>
          <p><strong>Vehículo:</strong> {viaje.conductor.Vehiculo.marca} {viaje.conductor.Vehiculo.modelo}</p>
          <p><strong>Placa:</strong> {viaje.conductor.Vehiculo.placa}</p>
          <p><strong>Color:</strong> {viaje.conductor.Vehiculo.color}</p>
        </div>
      )}
    </div>
  );
};

export default ViajeAceptadoCard;
