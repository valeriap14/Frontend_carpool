import React from "react";
import { useEffect, useState } from "react";
import api from '../api/api';
import '../styles/img.css';

function ImagenCarnet({id, alt='Imagen de perfil'}){

    const [imagenUrl, setImagenUrl] = useState('');
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const obtenerImagen = async () =>{

            try{

                const response = await api.get(`usuarios/fotoCarnet/${id}`);

                setImagenUrl(response.data.url);
                console.log(response.data.url);

            }catch(error){
                    console.error('Eror al obtener la imagen del carnet', error);
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
                loading ? (
                    
                    <p>...</p>
                ): (
                    
                    <img src={imagenUrl} alt={alt} className="carnet-photo"></img>
                    

                )
            }



        </div>

    );
  

}

export default ImagenCarnet;