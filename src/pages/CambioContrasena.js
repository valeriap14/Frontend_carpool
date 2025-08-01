import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import loopLogo from '../assets/loop.png';
import api from '../api/api';


function CambioContrasena() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();


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
            <h1>Olvidaste la contraseña</h1>
            <p>Ingresa tu correo para restablecer</p>
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
            
          </div>

          <div className="registro-botones">
            <button type="submit">Aceptar</button>
            <button type="button" className="cancelar" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CambioContrasena;
