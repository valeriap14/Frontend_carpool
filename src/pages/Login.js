import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import loopLogo from '../assets/loop.png';
import api from '../api/api'; 
import { AuthContext } from '../context/AuthContext';
function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate(); 
  const {inicioDatos } = useContext(AuthContext);

  const validate = () => {
    const newErrors = {};

    if (!/^.+@unah\.hn$/.test(form.email)) {
      newErrors.email = 'Correo debe terminar en @unah.hn';
    }

    if (form.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setServerError('');

  try {
    const response = await api.post('usuarios/inicioSesion', {
      correo: form.email,
      contrasena: form.password.trim()
    });

    const { usuario } = response.data;

    
    
    inicioDatos(usuario);

     

    //localStorage.setItem('token', token); 
    //localStorage.setItem('usuario', JSON.stringify(usuario));

    navigate('/inicioloop', {
      state: {
        mensaje: `¡Bienvenido, ${usuario.nombre}!`
      }
    });

  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const apiErrors = error.response.data.errors || {};

      if (status === 404 && apiErrors.correo) {
        setErrors(prev => ({ ...prev, email: apiErrors.correo }));
      } else if (status === 401 && apiErrors.contrasena) {
        setErrors(prev => ({ ...prev, password: apiErrors.contrasena }));
      } else {
        setServerError('Ocurrió un error. Intenta más tarde.');
      }
    } else {
      setServerError('Ocurrió un error. Intenta más tarde.');
    }
  }
};

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  const handleForgotPassword = () => {
    alert('Funcionalidad de recuperar contraseña - próximamente');
  };

  return (
    <main className="login-layout">
      <div className="registro-container">
        <form className="registro-form" onSubmit={handleSubmit}>
          <div className="registro-header">
            <div className="form-logo-container">
              <img 
                src={loopLogo || "/placeholder.svg"} 
                alt="Loop Logo" 
                className="form-loop-logo-img"
              />
            </div>
            <h1>Bienvenido a Loop</h1>
            <p>Inicia Sesión para empezar tu Experiencia</p>
          </div>

          {serverError && <div className="error-message">{serverError}</div>}

          <div className="registro-campos">
            <div className="campo">
              <label htmlFor="email">Correo Institucional:</label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="kasanchez@unah.hn"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="campo">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                placeholder="*************"
              />
              {errors.password && <span className="error">{errors.password}</span>}
              
              <div className="forgot-password-container">
                <button 
                  type="button" 
                  className="forgot-password-link"
                  onClick={handleForgotPassword}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <div className="register-container">
                <span>¿No tienes una cuenta? </span>
                <button
                  type="button"
                  className="register-link"
                  onClick={() => navigate('/registrarusuario')}
                >
                  Regístrate
                </button>
              </div>
            </div>
          </div>

          <div className="registro-botones">
            <button type="submit">Iniciar Sesión</button>
            <button type="button" className="cancelar" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
