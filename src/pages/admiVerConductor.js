import Menu from "./admi";
import { useState,  useEffect, } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/editarUsuario.css';
import '../styles/MenuAdmi.css';
import '../styles/tablas.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import ImagenPerfil from '../pages/fotoPerfil';
import ImagenCarnet from '../pages/fotoCarnet';
import ImagenVehiculo from '../pages/fotoVehiculo';
import ImagenRevision from '../pages/fotoRevision';
import ImagenLicencia from '../pages/fotoLicencia';
import api from "../api/api";

function VisualizacionConductor(){
        const { id } = useParams();
      const [usuario, setUsuario] = useState(null);
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();
    
      useEffect(() => {
        const obtenerUsuario = async () => {
          try {
            const respuesta = await api.post(`administrador/conductor/${id}`);
           const conductores = respuesta.data.data
                  ? respuesta.data.data  
                  : Object.values(respuesta.data).filter(item => 
                  typeof item === 'object' && 
                  item?.nombre  
                  );

                  setUsuario(conductores);
                  console.log(conductores);

          } catch (error) {
            console.error('Error al obtener el usuario', error);
          } finally {
            setLoading(false);
          }
        };
    
        obtenerUsuario();
      }, [id]);
    
      if (loading) return <p>Cargando...</p>;
      if (!usuario) return <p>Usuario no encontrado.</p>;
      const cargarPagina = async () =>{
           try {
              const respuesta = await api.post(`administrador/pasajero/${id}`);
              const conductores = respuesta.data.data
                        ? respuesta.data.data  
                        : Object.values(respuesta.data).filter(item => 
                        typeof item === 'object' && 
                        item?.nombre  
                        );
      
                        setUsuario(conductores);
                        console.log(conductores);
      
      
      
            } catch (error) {
              console.error('Error al obtener el usuario', error);
            } finally {
              setLoading(false);
            }
          };
      

      
      const regresarAdmi = async () =>{
        setUsuario('');
        navigate('/Admi/Conductor');
      }

      const aceptarUsuario = async () =>{
              confirmAlert({
                   title: 'Activar Usuario',
                   message: '¿Estás seguro que deseas activar el usuario?',
                   buttons: [
                     {
                       label: 'Sí',
                       onClick: async () => {
                         try {
                           const respuesta = await api.post(`administrador/conductorAceptado/${id}`);
                           console.log('Usuario activo:', respuesta.data);
                           cargarPagina();
                         } catch (error) {
                           console.error('Error al activar usuario:', error);
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
      
            const eliminarUsuario = async () =>{
               confirmAlert({
                   title: 'Eliminar Usuario',
                   message: '¿Estás seguro que deseas eliminar el usuario?',
                   buttons: [
                     {
                       label: 'Sí',
                       onClick: async () => {
                         try {
                           const respuesta = await api.post(`administrador/conductor/inactivo/${id}`);
                           console.log('Usuario eliminado:', respuesta.data);
                           cargarPagina();
                           navigate('/Admi/Conductor');
                         } catch (error) {
                           console.error('Error al eliminar usuario:', error);
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
      
             const suspenderUsuario = async () =>{
              confirmAlert({
                   title: 'Bloquear usuario',
                   message: '¿Estás seguro que deseas bloquear el usuario?',
                   buttons: [
                     {
                       label: 'Sí',
                       onClick: async () => {
                         try {
                           const respuesta = await api.post(`administrador/conductorSuspendido/${id}`);
                           console.log('Usuario eliminado:', respuesta.data);
                           cargarPagina();
                         } catch (error) {
                           console.error('Error al eliminar usuario:', error);
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
               <div className="pasajero-detalle">
                    <div className="encabezado">
                        <button className="btn-regresar" onClick={regresarAdmi}>Regresar</button>
                    </div>
                    <div className="info-principal">
                         <div  className='avatar-wrapper'>
                           <ImagenPerfil id={usuario.id} tamaño={120} alt={'fotoPerfil'} className="avatar-circle"/>
                               

                         </div>
                        <div className="datos-usuario">
                        <h2>{usuario.nombre} {usuario.apellido}</h2>
                         <p>{usuario.correo}</p>
                        <p>{usuario.telefono}</p>
                        <p>{usuario.cedula}</p>
                        <p>{usuario.estado}</p>
                        </div>
                
                        <div className="datos-vehiculo">
                            <h3>Datos del automóvil</h3>
                            <div className="tabla-datos">
                            <div><strong>Marca:</strong> <span>{usuario.Vehiculo.marca}</span></div>
                            <div><strong>Modelo/Año:</strong> <span>{usuario.Vehiculo.modelo}</span></div>
                            <div><strong>Color:</strong> <span>{usuario.Vehiculo.color}</span></div>
                            <div><strong>Placa:</strong> <span>{usuario.Vehiculo.placa}</span></div>
                            </div>
                        </div>
                
                            <div className="card-image">
                               
                               <ImagenCarnet id={usuario.id} alt={'fotoCarnet'} className="carnet-photo"/>
                      
                                
                            </div>
                             <div className="card-image">
                                <ImagenVehiculo id={usuario.id} alt={'fotoCarnet'} className="carnet-photo"/>
                                
                                
                                
                            </div>
                             <div className="card-image">
                              <ImagenRevision id={usuario.id} alt={'fotoCarnet'} className="carnet-photo"/>
                                
                            </div>
                            <div className="card-image">
                              <ImagenLicencia id={usuario.id} alt={'fotoCarnet'} className="carnet-photo"/>
                                
                            </div>
                                

                </div>
                
                
                <div className="botones">
                        <button className="btn-regresar" onClick={() => aceptarUsuario(usuario.id)}>Aceptar</button>
                        <button className="btn-regresar" onClick={() => suspenderUsuario(usuario.id)}>Bloquear</button>
                
                        <button className="btn-regresar" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                </div>
                </div>
            </div>
             
            </Menu>

        );
        




}

export default VisualizacionConductor;