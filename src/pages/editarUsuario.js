import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {FaBell, FaUserCircle, FaBars, FaTimes,FaCar, FaHome, FaRoute, FaMoneyBill, FaQuestionCircle} from 'react-icons/fa';



import api from '../api/api';
import loopLogo from '../assets/loop.png';
import '../styles/RegistrarUsuario.css';
import '../styles/editarUsuario.css';


function EditarUsuario(){

        const { usuario, inicioDatos} = useContext(AuthContext);
        const [password, setPassword] = useState();
        const [parametros, setParametro] = useState(false);
        const [errors, setErrors] = useState({});
        const [serverError, setServerError] = useState('');
        const [modoEdicion, setModoEdicion] = useState(null);
        const navigate = useNavigate;
        setErrors({});
         setServerError('');

        const [formulario, setFormulario] = useState ({
                nombre: '',
                apellido: '',
                telefono: ''
        });

        
        useEffect(() => {
                if (usuario){
                        setFormulario({
                                nombre: usuario.nombre,
                                apellido: usuario.apellido,
                                telefono: usuario.telefono
                        });
                }
        }, [usuario]);


        
        const handleChange = (e) => {

                if(modoEdicion === null || modoEdicion ==='info'){
                        setModoEdicion("info");
                         const { name, value } = e.target;
                        setFormulario(prev => ({
                        ...prev,
                        [name]: value
                
               
                        }));
                 }
        };

        
        const guardarCambios = async () =>{
                try{

                const response = await api.put(`usuarios/actualizacion/${usuario.correo}`, {
                              nombre: formulario.nombre,
                                apellido: formulario.apellido,
                                telefono: formulario.telefono
                });

                if (response){
                         if (usuario.rolNombre === 'Conductor' ){
                                 navigate('/inicioconductor', {
                                 state: { mensaje: `Datos actualizados` }
                        });

                        }else if (usuario.rolNombre === 'Pasajero' ){
                                navigate('/iniciopasajero', {
                                state: { mensaje: `Datos actualizados` }
                        });
                        }else{
                                 setServerError('Rol de usuario no reconocido.');
                        }
                }

                         setModoEdicion(null);
 
                        
                        alert("Se guardaron cambios");
                }catch(error){
                console.error('error al actualizar:', error)
      

        }  
        };

   
    
   
  

    const handleCancel = () => {
         
        if (usuario.rolNombre === 'Conductor' ){
                navigate('/inicioconductor', {
                 state: { mensaje: `Datos actualizados` }
         });

        }else if (usuario.rolNombre === 'Pasajero' ){
                navigate('/iniciopasajero', {
                 state: { mensaje: `Datos actualizados` }
         });
        }else{
               setServerError('Rol de usuario no reconocido.');
        }
        setModoEdicion(null);
        setParametro(false);
        setPassword("");
      
        };

  
        const cambioContra = () =>{
                if (modoEdicion === null || modoEdicion ==='password'){
                        setModoEdicion("password");
                        setParametro(!parametros);
                }
                
                
        };
  
  

    return (


        <>
        
        <main className="registro-container">
        <form className="registro-form">   

        <h1>Editar Datos</h1>

         <div>
                   <FaUserCircle className="icon-profile" />
        </div>
        <div className="campo">
            <label htmlFor="nombre">Nombre:</label>
            
                <input name="nombre" value={formulario.nombre} onChange={handleChange}    disabled={modoEdicion==="password"}  />

        </div>

        <div className="campo">
                <label htmlFor="apellido">Apellidos:</label>

                 <input name="apellido" value={formulario.apellido} onChange={handleChange} disabled={modoEdicion==="password"}  />

        </div>

        <div className="campo">
                <label htmlFor="telefono">Telefono:</label>
                 <input name="telefono" value={formulario.telefono} onChange={handleChange}  disabled={modoEdicion==="password"}   />

        </div>
        <div className="campo">
                <button type="button"  onClick={cambioContra} disabled={modoEdicion==="info"} >CambiarContraseña</button>
        </div>

        {parametros && (
                <div className="campo">
                <label htmlFor="password">Ingrese contraseña nueva:</label>
                 <input type="password" value={password}  name="password" onChange={(event)=> {
                        setPassword(event.target.value);


                }}    />

        </div>


        )
        }
        
        

         <div className="registro-botones">
               
                <button type="button"  onClick={guardarCambios}>Guardar</button>
               
          
          <button type="button" className="cancelar" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
        </form>  
    </main>
         
            </>

            



    );
}

export default EditarUsuario;