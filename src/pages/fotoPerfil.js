import React from "react";
import { useEffect, useState } from "react";
import api from '../api/api';

function ImagenPerfil({correo, alt='Imagen de perfil'}){

    const [imagenUrl, setImagenUrl] = useState('');
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const obtenerImagen = async () =>{

            try{

                const response = await api.get('');

                setImagenUrl(response.data.imagenUrl);

            }catch(error){
                    console.error('Eror al obtener la imagen de perfil', error);
                    setImagenUrl('');

             }finally {
                setLoading(false);
             }
            

        }

          if(correo){
                obtenerImagen();
        }
    }, [correo]);

    return(
        
        <div>
            {
                loading ? (
                    
                    <p>...</p>
                ): (
                    
                    <img src={imagenUrl} alt={alt}></img>

                )
            }



        </div>

    );
  

}

export default ImagenPerfil;