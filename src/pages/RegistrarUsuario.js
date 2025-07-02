import { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import loopLogo from '../assets/loop.png';
import '../styles/RegistrarUsuario.css';

function RegistrarUsuario() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    trigger,
    formState: { errors, isValid }
  } = useForm({ mode: 'onChange' });

  const rol = watch('rol');
  const navigate = useNavigate();

  const fotoPerfilInputRef = useRef(null);
  const fotoCarnetInputRef = useRef(null);
  const licenciaInputRef = useRef(null);
  const fotoCarroInputRef = useRef(null);

  // Estados para las previsualizaciones de imágenes
  const [fotoPerfilPreview, setFotoPerfilPreview] = useState(null);
  const [fotoCarnetPreview, setFotoCarnetPreview] = useState(null);
  const [licenciaPreview, setLicenciaPreview] = useState(null);
  const [fotoCarroPreview, setFotoCarroPreview] = useState(null);
  
  // Estados para el formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isChecking, setIsChecking] = useState({
    dni: false,
    correo: false,
    placa: false
  });

  // Estado para manejar validación de campos únicos
  const [validacionCampos, setValidacionCampos] = useState({
    dni: { valido: true, mensaje: '' },
    correo: { valido: true, mensaje: '' },
    placa: { valido: true, mensaje: '' }
  });

  useEffect(() => {
    return () => {
      [fotoPerfilPreview, fotoCarnetPreview, licenciaPreview, fotoCarroPreview].forEach(preview => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [fotoPerfilPreview, fotoCarnetPreview, licenciaPreview, fotoCarroPreview]);

  const checkUniqueField = useCallback(async (fieldName, value) => {
    if (!value) {
      setValidacionCampos(prev => ({
        ...prev,
        [fieldName]: { valido: true, mensaje: '' }
      }));
      return true;
    }
    
    // Validación de formato antes de enviar al backend
    if (fieldName === 'dni' && !/^\d{4}-\d{4}-\d{5}$/.test(value)) {
      return true;
    }
    if (fieldName === 'placa' && !/^[A-Z]{3}-\d{4}$/.test(value)) {
      return true;
    }

    setIsChecking(prev => ({ ...prev, [fieldName]: true }));
    
    try {
      const response = await api.get(`/usuarios/check-${fieldName}`, {
        params: { [fieldName]: value },
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      const estaDisponible = response.data.available;
      
      setValidacionCampos(prev => ({
        ...prev,
        [fieldName]: {
          valido: estaDisponible,
          mensaje: estaDisponible ? '' : `Este ${fieldName === 'dni' ? 'DNI' : fieldName === 'correo' ? 'correo' : 'placa'} ya está registrado`
        }
      }));

      return estaDisponible;
    } catch (error) {
      console.error(`Error verificando ${fieldName}:`, error);
      return true; 
    } finally {
      setIsChecking(prev => ({ ...prev, [fieldName]: false }));
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'dni') {
        checkUniqueField('dni', value.dni);
      }
      if (name === 'correo') {
        checkUniqueField('correo', value.correo);
      }
      if (name === 'placa' && rol === 'conductor') {
        checkUniqueField('placa', value.placa);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [watch, checkUniqueField, rol]);

  const onSubmit = async (data) => {
    try {
      const isValidForm = await trigger();
      if (!isValidForm) {
        setErrorMessage('Por favor completa todos los campos requeridos');
        return;
      }

      setIsSubmitting(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      await Promise.all([
        checkUniqueField('dni', data.dni),
        checkUniqueField('correo', data.correo),
        rol === 'conductor' ? checkUniqueField('placa', data.placa) : Promise.resolve(true)
      ]);

      const formData = new FormData();
      
      formData.append('nombre', data.nombresCompletos.trim());
      formData.append('apellido', data.apellidosCompletos.trim());
      formData.append('dni', data.dni.trim());
      formData.append('correo', data.correo.trim());
      formData.append('contrasena', data.password);
      formData.append('role_id', rol === 'conductor' ? '2' : '1');
      formData.append('telefono', data.telefono.trim());
      
      formData.append('fotoPerfil', data.fotoPerfil);
      formData.append('fotoCarnet', data.fotoCarnet);

      if (rol === 'conductor') {
        formData.append('licencia', data.licencia);
        formData.append('fotoCarro', data.fotoCarro);
        
        const vehiculoData = {
          marca: data.marca.trim(),
          modelo: data.modelo.trim(),
          color: data.color.trim(),
          placa: data.placa.trim()
        };
        formData.append('vehiculo', JSON.stringify(vehiculoData));
      }

      const response = await api.post('/usuarios', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccessMessage('¡Registro exitoso! Redirigiendo...');
      setTimeout(() => {
        reset();
        navigate('/login', { 
          state: { 
            registroExitoso: true,
            mensaje: `¡Bienvenid@ ${data.nombresCompletos}!` 
          } 
        });
      }, 2000);

    } catch (error) {
      console.error('Error en el registro:', error);
      
      if (error.response?.status === 409) {
        const { campo, mensaje } = error.response.data;
        setValidacionCampos(prev => ({
          ...prev,
          [campo]: { valido: false, mensaje }
        }));
        setErrorMessage(`Error: ${mensaje}`);
      } else {
        setErrorMessage(
          error.response?.data?.message || 
          'Error en el servidor. Intenta nuevamente.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e, setter, fieldName) => {
    const file = e.target.files[0];
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 2 * 1024 * 1024; 
    
    clearErrors(fieldName);
    setErrorMessage(null);

    if (!file) {
      setError(fieldName, { type: 'manual', message: 'Este campo es requerido' });
      return;
    }

    if (!validTypes.includes(file.type)) {
      setError(fieldName, { 
        type: 'manual', 
        message: 'Solo se permiten imágenes en formato PNG, JPEG o JPG' 
      });
      return;
    }
    
    if (file.size > maxSize) {
      setError(fieldName, { 
        type: 'manual', 
        message: 'La imagen no puede exceder los 2MB' 
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setter(event.target.result);
      setValue(fieldName, file, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = (setter, fieldName, inputRef) => {
    if (setter === setFotoPerfilPreview && fotoPerfilPreview) URL.revokeObjectURL(fotoPerfilPreview);
    if (setter === setFotoCarnetPreview && fotoCarnetPreview) URL.revokeObjectURL(fotoCarnetPreview);
    if (setter === setLicenciaPreview && licenciaPreview) URL.revokeObjectURL(licenciaPreview);
    if (setter === setFotoCarroPreview && fotoCarroPreview) URL.revokeObjectURL(fotoCarroPreview);
    
    setter(null);
    setValue(fieldName, null, { shouldValidate: true });
    if (inputRef?.current) inputRef.current.value = '';
    setError(fieldName, { type: 'manual', message: 'Este campo es requerido' });
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
          <div className="registro-logo-container">
            <img src={loopLogo} alt="Loop Logo" className="registro-loop-logo-img" />
          </div>
          <h1>Únete a nuestra Comunidad</h1>
          <p>Regístrate para acceder a viajes compartidos entre estudiantes.</p>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

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
                },
                validate: value => value.trim().length > 0 || 'Nombres completos son requeridos'
              })}
              placeholder="Juan Alberto"
            />
            {errors.nombresCompletos && (
              <span className="error">{errors.nombresCompletos.message}</span>
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
                },
                validate: value => value.trim().length > 0 || 'Apellidos completos son requeridos'
              })}
              placeholder="Perez Casco"
            />
            {errors.apellidosCompletos && (
              <span className="error">{errors.apellidosCompletos.message}</span>
            )}
          </div>

          <div className="campo">
            <label htmlFor="dni">Número de Identidad:</label>
            <div className="input-with-status">
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
              {isChecking.dni && (
                <span className="checking-status">Verificando...</span>
              )}
            </div>
            {errors.dni && (
              <span className="error">{errors.dni.message}</span>
            )}
            {!validacionCampos.dni.valido && validacionCampos.dni.mensaje && (
              <span className="error">{validacionCampos.dni.mensaje}</span>
            )}
          </div>

          <div className="campo">
            <label htmlFor="correo">Correo Institucional:</label>
            <div className="input-with-status">
              <input
                id="correo"
                type="email"
                {...register("correo", {
                  required: 'Correo institucional es requerido',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@unah\.hn$/,
                    message: 'Debe usar un correo @unah.hn'
                  }
                })}
                placeholder="juan@unah.hn"
              />
              {isChecking.correo && (
                <span className="checking-status">Verificando...</span>
              )}
            </div>
            {errors.correo && (
              <span className="error">{errors.correo.message}</span>
            )}
            {!validacionCampos.correo.valido && validacionCampos.correo.mensaje && (
              <span className="error">{validacionCampos.correo.mensaje}</span>
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
            {errors.password && (
              <span className="error">{errors.password.message}</span>
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
            {errors.telefono && (
              <span className="error">{errors.telefono.message}</span>
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
                  required: 'Foto de perfil es requerida'
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
            {errors.fotoPerfil && (
              <span className="error">{errors.fotoPerfil.message}</span>
            )}
            {fotoPerfilPreview && (
              <div className="image-preview-container">
                <img
                  src={fotoPerfilPreview}
                  alt="Vista previa de perfil"
                  className="image-preview"
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
                  required: 'Foto de carnet es requerida'
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
            {errors.fotoCarnet && (
              <span className="error">{errors.fotoCarnet.message}</span>
            )}
            {fotoCarnetPreview && (
              <div className="image-preview-container">
                <img
                  src={fotoCarnetPreview}
                  alt="Vista previa de carnet"
                  className="image-preview"
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
            {errors.rol && (
              <span className="error">{errors.rol.message}</span>
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
                      required: 'Foto de licencia es requerida para conductores'
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
                {errors.licencia && (
                  <span className="error">{errors.licencia.message}</span>
                )}
                {licenciaPreview && (
                  <div className="image-preview-container">
                    <img
                      src={licenciaPreview}
                      alt="Vista previa de licencia"
                      className="image-preview"
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
                      required: 'Foto del vehículo es requerida para conductores'
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
                {errors.fotoCarro && (
                  <span className="error">{errors.fotoCarro.message}</span>
                )}
                {fotoCarroPreview && (
                  <div className="image-preview-container">
                    <img
                      src={fotoCarroPreview}
                      alt="Vista previa de vehículo"
                      className="image-preview"
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
                {errors.marca && (
                  <span className="error">{errors.marca.message}</span>
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
                {errors.modelo && (
                  <span className="error">{errors.modelo.message}</span>
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
                {errors.color && (
                  <span className="error">{errors.color.message}</span>
                )}
              </div>

              <div className="campo">
                <label htmlFor="placa">Placa:</label>
                <div className="input-with-status">
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
                  {isChecking.placa && (
                    <span className="checking-status">Verificando...</span>
                  )}
                </div>
                {errors.placa && (
                  <span className="error">{errors.placa.message}</span>
                )}
                {!validacionCampos.placa.valido && validacionCampos.placa.mensaje && (
                  <span className="error">{validacionCampos.placa.mensaje}</span>
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
          {errors.terminos && (
            <span className="error">{errors.terminos.message}</span>
          )}
        </div>

        <div className="registro-botones">
          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Registrando...
              </>
            ) : (
              'Continuar'
            )}
          </button>
          <button type="button" className="cancelar" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}

export default RegistrarUsuario;