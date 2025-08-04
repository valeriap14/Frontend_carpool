"use client"

import { useEffect, useState } from "react"
import api from "../api/api"
import "../styles/SolicitudesReserva.css"
import ImagenPerfil from "../pages/fotoPerfil"

function SolicitudesReserva({ conductorId }) {
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(true)

  const cargarSolicitudes = async () => {
    try {
      const res = await api.get(`/reservas/conductor/${conductorId}`)
      const pendientes = res.data.filter((r) => !r.estado || r.estado === "pendiente")
      setSolicitudes(pendientes)
      setLoading(false)
    } catch (error) {
      console.error("Error cargando solicitudes:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarSolicitudes()
    const interval = setInterval(cargarSolicitudes, 30000)
    return () => clearInterval(interval)
  }, [])

  const responderSolicitud = async (id, estado) => {
    try {
      await api.put(`/reservas/responder/${id}`, { estado })
      cargarSolicitudes()
    } catch (error) {
      console.error("Error respondiendo solicitud:", error)
    }
  }

  if (loading) {
    return (
      <div className="solicitudes-container">
        <div className="solicitudes-header">
          <h2>Solicitudes de Reserva</h2>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Cargando solicitudes...</p>
        </div>
      </div>
    )
  }

  if (solicitudes.length === 0) {
    return (
      <div className="solicitudes-container">
        <div className="solicitudes-header">
          <h2>Solicitudes de Reserva</h2>
          <span className="solicitudes-count">0</span>
        </div>
        <div className="empty-state">
          <h3>No hay solicitudes pendientes</h3>
          <p>Las nuevas solicitudes aparecerán aquí</p>
        </div>
      </div>
    )
  }

  return (
    <div className="solicitudes-container">
      <div className="solicitudes-header">
        <h2>Solicitudes de Reserva</h2>
        <span className="solicitudes-count">{solicitudes.length}</span>
      </div>

      <div className="solicitudes-grid">
        {solicitudes.map((solicitud) => {
          const pasajero = solicitud.Usuario

          return (
            <div key={solicitud.id} className="solicitud-card">
              <div className="solicitud-avatar-info">
                <div className="avatar-container">
                  <ImagenPerfil
                    id={pasajero.id}
                    className="driver-avatar"
                    alt={`${pasajero.nombre} ${pasajero.apellido}`}
                  />
                  <div className="online-indicator"></div>
                </div>
                <div className="info-pasajero">
                  <h3>
                    {pasajero.nombre} {pasajero.apellido}
                  </h3>
                  <p>{solicitud.mensaje || "Solicita unirse a tu viaje"}</p>
                </div>
              </div>

              <div className="botones-respuesta">
                <button className="btn btn-aceptar" onClick={() => responderSolicitud(solicitud.id, "aceptada")}>
                  Aceptar
                </button>
                <button className="btn btn-rechazar" onClick={() => responderSolicitud(solicitud.id, "rechazada")}>
                  Rechazar
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SolicitudesReserva
