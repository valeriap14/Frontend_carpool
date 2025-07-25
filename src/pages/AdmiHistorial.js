import Menu from "./admi";
import { useState} from 'react';
import '../styles/tablas.css';



function HistorialViaje(){
  const usuarios = [
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },
        { conductor: 'jose.moncada@unah.hn', pasajero: 'monica.caceres@unah.hn', fechaViaje: '25/02/2021', precio: '30' },

      ];
    
      const [busqueda, setBusqueda] = useState('');
      const [paginaActual, setPaginaActual] = useState(1);
      const registrosPorPagina = 4;
    
      const usuariosFiltrados = usuarios.filter(usuario =>
        Object.values(usuario).some(valor =>
          valor.toLowerCase().includes(busqueda.toLowerCase())
        )
      );
    
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
                      <th>Conductor</th>
                      <th>Pasajero</th>
                      <th>Fecha de Viaje</th>
                      <th>Precio</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosPaginados.length > 0 ? (
                      usuariosPaginados.map((u, i) => (
                        <tr key={i}>
                          <td>{u.conductor}</td>
                          <td>{u.pasajero}</td>
                          <td>{u.fechaViaje}</td>
                          <td>{u.precio}</td>
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