import React from "react";
import { useEffect, useState } from "react";
import api from '../api/api';
import '../styles/img.css';
import defaultAvatar from '../assets/perfil-de-usuario.png';

function ImagenPerfil({id, alt='Imagen de perfil'}){

    const [imagenUrl, setImagenUrl] = useState('');
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const obtenerImagen = async () =>{

            try{

                const response = await api.get(`usuarios/fotoPerfil/${id}`);

                setImagenUrl(response.data.url);
                console.log(response.data.url);

            }catch(error){
                    console.error('Eror al obtener la imagen de perfil', error);
                    setImagenUrl('');

             }finally {
                setLoading(false);
             }
            

        }

          if(id){
                obtenerImagen();
        }
    }, [id]);

    return(
        
        <div>
            {
                
                    
                    <img    src={imagenUrl || defaultAvatar} alt={alt} className="avatar-circle"></img>
                    

                
            }



        </div>

    );
  

}

export default ImagenPerfil;