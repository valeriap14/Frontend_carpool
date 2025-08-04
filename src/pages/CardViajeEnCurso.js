import "../styles/CardViajeEnCurso.css"
import ImagenPerfil from "../pages/fotoPerfil"

const CardViajeEnCurso = ({
  origen,
  destino,
  horaSalida,
  asientosDisponibles,
  precio,
  descripcion,
  pasajeros = [],
}) => {
  return (
    <div className="card-viaje">
      <div className="card-header">
        <div className="status-indicator">
          <h3>Viaje en Curso</h3>
        </div>
        <div className="trip-badge">
          <span className="badge-text">Activo</span>
        </div>
      </div>

      <div className="contenido-viaje">
        <div className="viaje-info">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Hora de salida</span>
                <span className="info-value">{horaSalida}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Origen</span>
                <span className="info-value">{origen}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Destino</span>
                <span className="info-value">{destino}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Asientos disponibles</span>
                <span className="info-value">{asientosDisponibles}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Precio por asiento</span>
                <span className="info-value">L{precio}</span>
              </div>
            </div>

            {descripcion && (
              <div className="info-item full-width">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Detalles</span>
                  <span className="info-value">{descripcion}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pasajeros-aceptados">
          <div className="pasajeros-header">
            <h4>Pasajeros Aceptados</h4>
            <span className="pasajeros-count">{pasajeros.length}</span>
          </div>

          {pasajeros.length === 0 ? (
            <div className="sin-pasajeros">
              <div className="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <p>No hay pasajeros aceptados aún</p>
                <span>Los pasajeros aparecerán aquí cuando aceptes sus solicitudes</span>
              </div>
            </div>
          ) : (
            <div className="pasajeros-grid">
              {pasajeros.map((p) => (
                <div key={p.id} className="pasajero-card">
                  <div className="pasajero-avatar">
                    <ImagenPerfil id={p.id} alt={`Foto de ${p.nombre}`} className="avatar-image" />
                    <div className="online-indicator"></div>
                  </div>
                  <div className="pasajero-info">
                    <span className="pasajero-name">
                      {p.nombre} {p.apellido} {p.telefono}
                      {console.log(p)}
                    </span>
                    <span className="pasajero-status">Confirmado</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardViajeEnCurso
