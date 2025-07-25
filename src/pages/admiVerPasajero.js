import Menu from "./admi";
import ImagenPerfil from './fotoPerfil';
import ImagenCarnet from './fotoCarnet';
import '../styles/editarUsuario.css';
import '../styles/MenuAdmi.css';
import '../styles/tablas.css';

function VisualizacionConductor(){
     const usuario = [
        { id: 'jose.moncada@unah.hn', nombre: 'monica.caceres@unah.hn', apellido: '25/02/2021', correo: '30', celular: '', cedula: '', marca: '', modelo:'', placa: '', color:'' },
       
      ];


        return(

            <Menu>
                <div className="contenedor-blanco">
               <div className="pasajero-detalle">
                    <div className="encabezado">
                        <button className="btn-regresar">Regresar</button>
                    </div>
                <div className="info-principal">
                    <div  className='avatar-wrapper'>
                        <ImagenPerfil id={usuario.id} tamaño={120} />

                    </div>
                   
                </div>
                 <div className="datos-usuario">
                    <h2>Jose Antonio Moncada Garcia</h2>
                    <p>jose.moncada@unah.hn</p>
                    <p>3148-1092</p>
                    <p>0801-2002-09087</p>
                </div>
                
                
                <div className="documento-imagen">
                    <h3>Documento</h3>
                     <ImagenCarnet id={usuario.id}/>
                </div>

                 <div className='document'>
        
                    <ImagenCarnet id={usuario.id}/>
            
                </div>
                </div>
                   <div className="encabezado">
                        <button className="btn-regresar">Aceptar</button>
                        <button className="btn-regresar">Rechazar</button>
                        <button className="btn-regresar">Eliminar</button>
                    </div>
                </div>

             
            </Menu>

        );
        




}

export default VisualizacionConductor;