import { useEffect, useState } from 'react';
import socket from '../socket';

export const useNotificacionesConductor = () => {
  const [nuevasSolicitudes, setNuevasSolicitudes] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario?.id) return;

    socket.emit("joinUser", usuario.id); 

    socket.on("nuevaSolicitud", (data) => {
      console.log("Nueva solicitud recibida:", data);
      setNuevasSolicitudes(prev => [...prev, data]); 
    });

    return () => {
      socket.off("nuevaSolicitud");
    };
  }, []);

  return nuevasSolicitudes;
};
