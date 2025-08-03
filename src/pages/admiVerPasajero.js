import Menu from "./admi";

import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import '../styles/editarUsuario.css';
import '../styles/MenuAdmi.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import ImagenPerfil from '../pages/fotoPerfil';
import ImagenCarnet from '../pages/fotoCarnet';
import api from "../api/api";


function VisualizacionPasajero(){
    const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuario = async () => {
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

    obtenerUsuario();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!usuario) return <p>Usuario no encontrado.</p>;

  const regresarAdmi = async () =>{
        setUsuario('');
        navigate('/Admi/Pasajero');
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
                     const respuesta = await api.post(`administrador/pasajero/${id}`);
                     console.log('Usuario eliminado:', respuesta.data);
                     
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
      }

       const suspenderUsuario = async () =>{
       
      }

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
                </div>
                
                 <div className="card-image">

                        <ImagenCarnet id={usuario.id} alt={'fotoCarnet'} className="carnet-photo"/>
                      
                    
                </div>
                 </div>

                 <div className="botones">
                        <button className="btn-regresar" onClick={() => aceptarUsuario(usuario.id)}>Aceptar</button>
                        <button className="btn-regresar" onClick={() => suspenderUsuario(usuario.id)}>Suspender</button>
                        
                        <button className="btn-regresar" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                    </div>
                
               
                   
                </div>
            </div>
             
            </Menu>

        );
        




}

export default VisualizacionPasajero;