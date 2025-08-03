import Menu from "./admi";

import api from "../api/api";
  import { useState, useEffect} from 'react';


import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Usuario(){




  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 4;
  

  const [usuarios, setUsuario] = useState([]);
  
  
              useEffect(() => {
  
              const usuariosInactivos = async () =>  {
              try {
                
                  const respuesta = await api.get('administrador/usuariosInactivos');
                  setUsuario(respuesta.data);
                  

                 const usuarioInactivo = respuesta.data.data
                  ? respuesta.data.data  
                  : Object.values(respuesta.data).filter(item => 
                  typeof item === 'object' && 
                  item?.nombre  
                  );

                  setUsuario(usuarioInactivo);
                  console.log(usuarioInactivo);
                  
  
                }catch(error){  
                  console.error('Error al encontrar usuarios:', error);
                }
                };
  
                usuariosInactivos();
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


 

   const aceptarUsuario = async (id) =>{
          confirmAlert({
      title: 'Activar Usuario',
      message: '¿Estás seguro que deseas activar el usuario?',
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            try {
              const respuesta = await api.post(`administrador/usuario/${id}`);
              console.log('Reserva eliminada:', respuesta.data);
              const actualizacion = await api.get('administrador/usuariosInactivos');
                      setUsuario(respuesta.data);
                      
    
                    
                    const usuarioActivo = actualizacion.data.data
                    ? actualizacion.data.data  
                    : Object.values(actualizacion.data).filter(item => 
                    typeof item === 'object' && 
                    item?.nombre  
                    );
  
                    setUsuario(usuarioActivo);
            } catch (error) {
              console.error('Error al activar usuario', error);
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
                      <th>codigo</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Correo Electrónico</th>
                      <th>Dni</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosPaginados.length > 0 ? (
                      usuariosPaginados.map((u, i) => (
                        <tr key={i}>
                          <td>{u.id}</td>
                          <td>{u.nombre}</td>
                          <td>{u.apellido}</td>
                          <td>{u.correo}</td>
                          <td>{u.dni}</td>
                          <td>
                            <button className="boton-revisar" onClick={() => aceptarUsuario(u.id)}>Activar</button>
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
export default Usuario;