
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


import api from '../api/api';
import loopLogo from '../assets/loop.png';
import '../styles/RegistrarUsuario.css';
import '../styles/editarUsuario.css';


function editarUsuario(){

        const { usuario, inicioDatos} = useContext(AuthContext);
        const [password, setPassword] = useState();
        const [parametros, setParametro] = useState(false);
        const navigate = useNavigate;

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
                const { name, value } = e.target;
                        setFormulario(prev => ({
                        ...prev,
                 [name]: value
        }));
        };

        
        const guardarCambios = async () =>{
                try{

                const response = await api.put(`usuarios/actualizacion/${usuario.correo}`, {
                              nombre: formulario.nombre,
                                apellido: formulario.apellido,
                                telefono: formulario.telefono
                });

                        
                        alert("Se guardaron cambios");
                }catch(error){
                console.error('error al actualizar:', error)
      

        }  
        };

   
    
   
  

    const handleCancel = () => {
  
        navigate('/inicioloop');
        };

  
        const cambioContra = () =>{
                setParametro(!parametros);
                
        }
  
  

    return (


        <>
        
        <main className="registro-container">
        <form className="registro-form">   


                 
        <div className="campo">
            <label htmlFor="nombre">Nombre:</label>
            
                <input name="nombre" value={formulario.nombre} onChange={handleChange}      />

        </div>

        <div className="campo">
                <label htmlFor="apellido">Apellidos:</label>

                 <input name="apellido" value={formulario.apellido} onChange={handleChange}  />

        </div>

        <div className="campo">
                <label htmlFor="telefono">Telefono:</label>
                 <input name="telefono" value={formulario.telefono} onChange={handleChange}    />

        </div>
        <div className="campo">
                <button type="button"  onClick={cambioContra}>CambiarContraseña</button>
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
               
          
          <button type="button" className="cancelar" onClick={() => navigate('/inicioloop')}>
            Cancelar
          </button>
        </div>
        </form>  
    </main>
         
            </>

            



    );
}

export default editarUsuario;