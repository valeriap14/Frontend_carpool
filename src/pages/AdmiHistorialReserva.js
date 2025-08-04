import Menu from "./admi";
import { useState, useEffect} from 'react';
import '../styles/tablas.css';
import api from '../api/api';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function HistorialReserva(){
 const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const registrosPorPagina = 4;
  
    const [usuarios, setUsuario] = useState([]);
    
    
                useEffect(() => {
    
                const historial = async () =>  {
                try {
                  
                    const respuesta = await api.get('administrador/reserva');
                    setUsuario(respuesta.data);
                    
  
                  
                  const reserva = respuesta.data.data
                  ? respuesta.data.data  
                  : Object.values(respuesta.data).filter(item => 
                  typeof item === 'object' && 
                  item?.nombre  
                  );

                  setUsuario(reserva);
                    
    
                  }catch(error){  
                    console.error('Error al encontrar el historial de reserva:', error);
                  }
                  };
    
                  historial();
              }, []);
         
  
    
  
   const usuariosFiltrados = Array.isArray(usuarios)
    ? usuarios.filter(usuario =>
        Object.values(usuario).some(valor =>
          String(valor).toLowerCase().includes(busqueda.toLowerCase())
        )
      )
    : [];
    
      const totalPaginas = Math.ceil(usuariosFiltrados.length / registrosPorPagina);
      const inicio = (paginaActual - 1) * registrosPorPagina;
      const usuariosPaginados = usuariosFiltrados.slice(inicio, inicio + registrosPorPagina);
    
      const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
          setPaginaActual(nuevaPagina);
        }
      };


      const eliminarReserva = async(id) =>{
        confirmAlert({
    title: 'Confirmar eliminación',
    message: '¿Estás seguro que deseas eliminar esta reserva?',
    buttons: [
      {
        label: 'Sí',
        onClick: async () => {
          try {
            const respuesta = await api.delete(`administrador/reserva/${id}`);
            console.log('Reserva eliminada:', respuesta.data);
            const actualizacion = await api.get('administrador/reserva');
                    setUsuario(respuesta.data);
                    
  
                  
                  const reserva = actualizacion.data.data
                  ? actualizacion.data.data  
                  : Object.values(actualizacion.data).filter(item => 
                  typeof item === 'object' && 
                  item?.nombre  
                  );

                  setUsuario(reserva);
          } catch (error) {
            console.error('Error al eliminar la reserva:', error);
          }
        }
      },
      {
        label: 'No',
        onClick: () => {
          console.log('Cancelado por el usuario');
        }
      }
    ]
  });
  };
    
    

   

        return(
          
          <Menu>
            <div className="contenedor-blanco">
              <div className="contenedor-usuarios">
                   <input
                  type="text"
                  placeholder="Buscar..."
                  className="input-buscar"
                  value={busqueda}
                  onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPaginaActual(1);
                  }}
              />

              <div className="tabla-responsive">
                <table className="tabla-usuarios">
                  <thead>
                    <tr>
                      <th>Estado</th>
                      <th>Codigo Viaje</th>
                     
                      <th>Nombre</th>
                      <th>Telefono</th>
                      <th>Correo</th>
                     <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosPaginados.length > 0 ? (
                      usuariosPaginados.map((u, i) => (
                        <tr key={i}>
                          <td>{u.estado}</td>
                          <td>{u.viaje_id}</td>
                          <td>{u.Usuario.nombre}</td>
                          <td>{u.Usuario.telefono}</td>
                          <td>{u.Usuario.correo}</td>
                          <td>
                            <button className="boton-revisar" onClick={() => eliminarReserva(u.id)} >Eliminar</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No se encontraron resultados.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="paginacion">
                <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                  Anterior
                </button>
                <span>Página {paginaActual} de {totalPaginas}</span>
                <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                  Siguiente
                </button>
              </div>


              </div>
              </div>

             
          </Menu>

        );


}
export default HistorialReserva;