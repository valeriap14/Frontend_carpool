import '../styles/RegistrarUsuario.css';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrarUsuario() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onChange' });
  const [rol, setRol] = useState('');
  const [licenciaPreview, setLicenciaPreview] = useState(null);
  const [fotoCarroPreview, setFotoCarroPreview] = useState(null);
  const [fotoPerfilCargada, setFotoPerfilCargada] = useState(false);
  const [fotoCarnetCargada, setFotoCarnetCargada] = useState(false);
  const navigate = useNavigate();

  const licenciaInputRef = useRef(null);
  const fotoCarroInputRef = useRef(null);
  const fotoPerfilInputRef = useRef(null);
  const fotoCarnetInputRef = useRef(null);

  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
    navigate('/login');
  };

  const handleImagePreview = (file, setter, fieldName) => {
    if (file && file.type.startsWith('image/')) {
      setter(URL.createObjectURL(file));
    } else {
      setter(null);
    }
  };

  const handleImageDelete = (setter, fieldName, inputRef, extraSetter) => {
    setter(null);
    setValue(fieldName, null);
    if (extraSetter) extraSetter(false);
    if (inputRef?.current) {
      inputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    reset();
    setLicenciaPreview(null);
    setFotoCarroPreview(null);
    setRol('');
    setFotoPerfilCargada(false);
    setFotoCarnetCargada(false);
    if (fotoPerfilInputRef.current) fotoPerfilInputRef.current.value = '';
    if (fotoCarnetInputRef.current) fotoCarnetInputRef.current.value = '';
    navigate('/');
  };

  return (
    <main className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="registro-header">
          <h1>Únete a la Comunidad</h1>
          <p>Regístrate para acceder a viajes compartidos entre estudiantes.</p>
        </div>

        <div className="registro-campos">
          <div className="campo">
            <label htmlFor="nombres">Nombres:</label>
            <input id="nombres" {...register("nombres", { required: true })} placeholder="Juan Alberto" />
            {errors.nombres && <span className="error">Este campo es requerido</span>}
          </div>

          <div className="campo">
            <label htmlFor="apellidos">Apellidos:</label>
            <input id="apellidos" {...register("apellidos", { required: true })} placeholder="Perez Casco" />
            {errors.apellidos && <span className="error">Este campo es requerido</span>}
          </div>

          <div className="campo">
            <label htmlFor="dni">DNI:</label>
            <input id="dni" {...register("dni", { required: true, pattern: { value: /^\d{4}-\d{4}-\d{5}$/, message: 'Formato inválido (Ej: 0801-1990-12345)' } })} placeholder="0801-1990-12345" />
            {errors.dni && <span className="error">{errors.dni.message || 'Este campo es requerido'}</span>}
          </div>

          <div className="campo">
            <label htmlFor="email">Correo Institucional:</label>
            <input type="email" id="email" {...register("email", {
              required: 'Correo requerido',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@unah\.hn$/, message: 'Debe usar un correo @unah.hn'
              }
            })} placeholder="juan@unah.hn" />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" {...register("password", { required: 'Este campo es obligatorio', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })} placeholder="*******" />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          <div className="campo campo-imagen">
            <label htmlFor="fotoPerfil">Foto de Perfil:</label>
            <div className="input-con-x">
              <input type="file" id="fotoPerfil" {...register("fotoPerfil", { required: true })} ref={fotoPerfilInputRef} accept="image/*" onChange={() => setFotoPerfilCargada(true)} />
              {fotoPerfilCargada && <span className="x-inside" onClick={() => handleImageDelete(() => {}, 'fotoPerfil', fotoPerfilInputRef, setFotoPerfilCargada)}>✕</span>}
            </div>
            {errors.fotoPerfil && <span className="error">Este campo es requerido</span>}
          </div>

          <div className="campo campo-imagen">
            <label htmlFor="fotoCarnet">Foto Carnet Estudiantil:</label>
            <div className="input-con-x">
              <input type="file" id="fotoCarnet" {...register("fotoCarnet", { required: true })} ref={fotoCarnetInputRef} accept="image/*" onChange={() => setFotoCarnetCargada(true)} />
              {fotoCarnetCargada && <span className="x-inside" onClick={() => handleImageDelete(() => {}, 'fotoCarnet', fotoCarnetInputRef, setFotoCarnetCargada)}>✕</span>}
            </div>
            {errors.fotoCarnet && <span className="error">Este campo es requerido</span>}
          </div>

          <div className="campo">
            <label>Selecciona tu rol:</label>
            <div className="roles-radio">
              <label>
                <input type="radio" value="conductor" {...register("rol", { required: true })} onChange={() => setRol('conductor')} />
                Conductor
              </label>
              <label>
                <input type="radio" value="usuario" {...register("rol", { required: true })} onChange={() => setRol('usuario')} />
                Usuario
              </label>
            </div>
            {errors.rol && <span className="error">Selecciona un rol</span>}
          </div>

          {rol === 'conductor' && (
            <>
              <div className="campo campo-imagen">
                <label htmlFor="licencia">Foto Licencia:</label>
                <input
                  type="file"
                  id="licencia"
                  {...register("licencia", { required: true })}
                  ref={licenciaInputRef}
                  accept="image/*"
                  onChange={(e) => handleImagePreview(e.target.files[0], setLicenciaPreview, 'licencia')}
                />
                {errors.licencia && <span className="error">Este campo es requerido</span>}
                {licenciaPreview && (
                  <div className="preview-imagen">
                    <img src={licenciaPreview} alt="Licencia" />
                    <button type="button" className="btn-eliminar" onClick={() => handleImageDelete(setLicenciaPreview, 'licencia', licenciaInputRef)}>Eliminar</button>
                  </div>
                )}
              </div>

              <div className="campo campo-imagen">
                <label htmlFor="fotoCarro">Foto Vehículo:</label>
                <input
                  type="file"
                  id="fotoCarro"
                  {...register("fotoCarro", { required: true })}
                  ref={fotoCarroInputRef}
                  accept="image/*"
                  onChange={(e) => handleImagePreview(e.target.files[0], setFotoCarroPreview, 'fotoCarro')}
                />
                {errors.fotoCarro && <span className="error">Este campo es requerido</span>}
                {fotoCarroPreview && (
                  <div className="preview-imagen">
                    <img src={fotoCarroPreview} alt="Vehículo" />
                    <button type="button" className="btn-eliminar" onClick={() => handleImageDelete(setFotoCarroPreview, 'fotoCarro', fotoCarroInputRef)}>Eliminar</button>
                  </div>
                )}
              </div>

              <div className="campo">
                <label htmlFor="marca">Marca del Vehículo:</label>
                <input id="marca" {...register("marca", { required: true })} placeholder="Toyota" />
                {errors.marca && <span className="error">Marca requerida</span>}
              </div>

              <div className="campo">
                <label htmlFor="modelo">Modelo:</label>
                <input id="modelo" {...register("modelo", { required: true })} placeholder="Corolla 2020" />
                {errors.modelo && <span className="error">Modelo requerido</span>}
              </div>

              <div className="campo">
                <label htmlFor="color">Color:</label>
                <input id="color" {...register("color", { required: true })} placeholder="Gris" />
                {errors.color && <span className="error">Color requerido</span>}
              </div>

              <div className="campo">
                <label htmlFor="placa">Placa:</label>
                <input id="placa" {...register("placa", {
                  required: 'La placa es obligatoria',
                  pattern: { value: /^[A-Z]{3}-\d{4}$/, message: 'Ejemplo: PDH-4567' }
                })} placeholder="PDH-4567" />
                {errors.placa && <span className="error">{errors.placa.message}</span>}
              </div>
            </>
          )}
        </div>

        <div className="registro-condiciones">
          <input type="checkbox" id="terms" {...register("terminos", { required: true })} />
          <label htmlFor="terms">
            Acepto los <a href="#">términos</a> y <a href="#">políticas</a>.
          </label>
          {errors.terminos && <span className="error">Debes aceptar</span>}
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
