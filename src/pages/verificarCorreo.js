import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import loopLogo from '../assets/loop.png';
import '../styles/RegistrarUsuario.css';

export default function VerificarCorreo() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Todos los hooks primero
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [verificado, setVerificado] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [reenvioHabilitado, setReenvioHabilitado] = useState(false);
  const [tiempoReenvio, setTiempoReenvio] = useState(30);

  // 2. Extraer datos del state
  const { state } = location;
  const { nombre = '', email = '', codigo = '' } = state || {};

  // 3. Función para enviar correo (memoizada)
  const enviarCorreo = useCallback(async () => {
    if (!email || !codigo) return;

    setIsLoading(true);
    setMessage({ text: 'Enviando código...', type: 'info' });

    try {
      await emailjs.send(
        'service_dodfzsa',
        'template_vs6zb3t',
        {
          to_email: email,
          to_name: nombre,
          codigo_verificacion: codigo
        },
        'SNXwmMTM4rDvzZ289'
      );

      setMessage({ text: `Código enviado a ${email}`, type: 'success' });
      setReenvioHabilitado(true);
      setTiempoReenvio(30);
    } catch (error) {
      setMessage({ text: 'Error al enviar el código', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [email, nombre, codigo]);

  // 4. Efecto para enviar correo inicial
  useEffect(() => {
    if (!state?.email || !state?.codigo) {
      navigate('/usuarios/');
      return;
    }

    enviarCorreo();
  }, [state, navigate, enviarCorreo]);

  // 5. Efecto para el temporizador (versión simplificada)
  useEffect(() => {
    if (!reenvioHabilitado) return;

    const timer = tiempoReenvio > 0 && setTimeout(() => {
      setTiempoReenvio(t => t - 1);
    }, 1000);

    return () => timer && clearTimeout(timer);
  }, [reenvioHabilitado, tiempoReenvio]);

  // 6. Función de verificación
  const verificarCodigo = () => {
    if (codigoIngresado.length !== 6) {
      setMessage({ text: 'El código debe tener 6 dígitos', type: 'error' });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      if (codigoIngresado === codigo) {
        setVerificado(true);
        setMessage({ text: '¡Verificación exitosa!', type: 'success' });
        localStorage.setItem('correoVerificado', 'true');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage({ text: 'Código incorrecto', type: 'error' });
      }
      setIsLoading(false);
    }, 500);
  };

  // 7. Renderizado
  if (!state?.email || !state?.codigo) {
    return null; // O podrías mostrar un loader aquí
  }

 return (
    <main className="registro-container">
      <div className="registro-form">
        <div className="registro-header">
          <img src={loopLogo} alt="Loop Logo" className="registro-loop-logo-img" />
          <h1>Verifica tu correo electrónico</h1>
          <p>Hemos enviado un código de verificación a:</p>
          <p className="email-destino">{email}</p>
        </div>

    
        {message.text && (
          <div className={`message-${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="registro-campos">
          <div className="campo">
            <label>Código de verificación:</label>
            <input
              type="text"
              value={codigoIngresado}
              onChange={(e) => setCodigoIngresado(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              disabled={verificado || isLoading}
              placeholder="Ingresa el código de 6 dígitos"
            />
          </div>

          <div className="registro-botones">
            <button
              onClick={verificarCodigo}
              disabled={verificado || isLoading || codigoIngresado.length !== 6}
            >
              {isLoading ? 'Verificando...' : 'Verificar Código'}
            </button>
            <button 
              className="cancelar"
              onClick={() => navigate('/')}
            >
              Cancelar
            </button>
          </div>

          <div className="reenvio-codigo">
            <button
              onClick={enviarCorreo}
              disabled={reenvioHabilitado || isLoading}
            >
              {reenvioHabilitado ? `Reenviar en ${tiempoReenvio}s` : 'Reenviar código'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}