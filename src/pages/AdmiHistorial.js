import Menu from "./admi";
import { useState, useEffect} from 'react';
import '../styles/tablas.css';
import api from '../api/api';



function HistorialViaje(){
   const [busqueda, setBusqueda] = useState('');
      const [paginaActual, setPaginaActual] = useState(1);
      const registrosPorPagina = 4;
    
      const [usuarios, setUsuario] = useState([]);
      
      
                  useEffect(() => {
      
                  const historial = async () =>  {
                  try {
                    
                      const respuesta = await api.get('administrador/viajes');
                      setUsuario(respuesta.data);
                      
    
                     const data = Object.values(respuesta.data).filter(
                       item => typeof item === 'object' && item.Usuario
                      );
                     setUsuario(data);
                      console.log(data);
                      
      
                    }catch(error){  
                      console.error('Error al encontrar el historial de viajes:', error);
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
                      <th>Codigo</th>
                      <th>Destino</th>
                      <th>Conductor</th>
                      <th>Correo</th>
                      <th>Telefono</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosPaginados.length > 0 ? (
                      usuariosPaginados.map((u, i) => (
                        <tr key={i}>
                          <td>{u.id}</td>
                          <td>{u.destino}</td>
                          <td>{u.Usuario.nombre}</td>
                          <td>{u.Usuario.correo}</td>
                          <td>{u.Usuario.telefono}</td>
                          <td>
                            <button className="boton-revisar">Revisar</button>
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
export default HistorialViaje;