// src/hooks/useNotificaciones.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Reemplazar con  IP o dominio del backend si ya está desplegado

export const useNotificaciones = (usuarioId, onNotificacionRecibida) => {
  useEffect(() => {
    if (!usuarioId) return;

    // Unirse al room del usuario
    socket.emit('joinUser', usuarioId);

    // Escuchar cuando aceptan o rechazan la reserva
    socket.on('reservaRespondida', (data) => {
      console.log('Notificación recibida:', data);
      if (onNotificacionRecibida) {
        onNotificacionRecibida(data);
      }
    });

    // Cleanup
    return () => {
      socket.off('reservaRespondida');
    };
  }, [usuarioId, onNotificacionRecibida]);
};
