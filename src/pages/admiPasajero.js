import Menu from "./admi";
import '../styles/tablas.css';

import api from '../api/api';

import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Pasajero(){
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 4;
  const navigate = useNavigate();

  const [usuarios, setUsuario] = useState([]);
  
  
              useEffect(() => {
  
              const historial = async () =>  {
              try {
                
                  const respuesta = await api.get('administrador/pasajeros');
                  setUsuario(respuesta.data);
                  

                 const pasajero = respuesta.data.data
                  ? respuesta.data.data  
                  : Object.values(respuesta.data).filter(item => 
                  typeof item === 'object' && 
                  item?.nombre  
                  );

                  setUsuario(pasajero);
                  console.log(pasajero);
                  
  
                }catch(error){  
                  console.error('Error al encontrar pasajeros:', error);
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


  const revisarUsuario = (id) =>{
    navigate(`/Admi/InfoPasajero/${id}`);
    setUsuario('');
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
                      <th>Nombre</th>
                      <th>Estado</th>
                      <th>Correo Electrónico</th>
                      <th>Telefono</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosPaginados.length > 0 ? (
                      usuariosPaginados.map((u, i) => (
                        <tr key={i}>
                          <td>{u.nombre} {u.apellido}</td>
                          <td>{u.estado}</td>
                          <td>{u.correo}</td>
                          <td>{u.telefono}</td>
                          <td>
                            <button className="boton-revisar" onClick={() => revisarUsuario(u.id)}>Revisar</button>
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
export default Pasajero;