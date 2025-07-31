import { useEffect } from 'react';
import socket from '../socket';

export const useNotificaciones = (setViajeAceptado, setNotificaciones, setSnackbar) => {
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario?.id) return;

    socket.emit("joinUser", usuario.id);

    socket.on("reservaRespondida", (data) => {
      console.log("Respuesta recibida desde el servidor:", data);

      if (typeof setNotificaciones === "function") {
        setNotificaciones(prev => prev + 1);
      }

      if (typeof setSnackbar === "function") {
        const mensaje = data.estado === "aceptada" 
          ? " Tu viaje fue aceptado"
          : " Tu solicitud fue rechazada";
        setSnackbar({ mensaje, tipo: data.estado });
      }

      if (data.estado === "aceptada") {
        fetch(`http://localhost:3000/viaje-pasajero/pasajero/${usuario.id}/viaje-aceptado`)
          .then(res => res.json())
          .then(data => setViajeAceptado && setViajeAceptado(data))
          .catch(err => console.error("Error actualizando viaje:", err));
      }
    });

    return () => {
      socket.off("reservaRespondida");
    };
  }, []);
};
