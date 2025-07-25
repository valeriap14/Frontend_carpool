import Menu from "./admi";

import '../styles/editarUsuario.css';
import '../styles/MenuAdmi.css';
import '../styles/tablas.css';
import defaultAvatar from '../assets/perfil-de-usuario.png';
import defaultCarnet from '../assets/carnet.png';

function VisualizacionConductor(){
     


        return(

            <Menu>
            <div className="contenedor-blanco">
               <div className="pasajero-detalle">
                    <div className="encabezado">
                        <button className="btn-regresar">Regresar</button>
                    </div>
                    <div className="info-principal">
                         <div  className='avatar-wrapper'>
                            <img src={defaultAvatar} alt={'fotoPerfil'}  className="avatar-circle"></img>
                    

                         </div>
                        <div className="datos-usuario">
                        <h2>Jose Antonio Moncada Garcia</h2>
                        <p>jose.moncada@unah.hn</p>
                        <p>3148-1092</p>
                        <p>0801-2002-09087</p>
                        </div>
                
                        <div className="datos-vehiculo">
                            <h3>Datos del automóvil</h3>
                            <div className="tabla-datos">
                            <div><strong>Marca:</strong> <span>Toyota</span></div>
                            <div><strong>Modelo/Año:</strong> <span>Corolla 2001</span></div>
                            <div><strong>Color:</strong> <span>Blanco</span></div>
                            <div><strong>Placa:</strong> <span>HDN-0909</span></div>
                            </div>
                        </div>
                
                            <div className="card-image">
                               
                                <img src={defaultCarnet} alt={'fotoCarnet'} className="carnet-photo"></img>
                                
                                
                            </div>
                             <div className="card-image">
                                
                                <img src={defaultCarnet} alt={'fotoCarnet'} className="carnet-photo"></img>
                                
                                
                            </div>
                             <div className="card-image">
                              
                                <img src={defaultCarnet} alt={'fotoCarnet'} className="carnet-photo"></img>
                                
                                
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

export default VisualizacionConductor;