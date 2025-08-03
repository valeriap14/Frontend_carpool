import React from 'react';
import '../styles/TerminosModal.css';

const TerminosModal = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Términos y Políticas</h2>

        <h3>Términos de Servicio</h3>
        <p>
          Al registrarte en Loop Carpool, aceptas que:
          <ul>
            <li>Debes ser estudiante activo de la UNAH.</li>
            <li>Te comprometes a proporcionar información verídica.</li>
            <li>Los conductores deben tener licencia vigente y un vehículo en buen estado.</li>
            <li>La plataforma no se hace responsable por incidentes durante los viajes.</li>
            <li>El mal comportamiento puede llevar a la suspensión de tu cuenta.</li>
          </ul>
        </p>

        <h3>Políticas de Privacidad</h3>
        <p>
          En Loop Carpool valoramos tu privacidad:
          <ul>
            <li>Solo recolectamos los datos necesarios para el uso del sistema.</li>
            <li>No compartimos tu información con terceros.</li>
            <li>Las imágenes y documentos subidos se almacenan de forma segura.</li>
            <li>Puedes solicitar la eliminación de tu cuenta y tus datos cuando desees.</li>
          </ul>
        </p>

        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default TerminosModal;
