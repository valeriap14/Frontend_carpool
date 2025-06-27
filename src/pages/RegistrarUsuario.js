import '../styles/RegistrarUsuario.css';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import loopLogo from '../assets/loop.png';

function RegistrarUsuario() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors, isValid }
  } = useForm({ mode: 'onChange' });

  const rol = watch('rol');
  const navigate = useNavigate();

  const licenciaInputRef = useRef(null);
  const fotoCarroInputRef = useRef(null);
  const fotoPerfilInputRef = useRef(null);
  const fotoCarnetInputRef = useRef(null);

  const [fotoPerfilPreview, setFotoPerfilPreview] = useState(null);
  const [fotoCarnetPreview, setFotoCarnetPreview] = useState(null);
  const [licenciaPreview, setLicenciaPreview] = useState(null);
  const [fotoCarroPreview, setFotoCarroPreview] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const onSubmit = async (data) => {
    setSubmitAttempted(true);
    const isValid = await trigger();
    if (!isValid) return;
    
    console.log('Datos del formulario:', data);
    reset();
    navigate('/login');
  };

  const handleImageDelete = (setter, fieldName, inputRef) => {
    setter(null);
    setValue(fieldName, null, { shouldValidate: true });
    if (inputRef?.current) inputRef.current.value = '';
  };

  const handleImageChange = (e, setter, fieldName) => {
    const file = e.target.files[0];
    if (file && /image\/(png|jpeg|jpg)/.test(file.type)) {
      setter(URL.createObjectURL(file));
      setValue(fieldName, file, { shouldValidate: true });
    } else {
      setter(null);
      setValue(fieldName, null, { shouldValidate: true });
    }
  };

  const handleCancel = () => {
    reset();
    setFotoPerfilPreview(null);
    setFotoCarnetPreview(null);
    setLicenciaPreview(null);
    setFotoCarroPreview(null);
    navigate('/');
  };

  return (
    <main className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="registro-header">
          {/* Logo de Loop arriba del título */}
          <div className="registro-logo-container">
            <img 
              src={loopLogo || "/placeholder.svg"} 
              alt="Loop Logo" 
              className="registro-loop-logo-img"
            />
          </div>
          
          <h1>Únete a nuestra Comunidad</h1>
          <p>Regístrate para acceder a viajes compartidos entre estudiantes.</p>
        </div>

        <div className="registro-campos">
          <div className="campo">
            <label htmlFor="nombresCompletos">Nombres Completos:</label>
            <input 
              id="nombresCompletos" 
              {...register("nombresCompletos", { 
                required: 'Nombres completos son requeridos',
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                  message: 'Solo se permiten letras'
                }
              })} 
              placeholder="Juan Alberto" 
            />
            {(errors.nombresCompletos || submitAttempted) && (
              <span className="error">{errors.nombresCompletos?.message || 'Nombres completos son requeridos'}</span>
            )}
          </div>

          <div className="campo">
            <label htmlFor="apellidosCompletos">Apellidos Completos:</label>
            <input 
              id="apellidosCompletos" 
              {...register("apellidosCompletos", { 
                required: 'Apellidos completos son requeridos',
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                  message: 'Solo se permiten letras'
                }
              })} 
              placeholder="Perez Casco" 
            />
            {(errors.apellidosCompletos || submitAttempted) && (
              <span className="error">{errors.apellidosCompletos?.message || 'Apellidos completos son requeridos'}</span>
            )}
          </div>

          <div className="campo">
            <label htmlFor="dni">Número de Identidad:</label>
            <input 
              id="dni" 
              {...register("dni", {
                required: 'Número de identidad es requerido',
                pattern: {
                  value: /^\d{4}-\d{4}-\d{5}$/,
                  message: 'Formato inválido (Ej: 1234-5678-90123)'
                }
              })} 
              placeholder="0801-2000-90123" 
            />
            {(errors.dni || submitAttempted) && (
              <span className="error">{errors.dni?.message || 'Número de identidad es requerido'}</span>
            )}
          </div>

          <div className="campo">
            <label htmlFor="email">Correo Institucional:</label>
            <input 
              id="email" 
              type="email" 
              {...register("email", {
                required: 'Correo institucional es requerido',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@unah\.hn$/,
                  message: 'Debe usar un correo @unah.hn'
                }
              })} 
              placeholder="juan@unah.hn" 
            />
            {(errors.email || submitAttempted) && (
              <span className="error">{errors.email?.message || 'Correo institucional es requerido'}</span>
            )}
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña:</label>
            <input 
              id="password" 
              type="password" 
              {...register("password", {
                required: 'Contraseña es requerida',
                minLength: { value: 8, message: 'Mínimo 8 caracteres' }
              })} 
              placeholder="********" 
            />
            {(errors.password || submitAttempted) && (
              <span className="error">{errors.password?.message || 'Contraseña es requerida'}</span>
            )}
          </div>

          <div className="campo">
            <label htmlFor="telefono">Teléfono Celular:</label>
            <input 
              id="telefono" 
              {...register("telefono", {
                required: 'Teléfono es requerido',
                pattern: {
                  value: /^\d{4}-\d{4}$/,
                  message: 'Formato inválido (Ej: 9876-1234)'
                }
              })} 
              placeholder="9876-1234" 
            />
            {(errors.telefono || submitAttempted) && (
              <span className="error">{errors.telefono?.message || 'Teléfono es requerido'}</span>
            )}
          </div>

          <div className="campo campo-imagen">
            <label htmlFor="fotoPerfil">Foto de Perfil:</label>
            <div className="input-con-x">
              <input 
                id="fotoPerfil" 
                type="file" 
                accept="image/png, image/jpeg, image/jpg" 
                {...register("fotoPerfil", {
                  required: 'Foto de perfil es requerida',
                  validate: (value) => {
                    if (value && value.type && !value.type.match(/image\/(png|jpeg|jpg)/)) {
                      return 'Formato de imagen no válido';
                    }
                    return true;
                  }
                })} 
                ref={fotoPerfilInputRef} 
                onChange={(e) => handleImageChange(e, setFotoPerfilPreview, 'fotoPerfil')} 
              />
              {fotoPerfilPreview && (
                <span 
                  className="x-inside" 
                  onClick={() => handleImageDelete(setFotoPerfilPreview, 'fotoPerfil', fotoPerfilInputRef)}
                >
                  ✕
                </span>
              )}
            </div>
            {(errors.fotoPerfil || submitAttempted) && (
              <span className="error">{errors.fotoPerfil?.message || 'Foto de perfil es requerida'}</span>
            )}
            {fotoPerfilPreview && (
              <div className="image-preview-container">
                <img 
                  src={fotoPerfilPreview || "/placeholder.svg"} 
                  alt="Vista previa de perfil" 
                  className="image-preview" 
                  style={{ maxWidth: '150px', maxHeight: '150px' }}
                />
              </div>
            )}
          </div>

          <div className="campo campo-imagen">
            <label htmlFor="fotoCarnet">Foto Carnet Estudiantil:</label>
            <div className="input-con-x">
              <input 
                id="fotoCarnet" 
                type="file" 
                accept="image/png, image/jpeg, image/jpg" 
                {...register("fotoCarnet", {
                  required: 'Foto de carnet es requerida',
                  validate: (value) => {
                    if (value && value.type && !value.type.match(/image\/(png|jpeg|jpg)/)) {
                      return 'Formato de imagen no válido';
                    }
                    return true;
                  }
                })} 
                ref={fotoCarnetInputRef} 
                onChange={(e) => handleImageChange(e, setFotoCarnetPreview, 'fotoCarnet')} 
              />
              {fotoCarnetPreview && (
                <span 
                  className="x-inside" 
                  onClick={() => handleImageDelete(setFotoCarnetPreview, 'fotoCarnet', fotoCarnetInputRef)}
                >
                  ✕
                </span>
              )}
            </div>
            {(errors.fotoCarnet || submitAttempted) && (
              <span className="error">{errors.fotoCarnet?.message || 'Foto de carnet es requerida'}</span>
            )}
            {fotoCarnetPreview && (
              <div className="image-preview-container">
                <img 
                  src={fotoCarnetPreview || "/placeholder.svg"} 
                  alt="Vista previa de carnet" 
                  className="image-preview" 
                  style={{ maxWidth: '150px', maxHeight: '150px' }}
                />
              </div>
            )}
          </div>

          <div className="campo">
            <label>Selecciona tu rol:</label>
            <div className="roles-radio">
              <label>
                <input 
                  type="radio" 
                  value="conductor" 
                  {...register("rol", { required: 'Debe seleccionar un rol' })} 
                /> 
                Conductor
              </label>
              <label>
                <input 
                  type="radio" 
                  value="pasajero" 
                  {...register("rol", { required: 'Debe seleccionar un rol' })} 
                /> 
                Pasajero
              </label>
            </div>
            {(errors.rol || submitAttempted) && (
              <span className="error">{errors.rol?.message || 'Debe seleccionar un rol'}</span>
            )}
          </div>

          {rol === 'conductor' && (
            <>
              <div className="campo campo-imagen">
                <label htmlFor="licencia">Foto Licencia:</label>
                <div className="input-con-x">
                  <input 
                    id="licencia" 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg" 
                    {...register("licencia", {
                      required: 'Foto de licencia es requerida para conductores',
                      validate: (value) => {
                        if (value && value.type && !value.type.match(/image\/(png|jpeg|jpg)/)) {
                          return 'Formato de imagen no válido';
                        }
                        return true;
                      }
                    })} 
                    ref={licenciaInputRef} 
                    onChange={(e) => handleImageChange(e, setLicenciaPreview, 'licencia')} 
                  />
                  {licenciaPreview && (
                    <span 
                      className="x-inside" 
                      onClick={() => handleImageDelete(setLicenciaPreview, 'licencia', licenciaInputRef)}
                    >
                      ✕
                    </span>
                  )}
                </div>
                {(errors.licencia || submitAttempted) && (
                  <span className="error">{errors.licencia?.message || 'Foto de licencia es requerida'}</span>
                )}
                {licenciaPreview && (
                  <div className="image-preview-container">
                    <img 
                      src={licenciaPreview || "/placeholder.svg"} 
                      alt="Vista previa de licencia" 
                      className="image-preview" 
                      style={{ maxWidth: '150px', maxHeight: '150px' }}
                    />
                  </div>
                )}
              </div>

              <div className="campo campo-imagen">
                <label htmlFor="fotoCarro">Foto Vehículo:</label>
                <div className="input-con-x">
                  <input 
                    id="fotoCarro" 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg" 
                    {...register("fotoCarro", {
                      required: 'Foto del vehículo es requerida para conductores',
                      validate: (value) => {
                        if (value && value.type && !value.type.match(/image\/(png|jpeg|jpg)/)) {
                          return 'Formato de imagen no válido';
                        }
                        return true;
                      }
                    })} 
                    ref={fotoCarroInputRef} 
                    onChange={(e) => handleImageChange(e, setFotoCarroPreview, 'fotoCarro')} 
                  />
                  {fotoCarroPreview && (
                    <span 
                      className="x-inside" 
                      onClick={() => handleImageDelete(setFotoCarroPreview, 'fotoCarro', fotoCarroInputRef)}
                    >
                      ✕
                    </span>
                  )}
                </div>
                {(errors.fotoCarro || submitAttempted) && (
                  <span className="error">{errors.fotoCarro?.message || 'Foto del vehículo es requerida'}</span>
                )}
                {fotoCarroPreview && (
                  <div className="image-preview-container">
                    <img 
                      src={fotoCarroPreview || "/placeholder.svg"} 
                      alt="Vista previa de vehículo" 
                      className="image-preview" 
                      style={{ maxWidth: '150px', maxHeight: '150px' }}
                    />
                  </div>
                )}
              </div>

              <div className="campo">
                <label htmlFor="marca">Marca del Vehículo:</label>
                <input 
                  id="marca" 
                  {...register("marca", { 
                    required: 'Marca del vehículo es requerida' 
                  })} 
                  placeholder="Toyota" 
                />
                {(errors.marca || submitAttempted) && (
                  <span className="error">{errors.marca?.message || 'Marca del vehículo es requerida'}</span>
                )}
              </div>

              <div className="campo">
                <label htmlFor="modelo">Modelo:</label>
                <input 
                  id="modelo" 
                  {...register("modelo", { 
                    required: 'Modelo del vehículo es requerido' 
                  })} 
                  placeholder="Corolla 2020" 
                />
                {(errors.modelo || submitAttempted) && (
                  <span className="error">{errors.modelo?.message || 'Modelo del vehículo es requerido'}</span>
                )}
              </div>

              <div className="campo">
                <label htmlFor="color">Color:</label>
                <input 
                  id="color" 
                  {...register("color", { 
                    required: 'Color del vehículo es requerido',
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                      message: 'Solo se permiten letras'
                    }
                  })} 
                  placeholder="Gris" 
                />
                {(errors.color || submitAttempted) && (
                  <span className="error">{errors.color?.message || 'Color del vehículo es requerido'}</span>
                )}
              </div>

              <div className="campo">
                <label htmlFor="placa">Placa:</label>
                <input 
                  id="placa" 
                  {...register("placa", {
                    required: 'Placa del vehículo es requerida',
                    pattern: {
                      value: /^[A-Z]{3}-\d{4}$/,
                      message: 'Ejemplo: PDH-4567'
                    }
                  })} 
                  placeholder="PDH-4567" 
                />
                {(errors.placa || submitAttempted) && (
                  <span className="error">{errors.placa?.message || 'Placa del vehículo es requerida'}</span>
                )}
              </div>
            </>
          )}
        </div>

        <div className="registro-condiciones">
          <input 
            type="checkbox" 
            id="terms" 
            {...register("terminos", { required: 'Debes aceptar los términos y condiciones' })} 
          />
          <label htmlFor="terms">
            Acepto los <a href="#">términos</a> y <a href="#">políticas</a>.
          </label>
          {(errors.terminos || submitAttempted) && (
            <span className="error">{errors.terminos?.message || 'Debes aceptar los términos y condiciones'}</span>
          )}
        </div>

        <div className="registro-botones">
          <button type="submit">Continuar</button>
          <button type="button" className="cancelar" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </main>
  );
}

export default RegistrarUsuario;