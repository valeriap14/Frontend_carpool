
import Menu from "./admi";
import { useState,  useEffect, } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/editarUsuario.css';
import '../styles/MenuAdmi.css';
import '../styles/tablas.css';


import api from '../api/api';


function HistorialPasajeros(){
       const { id } = useParams();
      const [infoViaje, setinfoViaje] = useState(null);
      const [infoConductor, setinfoConductor] = useState(null);
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();

      useEffect(() => {
        const obtenerInformacion = async () => {
          try {
             const respuesta = await api.post(`administrador/viajeDetalleConductor/${id}`);
             
            const conductores = respuesta.data.data
                  ? respuesta.data.data  
                  : Object.values(respuesta.data).filter(item => 
                  typeof item === 'object' && 
                  item?.nombre  
                  );

                  setinfoConductor(conductores);
                  console.log(conductores);
                   const response = await api.post(`administrador/viajeDetalle/${id}`);
          

                   const pasajeros = response.data.data
                  ? response.data.data  
                  : Object.values(response.data).filter(item => 
                  typeof item === 'object' && 
                  item?.nombre  
                  );

                  setinfoViaje(pasajeros);
                  console.log(pasajeros);
            
          } catch (error) {
            console.error('Error al obtener el infoViaje', error);
          } finally {
            setLoading(false);
          }
        };
    
        obtenerInformacion();
      }, [id]);
    
      if (loading) return <p>Cargando...</p>;
     
      
      const regresarAdmi = async () =>{
        setinfoViaje('');
        navigate('/Admi/HistorialViajes');
      }

        return(

            <Menu>
            <div className="contenedor-blanco">
               <div className="pasajero-detalle">
                    <div className="encabezado">
                        <button className="btn-regresar" onClick={regresarAdmi}>Regresar</button>
                    </div>
                    <div className="info-principal">
                        
                        <div className="datos-infoViaje">
                        <h2>{infoConductor.conductor.nombre} </h2>
                        <h2>{infoConductor.conductor.correo} </h2>
                        <h2>{infoConductor.conductor.telefono} </h2>
                         <h2>{infoConductor.conductor.dni} </h2>

                        <p>{infoConductor.origen}</p>
                        <p>{infoConductor.destino}</p>
                        <p>{infoConductor.hora_salida}</p>
                        <p>{infoConductor.asientos_disponibles}</p>
                        <p>{infoConductor.precio_asiento}</p>
                        <p>{infoConductor.descripcion}</p>
                        <p>{infoConductor.estado}</p>
                        </div>
                
                         <div className="tabla-responsive">
                <table className="tabla-usuarios">
                     <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>DNI</th>
                      <th>Correo Electrónico</th>
                      <th>Celular</th>
                    
                    </tr>
                  </thead>
                  
                  <tbody>
                    {Array.isArray(infoViaje) && infoViaje.length > 0 ? (
                     infoViaje.map((u, i) => (
                        <tr key={i}>
                          <td>{u.Usuario.nombre || '-'}</td>
                          <td>{u.Usuario.dni || '-'}</td>
                          <td>{u.Usuario.correo || '-'}</td>
                          <td>{u.Usuario.telefono || '-'}</td>
                          
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No se registro ningun pasajero.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
                
                           

                </div>
                
                
                <div className="botones">
                        <button className="btn-regresar">Aceptar</button>
                        <button className="btn-regresar">Bloquear</button>
                        <button className="btn-regresar">Rechazar</button>
                        <button className="btn-regresar">Eliminar</button>
                </div>
                </div>
            </div>
             
            </Menu>

        );
        





   

}
export default HistorialPasajeros;