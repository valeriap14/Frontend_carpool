import { useState, useEffect, useContext, useRef } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { FaBell, FaHome, FaUserCircle, FaRoute, FaQuestionCircle } from "react-icons/fa"
import api from "../api/api"
import ImagenPerfil from "../pages/fotoPerfil"
import ImagenCarnet from "../pages/fotoCarnet"
import camara from "../assets/editar.png"
import "../styles/editarUsuario.css"
import "../styles/InicioPasajero.css"

function EditarUsuario() {
  const { usuario } = useContext(AuthContext)
  const navigate = useNavigate()
  const inputPerfilRef = useRef(null)
  const inputCarnetRef = useRef(null)
  const [setImagenPerfil] = useState(null)
  const [setCarnet] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" })

  useEffect(() => {
    if (usuario) {
      setValue("nombre", usuario.nombre || "")
      setValue("apellido", usuario.apellido || "")
      setValue("telefono", usuario.telefono || "")
      setValue("password", "")
    }
  }, [usuario, setValue])

  const handleClickImagenPerfil = () => inputPerfilRef.current?.click()

  const handleImagenPerfilChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append("fotoPerfil", file)

    try {
      await api.put(`usuarios/actualizarFotoPerfil/${usuario.id}`, formData)
      setImagenPerfil(URL.createObjectURL(file))
      setTimeout(() => window.location.reload(), 1500)
    } catch (error) {
      alert("Error al subir la imagen.")
    } finally {
      setIsLoading(false)
    }
  }

  const clickCarnet = () => inputCarnetRef.current?.click()

  const preCarnet = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append("fotoCarnet", file)

    try {
      await api.put(`usuarios/actualizarFotoCarnet/${usuario.id}`, formData)
      setCarnet(URL.createObjectURL(file))
      setTimeout(() => window.location.reload(), 1500)
    } catch (error) {
      alert("Error al subir la imagen.")
    } finally {
      setIsLoading(false)
    }
  }

  const guardarCambios = async (datos) => {
    setIsLoading(true)
    try {
      await api.put(`usuarios/actualizacion/${usuario.correo}`, {
        telefono: datos.telefono,
      })

      if (datos.password) {
        await api.put(`usuarios/actualizacionContra/${usuario.correo}`, {
          contrasena: datos.password,
        })
        alert("Contraseña actualizada.")
      }

      alert("Se guardaron los cambios")
      navigate(usuario.rolNombre === "Conductor" ? "/inicioconductor" : "/iniciopasajero")
    } catch (error) {
      alert("Error al actualizar los datos.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(usuario.rolNombre === "Conductor" ? "/inicioconductor" : "/iniciopasajero")
  }

  const handleCerrarSesion = () => {
    localStorage.clear()
    navigate("/")
  }

  if (!usuario) return <p>Cargando datos del usuario...</p>

  return (
    <div className="inicio-conductor-container">
      <header className="inicio-conductor-header">
        <div className="header-left">
          <h1 className="logo-text">loop</h1>
        </div>
        <div className="header-right">
          <div className="notification-icon-container">
            <FaBell className="icon-notification" />
          </div>
          <ImagenPerfil id={usuario.id} alt="Foto del usuario" className="avatar-circle" />
          <button className="logout-btn" onClick={handleCerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="main-content-container">
        <aside className="sidebar-fixed">
          <nav className="sidebar-nav">
            <button
              className="nav-btn"
              onClick={() => navigate(usuario.rolNombre === "Conductor" ? "/inicioconductor" : "/iniciopasajero")}
            >
              <FaHome className="nav-icon" /> Inicio
            </button>
            <button className="nav-btn active">
              <FaUserCircle className="nav-icon" /> Editar Perfil
            </button>
            <button className="nav-btn">
              <FaRoute className="nav-icon" /> Mis Viajes
            </button>
            <button className="nav-btn">
              <FaQuestionCircle className="nav-icon" /> Ayuda
            </button>
          </nav>
        </aside>

        <main className="content-area-fixed">
          <div className="edit-profile-container">
            <div className="edit-profile-header">
              <h1 className="edit-profile-title">Editar Perfil</h1>
              <p className="edit-profile-subtitle">Actualiza tu información personal</p>
            </div>

            <form className="edit-profile-form" onSubmit={handleSubmit(guardarCambios)}>
              <div className="profile-images-section">
                <div className="image-upload-group">
                  <div className="image-upload-container">
                    <div className="avatar-wrapper">
                      <ImagenPerfil id={usuario.id} className="profile-avatar" />
                      <input
                        type="file"
                        accept="image/*"
                        ref={inputPerfilRef}
                        onChange={handleImagenPerfilChange}
                        style={{ display: "none" }}
                      />
                      <button
                        className="camera-button"
                        type="button"
                        onClick={handleClickImagenPerfil}
                        disabled={isLoading}
                      >
                        <img src={camara || "/placeholder.svg"} alt="Editar" className="camera-icon" />
                      </button>
                    </div>
                    <div className="image-label">
                      <span className="label-title">Foto de Perfil</span>
                      <span className="label-subtitle">Haz clic para cambiar</span>
                    </div>
                  </div>

                  <div className="image-upload-container">
                    <div className="document-wrapper">
                      <ImagenCarnet id={usuario.id} className="carnet-image" />
                      <input
                        type="file"
                        accept="image/*"
                        ref={inputCarnetRef}
                        onChange={preCarnet}
                        style={{ display: "none" }}
                      />
                      <button className="camera-button" type="button" onClick={clickCarnet} disabled={isLoading}>
                        <img src={camara || "/placeholder.svg"} alt="Editar Carnet" className="camera-icon" />
                      </button>
                    </div>
                    <div className="image-label">
                      <span className="label-title">Carnet Estudiantil</span>
                      <span className="label-subtitle">Haz clic para cambiar</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-fields-section">
                <div className="personal-info-card">
                  <h3 className="card-title">Información Personal</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="nombre" className="form-label">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        className="form-input disabled"
                        value={`${usuario.nombre} ${usuario.apellido}`}
                        disabled
                      />
                      <span className="input-helper">Este campo no se puede modificar</span>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="correo" className="form-label">
                        Correo Institucional
                      </label>
                      <input type="email" id="correo" className="form-input disabled" value={usuario.correo} disabled />
                      <span className="input-helper">Este campo no se puede modificar</span>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="telefono" className="form-label">
                        Número de Teléfono
                      </label>
                      <input
                        type="text"
                        id="telefono"
                        className={`form-input ${errors.telefono ? "error" : ""}`}
                        placeholder="9876-1234"
                        {...register("telefono", {
                          required: "Teléfono es requerido",
                          pattern: {
                            value: /^\d{4}-\d{4}$/,
                            message: "Formato inválido (Ej: 9876-1234)",
                          },
                        })}
                      />
                      {errors.telefono && <span className="error-message">{errors.telefono.message}</span>}
                    </div>
                  </div>
                </div>

                <div className="security-card">

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        id="password"
                        className={`form-input ${errors.password ? "error" : ""}`}
                        placeholder="Dejar vacío para mantener la actual"
                        {...register("password", {
                          validate: (value) => !value || value.length >= 8 || "Mínimo 8 caracteres",
                        })}
                      />
                      {errors.password && <span className="error-message">{errors.password.message}</span>}
                      <span className="input-helper">Opcional: Solo completa si deseas cambiar tu contraseña</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleCancel} disabled={isLoading}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Guardando...
                    </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EditarUsuario
