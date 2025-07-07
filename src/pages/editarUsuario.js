/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';
import loopLogo from '../assets/loop.png';
import '../styles/RegistrarUsuario.css';
import '../styles/editarUsuario.css';


function editarUsuario(){

    const navigate = useNavigate;
    
    const [editar, setEditar] = useState(false);

    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [telefono, setTelefono] = useState();
    const [rol, setRol] = useState();
  

    const handleCancel = () => {
  
    navigate('/');
  };

  
  const editarFormulario = (val) =>{
            setEditar(true);
            setNombre(val.nombre);
            

  }


    return (


        <>
        
        <main className="registro-container">
        <form className="registro-form">      
        <div className="campo">
            <label htmlFor="nombre">Nombre:</label>
            
                <input value={nombre} onChange={(event)=> {
                        setNombre(event.target.value);


                }}    />

        </div>

        <div className="campo">
                <label htmlFor="apellido">Apellidos:</label>

                 <input value={nombre} onChange={(event)=> {
                        setNombre(event.target.value);


                }}    />

        </div>

        <div className="campo">
                <label htmlFor="telefono">Telefono:</label>
                 <input value={nombre} onChange={(event)=> {
                        setNombre(event.target.value);


                }}    />

        </div>

        <div className="campo">
                <label htmlFor="password">Contraseña:</label>
                 <input value={nombre} onChange={(event)=> {
                        setNombre(event.target.value);


                }}    />

        </div>
        {
                rol === "conductor" &&(
                <>
                <div className="campo">
                        
                    <label htmlFor="marca">Marca:</label>
                     <input value={nombre} onChange={(event)=> {
                        setNombre(event.target.value);


                }}    />

                    </div>

                    <div className="campo">
                            <label htmlFor="modelo">Modelo:</label>
                             <input value={nombre} onChange={(event)=> {
                        setNombre(event.target.value);


                }}    />

                    </div>

                    <div className="campo">
                            <label htmlFor="color">Color:</label>
                             <input value={nombre} onChange={(event)=> {
                        setNombre(event.target.value);


                }}    />

                    </div>

                    <div className="campo">
                            <label htmlFor="placa">Placa:</label>
                             <input value={nombre} onChange={(event)=> {
                        setNombre(event.target.value);


                }}    />

                    </div>

                    <div className="campo">
                            <label htmlFor="foto_carro">Foto Carro:</label>
                             <input value={nombre} onChange={(event)=> {
                        setNombre(event.target.value);


                }}    />

                    </div>
                </>     

                )
        }


       


         <div className="registro-botones">
          <button>
                <span className="editarBoton"></span> Editando...
          </button>
          <button type="button" className="cancelar" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
        </form>  
    </main>
         
            </>

            



    );
}

export default editarUsuario;