import ImagenPerfil from '../pages/fotoPerfil';
import '../styles/ViajeAceptadoCard.css';

const ViajeAceptadoCard = ({ viaje }) => {
  if (!viaje) return null;

  return (
    <div className="trip-card active-trip">
      <h3 FaRout className="titulo-viaje">Viaje en curso</h3>

      <div className="perfil-conductor-info">
            <ImagenPerfil
                id={viaje.Usuario?.id}
                alt="Foto del conductor"
                className="avatar-conductor"
            />
            <span className="nombre-conductor">
                {viaje.Usuario?.nombre} {viaje.Usuario?.apellido}
            </span>
     </div>


      <p><strong>Ruta:</strong> {viaje.origen} → {viaje.destino}</p>
      <p><strong>Hora de salida:</strong> {viaje.hora_salida}</p>
      <p><strong>Precio:</strong> L.{viaje.precio_asiento}</p>
      <p><strong>Teléfono:</strong> {viaje.Usuario?.telefono || 'No disponible'}</p>

      {viaje.Usuario?.Vehiculo && (
        <div>
          <p><strong>Vehículo:</strong> {viaje.Usuario.Vehiculo.marca} {viaje.Usuario.Vehiculo.modelo}</p>
          <p><strong>Placa:</strong> {viaje.Usuario.Vehiculo.placa}</p>
          <p><strong>Color:</strong> {viaje.Usuario.Vehiculo.color}</p>
        </div>
      )}
    </div>
  );
};

export default ViajeAceptadoCard;
